<template>
  <!-- 列设置 -->
  <el-drawer v-model="visible" :title="$t('proTable.colSetting')" size="800px">
    <div class="pro-table-col-setting">
      <el-table
        ref="tableRef"
        :data="colSetting"
        :border="true"
        row-key="prop"
        default-expand-all
        align="center"
        :tree-props="{ children: '_children' }"
        :row-class-name="tableRowClassName"
      >
        <el-table-column v-slot="scope" prop="columnOrder" :label="$t('proTable.columnOrder')" width="60">
          <el-tag
            :type="scope.row.disableUICustomize ? 'info' : 'primary'"
            :class="scope.row.disableUICustomize ? 'geeker-table-sort-handler-disabled' : 'geeker-table-sort-handler'"
            :data-field="scope.row.prop"
          >
            <el-icon> <DCaret /></el-icon>
          </el-tag>
        </el-table-column>
        <el-table-column prop="label" :label="$t('proTable.colName')" width="auto" show-overflow-tooltip />
        <el-table-column v-slot="scope" prop="isShow" :label="$t('proTable.colShow')" width="80">
          <el-switch v-model="scope.row.isShow" :disabled="scope.row.disableUICustomize" />
        </el-table-column>
        <el-table-column v-slot="scope" prop="fixed" :label="$t('proTable.fixed')" width="190">
          <el-radio-group v-model="scope.row.fixed" :disabled="scope.row.disableUICustomize">
            <el-radio-button :label="$t('proTable.left')" value="left" />
            <el-radio-button :label="$t('proTable.right')" value="right" />
            <el-radio-button :label="$t('proTable.unset')" value="" />
          </el-radio-group>
        </el-table-column>

        <el-table-column v-slot="scope" prop="width" :label="$t('proTable.width')" width="120">
          <el-input-number
            v-model="scope.row.width"
            :min="1"
            controls-position="right"
            :style="{ width: '88px' }"
            :disabled="scope.row.disableUICustomize"
          />
        </el-table-column>
        <el-table-column v-slot="scope" prop="sortable" :label="$t('proTable.colSort')" width="80">
          <el-switch v-model="scope.row.sortable" :disabled="scope.row.disableUICustomize" />
        </el-table-column>
        <template #empty>
          <el-empty :description="$t('proTable.noColSetting')" />
        </template>
      </el-table>
      <div class="flex justify-end gap-2 mt-4">
        <el-button type="default" @click="handleReset">{{ $t('reset') }}</el-button>
        <el-button type="primary" @click="handleConfirm">{{ $t('confirm') }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
defineOptions({ name: 'ColSetting' })
import { ref } from 'vue'
import { ColumnTypes, type ColumnProps } from '@/components/ProTable/interface'
import Sortable from 'sortablejs'
import type { TableInstance } from 'element-plus'

const props = defineProps<{ tableColumns: ColumnProps[]; pageId: string }>()

const getTableColumnSetting = (setting: ColumnProps, index) => {
  return {
    type: setting.type,
    label: setting.label,
    prop: setting.prop,
    fixed: setting.fixed,
    width: setting.width,
    sortable: setting.sortable,
    disableUICustomize: ColumnTypes.includes(setting.type!) ? true : setting.disableUICustomize,
    isShow: setting.isShow,
    columnOrder: setting.columnOrder ? setting.columnOrder : index,
    children: setting.children?.map(getTableColumnSetting, index),
  }
}

const tableRowClassName = ({ row }: { row: ColumnProps }) => {
  if (row.disableUICustomize || ColumnTypes.includes(row.type!)) {
    return 'disabled-row'
  }
  return ''
}

/**
 * 1，特殊类型的分组显示，这个看要不要做，比如排序、勾选和展开等
 * 2，排序fixed优先级最高，如果一个没有排序的设置了index1，但是有fixed left 列，则index1列排在 fixed left 列后面，fixed 列内部也支持排序
 * 3，
 * 这些排序规则应用到 col setting 组件和 pro table 组件
 */

const colSetting = computed(() => props.tableColumns.map(getTableColumnSetting))

const tableRef = ref<TableInstance | null>(null)
const emit = defineEmits(['confirm', 'reset'])
const visible = defineModel<boolean>()
const dragOptions: Sortable.Options = {
  handle: '.geeker-table-sort-handler',
  animation: 300,
  delay: 1,
  delayOnTouchOnly: true,
  onEnd: (e: Sortable.SortableEvent) => {
    const { newIndex, oldIndex } = e
    if (newIndex === undefined || oldIndex === undefined || newIndex === oldIndex) {
      return
    }
    const [removedItem] = colSetting.value.splice(oldIndex, 1)
    colSetting.value.splice(newIndex, 0, removedItem)
  },
}

const handleConfirm = () => {
  visible.value = false
  localStorage.setItem(`${props.pageId}-colSetting`, JSON.stringify(colSetting.value))
  emit('confirm')
}
const handleReset = () => {
  visible.value = false
  localStorage.removeItem(`${props.pageId}-colSetting`)
  emit('reset')
}

watch(
  () => visible.value,
  val => {
    if (val) {
      nextTick(() => {
        const el = tableRef.value?.$el.querySelector('.el-table__body-wrapper tbody')
        if (!el) {
          return
        }
        Sortable.create(el, dragOptions)
      })
    }
  }
)
</script>

<style scoped lang="scss">
.pro-table-col-setting {
  user-select: none;
  .geeker-table-sort-handler,
  svg {
    cursor: move;
  }
  .geeker-table-sort-handler-disabled,
  svg {
    cursor: not-allowed;
  }
}
:deep(.el-table .disabled-row) {
  --el-table-tr-bg-color: var(--el-color-info-light-9);
}
</style>
