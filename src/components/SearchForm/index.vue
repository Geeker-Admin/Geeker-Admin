<template>
  <div v-if="columns.length" class="card table-search">
    <el-form ref="formRef" :model="searchParam" :disabled="loadingStore.loading">
      <grid ref="gridRef" :collapsed="collapsed" :gap="[20, 0]" :cols="searchCol">
        <grid-item v-for="(item, index) in columns" :key="item.prop" v-bind="getResponsive(item)" :index="index">
          <el-form-item>
            <template #label>
              <el-space :size="4">
                <span>{{ `${item.search?.label ?? item.label}` }}</span>
                <el-tooltip v-if="item.search?.tooltip" effect="dark" :content="item.search?.tooltip" placement="top">
                  <material-symbols-help-outline class="cursor-pointer" />
                </el-tooltip>
              </el-space>
              <span>&nbsp;:</span>
            </template>
            <search-form-item :column="item" :search-param="searchParam" :attrs="item.search?.attrs" />
          </el-form-item>
        </grid-item>
        <grid-item suffix>
          <div class="operation">
            <el-button type="primary" :icon="Search" :loading="loadingStore.loading" @click="search">
              {{ $t('common.search') }}
            </el-button>
            <el-button :icon="Delete" :loading="loadingStore.loading" @click="reset">
              {{ $t('common.reset') }}
            </el-button>
            <el-button v-if="showCollapse" type="primary" link class="search-isOpen" @click="collapsed = !collapsed">
              {{ collapsed ? $t('common.expand') : $t('common.collapse') }}
              <el-icon class="el-icon--right">
                <component :is="collapsed ? ArrowDown : ArrowUp" />
              </el-icon>
            </el-button>
          </div>
        </grid-item>
      </grid>
    </el-form>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'SearchForm' })
import type { ColumnProps } from '@/components/ProTable/interface'
import type { BreakPoint } from '@/components/Grid/interface'
import { Delete, Search, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import SearchFormItem from './components/SearchFormItem.vue'
import Grid from '@/components/Grid/index.vue'
import GridItem from '@/components/Grid/components/GridItem.vue'
import MaterialSymbolsHelpOutline from '~icons/material-symbols/help-outline?width=20px&height=20px'
import { useLoadingStore } from '@/stores/modules/loading'

const loadingStore = useLoadingStore()

interface ProTableProps {
  columns?: ColumnProps[] // 搜索配置列
  searchParam?: IObject // 搜索参数
  searchCol: number | Record<BreakPoint, number>
  search: (_params: IObject) => void // 搜索方法
  reset: (_params: IObject) => void // 重置方法
}

// 默认值
const props = withDefaults(defineProps<ProTableProps>(), {
  columns: () => [],
  searchParam: () => ({}),
})

// 获取响应式设置
const getResponsive = (item: ColumnProps) => {
  return {
    span: item.search?.span,
    offset: item.search?.offset ?? 0,
    xs: item.search?.xs,
    sm: item.search?.sm,
    md: item.search?.md,
    lg: item.search?.lg,
    xl: item.search?.xl,
  }
}

// 是否默认折叠搜索项
const collapsed = ref(true)

// 获取响应式断点
const gridRef = ref()
const breakPoint = computed<BreakPoint>(() => gridRef.value?.breakPoint)

// 判断是否显示 展开/合并 按钮
const showCollapse = computed(() => {
  let show = false
  props.columns.reduce((prev, current) => {
    prev +=
      (current.search![breakPoint.value]?.span ?? current.search?.span ?? 1) +
      (current.search![breakPoint.value]?.offset ?? current.search?.offset ?? 0)
    if (typeof props.searchCol !== 'number') {
      if (prev >= props.searchCol[breakPoint.value]) {
        show = true
      }
    } else {
      if (prev >= props.searchCol) {
        show = true
      }
    }
    return prev
  }, 0)
  return show
})
</script>
