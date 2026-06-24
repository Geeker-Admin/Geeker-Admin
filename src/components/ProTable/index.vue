<!-- 📚📚📚 Pro-Table 文档: https://juejin.cn/post/7166068828202336263 -->

<template>
  <!-- 查询表单 -->
  <search-form
    v-show="isShowSearch"
    ref="searchFormRef"
    :search="_search"
    :reset="_reset"
    :columns="searchColumns"
    :search-param="searchParam"
    :search-col="searchCol"
  />

  <!-- 表格主体 -->
  <div class="card table-main">
    <!-- 表格头部 操作按钮 -->
    <div class="table-header flex justify-between mb-2">
      <div class="header-button-left">
        <template v-for="item in toolbarLeftArr" :key="item.auth">
          <el-button
            :icon="item.icon"
            :type="item.type"
            :auth="item.auth"
            :loading="loadingStore.loading"
            v-bind="item.attrs"
            @click="handleToolbarClick(item.name)"
          >
            {{ item.text }}
          </el-button>
        </template>
        <template v-if="toolbarLeftArr.length === 0">
          <slot
            name="toolbarLeft"
            :selected-list="selectedList"
            :selected-list-ids="selectedListIds"
            :is-selected="isSelected"
          />
        </template>
      </div>
      <div v-if="toolbarMiddle" class="header-button-middle">
        <component :is="toolbarMiddle" />
      </div>
      <div class="header-button-right">
        <template v-for="item in toolbarRightArr" :key="item.auth">
          <el-button
            :icon="item.icon"
            :auth="item.auth"
            :title="item.text"
            :loading="loadingStore.loading"
            circle
            @click="handleToolbarClick(item.name)"
          />
        </template>
        <template v-if="toolbarRightArr.length === 0">
          <slot name="toolbarRight">
            <el-button v-if="columns.length" :icon="Operation" circle @click="openColSetting" />
          </slot>
        </template>
      </div>
    </div>
    <!-- 表格主体 -->
    <el-table
      v-bind="$attrs"
      :key="renderKey"
      ref="tableRef"
      v-loading="loadingStore.loading"
      :data-page-id="pageId"
      :data="tableData"
      :border="border"
      :row-key="rowKey"
      @selection-change="selectionChange"
    >
      <!-- 默认插槽 -->
      <slot></slot>
      <template v-for="{ label, ...item } in tableColumns" :key="item.prop">
        <!-- selection || radio || index || expand || sort -->
        <el-table-column
          v-if="item.type && item.type !== 'operation' && ColumnTypes.includes(item.type)"
          v-bind="item"
          :label="$t(`proTable.${item.type}`)"
          :align="item.align ?? 'center'"
          :reserve-selection="item.type === 'selection'"
        >
          <template #default="scope">
            <!-- expand -->
            <template v-if="item.type === 'expand'">
              <component :is="item.render" v-bind="scope" v-if="item.render" />
              <slot v-else :name="item.type" v-bind="scope"></slot>
            </template>
            <!-- radio -->
            <el-radio v-if="item.type === 'radio'" v-model="radio" :value="scope.row[rowKey]">
              <i></i>
            </el-radio>
            <!-- sort -->
            <el-tag v-if="item.type === 'sort'" :class="SORT_HANDLER_CLASS_NAME">
              <el-icon> <DCaret /></el-icon>
            </el-tag>
          </template>
        </el-table-column>
        <!-- other -->
        <table-column v-else :column="{ ...item, label: unref(label) }" :search-param="searchParam">
          <template v-for="slotName in Object.keys($slots)" #[slotName]="scope">
            <slot :name="slotName" v-bind="scope"></slot>
          </template>
        </table-column>
      </template>
      <!-- 插入表格最后一行之后的插槽 -->
      <template #append>
        <slot name="append"></slot>
      </template>
      <!-- 无数据 -->
      <template #empty>
        <div class="table-empty">
          <slot name="empty">
            <img src="@/assets/images/noData.webp" alt="noData" />
            <div>暂无数据</div>
          </slot>
        </div>
      </template>
    </el-table>
    <!-- 分页组件 -->
    <slot name="pagination">
      <pagination
        v-if="pagination !== ProTablePaginationEnum.NONE"
        :pageable="pageable"
        :handle-size-change="handleSizeChange"
        :handle-current-change="handleCurrentChange"
      />
    </slot>
  </div>
  <!-- 列设置 -->
  <ColSetting
    v-if="toolbarRightArr.some(item => item.name === 'layout')"
    v-model="showColSetting"
    :page-id="pageId"
    :table-columns="tableColumns"
    @confirm="handleColConfirm"
    @reset="handleColReset"
  />
