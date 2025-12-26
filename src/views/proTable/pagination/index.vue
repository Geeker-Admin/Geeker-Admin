<template>
  <div class="main-box">
    <el-tabs v-model="activeTab" class="w-full" @tab-change="handleTabChange">
      <el-tab-pane label="前端分页" name="fePagination" class="table-box">
        <pro-table
          ref="proTableRef"
          page-id="proTable:pagination:fe"
          :columns="fePaginationColumns"
          :request-api="getAllData"
          :toolbar-middle="toolbarMiddle"
          :fe-pagination-filter-method="getFEPaginationData"
          :pagination="ProTablePaginationEnum.FE"
        />
      </el-tab-pane>
      <el-tab-pane label="无分页" name="noPagination" class="table-box">
        <pro-table
          page-id="proTable:pagination:no"
          :columns="noPaginationColumns"
          :request-api="getAllData"
          :pagination="ProTablePaginationEnum.NONE"
        />
      </el-tab-pane>
    </el-tabs>
    <el-dialog v-model="functionDialogVisible" title="功能说明" width="30%">
      <h3>本页面演示了 ProTable 组件的以下功能：</h3>
      <ul>
        <li>
          1，前端分页。前端分页一般有三种形式，分别是：
          <ul>
            <li>
              1，后端分页：使用 pagination 属性，设置为 ProTablePaginationEnum.BE，默认值。其他 ProTable
              页面都是后端分页，本页面不再演示
            </li>
            <li>
              2，前端分页：使用 pagination 属性，设置为 ProTablePaginationEnum.FE，需要配合 fe-pagination-filter-method
              属性使用
            </li>
            <li>3，无分页：使用 pagination 属性，设置为 ProTablePaginationEnum.NO</li>
          </ul>
        </li>
        <li>2，手动设置表单数据</li>
      </ul>
    </el-dialog>
  </div>
</template>

<script setup lang="tsx">
defineOptions({ name: 'UseProTablePagination' })
import type { TabPaneName } from 'element-plus'
import type { ColumnProps, ProTableInstance } from '@/components/ProTable/interface'
import { ProTablePaginationEnum } from '@/enums'
import { ElButton } from 'element-plus'

interface MockDataItem {
  id: number
  name: string
  age: number
}

const proTableRef = ref<ProTableInstance>()

const mockData = ref<MockDataItem[]>([])

for (let i = 0; i < 200; i++) {
  mockData.value.push({
    id: i + 1,
    name: `name${i + 1}`,
    age: i + 1,
  })
}

const getAllData = () => {
  return Promise.resolve(mockData.value)
}
const getFEPaginationData = (query: IObject) => {
  return mockData.value.filter(item => {
    return Object.keys(query).every(key =>
      item[key as keyof MockDataItem].toString().includes(query[key as keyof MockDataItem])
    )
  })
}

const setFormData = () => {
  proTableRef.value?.setSearchParamForm('name', 'name1')
}

const functionDialogVisible = ref(false)

const toolbarMiddle = () => {
  return [
    <ElButton type="primary" icon="InfoFilled" onClick={() => (functionDialogVisible.value = true)}>
      功能说明
    </ElButton>,
    <el-button type="success" onClick={setFormData}>
      设置表单数据
    </el-button>,
  ]
}

const activeTab = ref<TabPaneName>('fePagination')

const handleTabChange = (tab: TabPaneName) => {
  activeTab.value = tab
}

const noPaginationColumns = ref<ColumnProps<MockDataItem>[]>([
  {
    prop: 'id',
    label: 'ID',
  },
  {
    prop: 'name',
    label: 'Name',
  },
  {
    prop: 'age',
    label: 'Age',
  },
])

const fePaginationColumns = ref<ColumnProps<MockDataItem>[]>([
  {
    prop: 'id',
    label: 'ID',
  },
  {
    prop: 'name',
    label: 'Name',
    search: { el: 'input' },
  },
  {
    prop: 'age',
    label: 'Age',
  },
])
</script>

<style scoped lang="scss">
ul {
  margin-left: 2em;
}
</style>
