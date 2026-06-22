<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      :key="proTableKey"
      v-bind="config"
      :request-api="config.requestApi"
      @drag-sort="sortTable"
      @toolbar-click="handleToolbarClick"
    />
    <UserDrawer ref="drawerRef" />
    <ImportExcel ref="importRef" />
  </div>
</template>
<script setup lang="tsx">
defineOptions({
  name: 'DictManage',
})
import { getConfig } from './config'
import ProTable from '@/components/ProTable/index.vue'
import ImportExcel from '@/components/ImportExcel/index.vue'
import UserDrawer from '@/views/proTable/components/UserDrawer.vue'
import type { DictListItem } from '@/api/system/dict'
import { ref } from 'vue'
import { DictAPI } from '@/api/system/dict'

const drawerRef = ref()
const importRef = ref()
const proTable = ref()

const tableData = ref<DictListItem[]>([])

const getTableData = async () => {
  const res = await DictAPI.getDictList({ pageNum: 1, pageSize: 20 })
  tableData.value = res.list
}

getTableData()

const sortTable = () => {}
const batchDelete = (ids: string[]) => {
  // oxlint-disable-next-line no-console
  console.log(ids)
}
const openDrawer = (title: string, row: Partial<DictListItem> = {}) => {
  const params = {
    title,
    row: { ...row },
    isView: title === '查看',
    api: title === '新增' ? DictAPI.add : title === '编辑' ? DictAPI.edit : undefined,
    getTableList: proTable.value?.getTableList,
  }
  drawerRef.value?.acceptParams(params)
}

const config = getConfig()

const proTableKey = config.columns.map(col => col.label ?? '').join('-')

const handleToolbarClick = ({ name }: { name: string }) => {
  if (name === 'add') {
    openDrawer('新增')
  } else if (name === 'delete') {
    batchDelete(proTable.value?.selectedListIds)
  }
}
</script>