</template>

<script setup lang="ts">
defineOptions({ name: 'ProTable' })
import { computed, onMounted, provide, ref, unref, watch } from 'vue'
import { ElButton, ElIcon, ElMessage, ElRadio, ElTable, ElTableColumn, ElTag, TableInstance } from 'element-plus'
import { useTable } from '@/hooks/useTable'
import { useSelection } from '@/hooks/useSelection'
import { type ColumnProps, type ProTableProps, ColumnTypes } from './interface'
import { handlePropPath } from '@/utils'
import SearchForm from '@/components/SearchForm/index.vue'
import Pagination from './components/Pagination.vue'
import ColSetting from './components/ColSetting.vue'
import TableColumn from './components/TableColumn'
import Sortable from 'sortablejs'
import { applyColSetting, toolbarButtonsConfig } from '@/utils/proTable'
import { Operation } from '@element-plus/icons-vue'
import { ProTablePaginationEnum } from '@/enums'
import { useI18n } from 'vue-i18n'
import { useLoadingStore } from '@/stores/modules/loading'
import { SORT_HANDLER_CLASS_NAME } from '@/constants/proTable'
const { t } = useI18n()
// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
  columns: () => [],
  requestAuto: true,
  pagination: ProTablePaginationEnum.BE,
  initParam: () => ({}),
  border: true,
  rowKey: 'id',
  searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
})

// table 实例
const tableRef = ref<TableInstance>()

// 是否显示搜索模块
const isShowSearch = ref(true)

const loadingStore = useLoadingStore()

const searchParamDefaultValuePromises: { key: string; promise: Promise<any> }[] = []

const importModal = ref({
  visible: false,
  title: t('protable.import'),
  type: 'import',
})

const exportModal = ref({
  visible: false,
  title: t('protable.export'),
  type: 'export',
})

// 搜索表单实例
const searchFormRef = ref<InstanceType<typeof SearchForm>>()

// 单选值
const radio = ref('')

const toolbarLeftArr = computed(() => {
  if (!props.toolbarLeft) {
    return []
  }
  return props.toolbarLeft.map(item => {
    if (typeof item === 'string') {
      return toolbarButtonsConfig[item]
    } else {
      return item
    }
  })
})

const toolbarRightArr = computed(() => {
  // default toolbarRight is [layout]
  if (!props.toolbarRight) {
    return [toolbarButtonsConfig.layout]
  }
  return props.toolbarRight.map(item => {
    if (typeof item === 'string') {
      return toolbarButtonsConfig[item]
    } else {
      return item
    }
  })
})

// 表格多选 Hooks
const { selectionChange, selectedList, selectedListIds, isSelected } = useSelection(props.rowKey)

// 处理 toolbar 点击事件
const handleToolbarClick = (name: string) => {
  const payload: { name: string; params?: any } = { name }
  switch (name) {
    case 'refresh':
      search()
      break
    case 'upload':
      importModal.value.visible = true
      break
    case 'export':
      exportModal.value.visible = true
      break
    case 'layout':
      openColSetting()
      break
    case 'search':
      isShowSearch.value = !isShowSearch.value
      break
    default:
      payload.name = name
      break
  }
  emit('toolbarClick', payload)
}

// 表格操作 Hooks
const {
  tableData,
  pageable,
  searchParam,
  searchInitParam,
  getTableList,
  search,
  reset,
  handleSizeChange,
  handleCurrentChange,
} = useTable(props.requestApi, props.initParam, props.pagination, t, props.fePaginationFilterMethod, props.dataCallback)

// 清空选中数据列表
const clearSelection = () => tableRef.value!.clearSelection()

// 初始化表格数据 && 拖拽排序
onMounted(() => {
  dragSort()
  Promise.all(searchParamDefaultValuePromises.map(item => item.promise))
    .then(res => {
      res.forEach((value, index) => {
        const { key } = searchParamDefaultValuePromises[index]
        searchParam.value[key] = value
        searchInitParam.value[key] = value
      })
    })
    .then(() => {
      props.requestAuto && getTableList()
    })
})

// 监听页面 initParam 改化，重新获取表格数据
watch(
  () => props.initParam,
  () => getTableList(false),
  { deep: true }
)

// 接收 columns 并设置为响应式
const tableColumns = computed(() => props.columns)

// 扁平化 columns
const flatColumns = computed(() => flatColumnsFunc(tableColumns.value))

