<template>
  <!-- 列设置 -->
  <el-drawer v-model="visible" :title="$t('proTable.colSetting')" size="600px">
    <div class="pro-table-col-setting">
      <el-table ref="tableRef" :data="colSetting" :border="true" row-key="prop" default-expand-all align="center">
        <el-table-column prop="label" :label="$t('proTable.colName')" width="auto" show-overflow-tooltip />
        <el-table-column v-slot="scope" prop="columnOrder" :label="$t('proTable.columnOrder')" width="60">
          <el-tag type="primary" class="geeker-table-sort-handler" :data-field="scope.row.prop">
            <el-icon> <DCaret /></el-icon>
          </el-tag>
        </el-table-column>
        <el-table-column v-slot="scope" prop="isShow" :label="$t('proTable.colShow')" width="80">
          <el-switch v-model="scope.row.isShow" :disabled="scope.row.disableUICustomize" />
        </el-table-column>
        <el-table-column v-slot="scope" prop="fixed" :label="$t('proTable.fixed')" width="190">
          <el-radio-group v-model="scope.row.fixed" :disabled="scope.row.disableUICustomize">
            <el-radio-button :label="$t('proTable.left')" value="left" />
            <el-radio-button :label="$t('proTable.unset')" :value="false" />
            <el-radio-button :label="$t('proTable.right')" value="right" />
          </el-radio-group>
        </el-table-column>

        <!-- <el-table-column v-slot="scope" prop="width" :label="$t('proTable.width')" width="120">
          <el-input-number
            v-model="scope.row.width"
            :min="50"
            :max="500"
            controls-position="right"
            :style="{ width: '88px' }"
            :disabled="scope.row.disableUICustomize"
          />
        </el-table-column> -->
        <el-table-column v-slot="scope" width="80" prop="sortable" align="center" :label="$t('proTable.colSort')">
          <el-switch v-model="scope.row.sortable" />
        </el-table-column>
        <template #empty>
          <el-empty :description="$t('proTable.noColSetting')" />
        </template>
      </el-table>
    </div>
    <template #footer>
      <div class="flex justify-end">
        <el-button type="default" @click="handleReset">{{ $t('reset') }}</el-button>
        <el-button type="primary" @click="handleConfirm">{{ $t('confirm') }}</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
defineOptions({ name: 'ProTableColSetting' })
import { ref } from 'vue'
import { ColumnTypes, type ColumnProps } from '@/components/ProTable/interface'
import Sortable from 'sortablejs'
import type { TableInstance } from 'element-plus'
import { COL_SETTINGS_CACHE_KEY } from '@/constants/proTable'

import { generateColumnSettingCache, type IColumnSettingCache } from '@/utils/proTable'

const props = defineProps<{ tableColumns: ColumnProps[]; pageId: string }>()

export interface IColumnSettingItem {
  label?: string
  prop?: string
  type?: string
  columnOrder?: number
  fixed?: string | boolean
  sortable?: string | boolean
  disableUICustomize?: boolean
  isShow?: boolean
  children: TreeLike<IColumnSettingItem>[]
}

let colSettingCache: IColumnSettingCache = {}

try {
  colSettingCache = JSON.parse(localStorage.getItem(`${props.pageId}${COL_SETTINGS_CACHE_KEY}`) || '{}')
} catch (error) {
  console.error(error)
}

const getTableColumnSetting = (setting: ColumnProps): TreeLike<IColumnSettingItem> => {
  const prop = setting.prop
  const cacheItem = prop ? colSettingCache[prop] : undefined
  return {
    prop,
    label: unref(setting.label),
    fixed: unref(setting.fixed) || false,
    sortable: cacheItem?.sort ?? (unref(setting.sortable) || false),
    isShow: cacheItem?.show ?? isShowColumns(setting),
    children: setting.children?.map(getTableColumnSetting) || [],
  }
}

const isShowColumns = (setting: ColumnProps): boolean => {
  return (
    (colSettingCache[setting.prop!] || unref(setting.isShow ?? true)) &&
    (colSettingCache[setting.prop!] || !setting.fixed) &&
    !ColumnTypes.includes(setting.type!) &&
    !setting.disableUICustomize
  )
}

const colSetting = computed(() => props.tableColumns.filter(isShowColumns).map(getTableColumnSetting))

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
    colSetting.value.forEach((item, index) => {
      item.columnOrder = index
    })
  },
}

const handleConfirm = () => {
  visible.value = false
  const cache = generateColumnSettingCache(colSetting.value as IColumnSettingItem[]) // Casting to match if TreeLike inference issue
  localStorage.setItem(`${props.pageId}${COL_SETTINGS_CACHE_KEY}`, JSON.stringify(cache))
  emit('confirm', colSetting.value)
}
const handleReset = () => {
  visible.value = false
  localStorage.removeItem(`${props.pageId}${COL_SETTINGS_CACHE_KEY}`)
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
}
</style>