// 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
const enumMap = ref(new Map<string, { [key: string]: any }[]>())
const setEnumMap = async ({ prop, enum: enumValue }: ColumnProps) => {
  if (!enumValue) {
    return
  }

  // 如果当前 enumMap 存在相同的值 return
  if (enumMap.value.has(prop!) && (typeof enumValue === 'function' || enumMap.value.get(prop!) === enumValue)) {
    return
  }

  // 当前 enum 为静态数据，则直接存储到 enumMap
  if (typeof enumValue !== 'function') {
    return enumMap.value.set(prop!, unref(enumValue!))
  }

  // 为了防止接口执行慢，而存储慢，导致重复请求，所以预先存储为[]，接口返回后再二次存储
  enumMap.value.set(prop!, [])

  // 当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
  const data = await enumValue()
  enumMap.value.set(prop!, data)
}

// 注入 enumMap
provide('enumMap', enumMap)

// 扁平化 columns 的方法
const flatColumnsFunc = (columns: ColumnProps[], flatArr: ColumnProps[] = []) => {
  columns.forEach(async col => {
    if (col.children?.length) {
      flatArr.push(...flatColumnsFunc(col.children))
    }
    flatArr.push(col)

    // column 添加默认 isShow && disableUICustomize && isFilterEnum 属性值
    col.isShow = col.isShow ?? true
    col.disableUICustomize = col.disableUICustomize ?? false
    col.isFilterEnum = col.isFilterEnum ?? true

    // 设置 enumMap
    await setEnumMap(col)
  })
  return flatArr.filter(item => !item.children?.length)
}

// 过滤需要搜索的配置项 && 排序
const searchColumns = computed(() => {
  return flatColumns.value
    ?.filter(item => item.search?.el || item.search?.render)
    .sort((a, b) => a.search!.order! - b.search!.order!)
})

// 如果是前端分页，且有筛选参数，但是没有 fePaginationFilterMethod，则抛出错误
if (
  props.pagination === ProTablePaginationEnum.FE &&
  searchColumns.value.length !== 0 &&
  !props.fePaginationFilterMethod
) {
  ElMessage.error(t('error.fePaginationFilterMethodIsRequired'))
}

// 设置 搜索表单默认排序 && 搜索表单项的默认值
searchColumns.value?.forEach((column, index) => {
  column.search!.order = column.search?.order ?? index + 2
  const key = column.search?.key ?? handlePropPath(column.prop!)
  const defaultValue = column.search?.defaultValue
  if (defaultValue !== undefined && defaultValue !== null) {
    if (defaultValue instanceof Promise) {
      searchParamDefaultValuePromises.push({ key, promise: defaultValue })
    } else {
      searchParam.value[key] = defaultValue
      searchInitParam.value[key] = defaultValue
    }
  }
})

const setSearchParamForm = (key: string, value: any) => {
  searchParam.value[key] = value
}

const showColSetting = ref(false)
const openColSetting = () => {
  showColSetting.value = true
}

const renderKey = ref(0)

const handleColConfirm = () => {
  showColSetting.value = false
  applyColSetting(props.pageId, props.columns)
  renderKey.value++
}
const handleColReset = () => {
  renderKey.value++
  showColSetting.value = false
}

// 定义 emit 事件
const emit = defineEmits<{
  search: []
  reset: []
  dragSort: [{ newIndex?: number; oldIndex?: number }]
  toolbarClick: [{ name: string; payload?: any }]
}>()

const _search = () => {
  search()
  emit('search')
}

const _reset = () => {
  reset()
  emit('reset')
}

// 表格拖拽排序
const dragSort = () => {
  const tbody = document.querySelector(`[data-page-id="${props.pageId}"] tbody`) as HTMLElement
  Sortable.create(tbody, {
    handle: SORT_HANDLER_CLASS_NAME,
    animation: 300,
    onEnd({ newIndex, oldIndex }) {
      const [removedItem] = tableData.value.splice(oldIndex!, 1)
      tableData.value.splice(newIndex!, 0, removedItem)
      emit('dragSort', { newIndex, oldIndex })
    },
  })
}

// 暴露给父组件的参数和方法
defineExpose({
  element: tableRef,
  tableData,
  radio,
  pageable,
  searchParam,
  searchInitParam,
  isSelected,
  selectedList,
  selectedListIds,

  setSearchParamForm,
  getTableList,
  search,
  reset,
  handleSizeChange,
  handleCurrentChange,
  clearSelection,
  enumMap,
})
</script>
