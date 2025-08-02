<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      page-auth-id="pro-table:complex-pro-table"
      title="用户列表"
      highlight-current-row
      :columns="columns"
      :request-api="UserAPI.getUserList"
      :row-class-name="tableRowClassName"
      :span-method="objectSpanMethod"
      :show-summary="true"
      :summary-method="getSummaries"
      @row-click="rowClick"
    >
      <!-- 表格 header 按钮 -->
      <template #toolbarLeft="scope">
        <el-button type="primary" :icon="CirclePlus" @click="proTable?.element?.toggleAllSelection">
          全选 / 全不选
        </el-button>
        <el-button type="primary" :icon="Pointer" plain @click="setCurrent">选中第五行</el-button>
        <el-button
          type="danger"
          :icon="Delete"
          plain
          :disabled="!scope.isSelected"
          @click="batchDelete(scope.selectedListIds)"
        >
          批量删除用户
        </el-button>
      </template>
      <!-- Expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <!-- 表格操作 -->
      <template #[TABLE_COLUMN_OPERATIONS_NAME]="scope">
        <el-button type="primary" link :icon="Refresh" @click="resetPass(scope.row)">重置密码</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
      </template>
      <template #append>
        <span style="color: var(--el-color-primary)"
          >我是插入在表格最后的内容。若表格有合计行，该内容会位于合计行之上。</span
        >
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="tsx" name="complexProTable">
import { h, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { ResUserList } from '@/api/system/user'
import { useHandleData } from '@/hooks/useHandleData'
import ProTable from '@/components/ProTable/index.vue'
import { CirclePlus, Pointer, Delete, Refresh } from '@element-plus/icons-vue'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import type { ProTableInstance, ColumnProps, HeaderRenderScope } from '@/components/ProTable/interface'
import { UserAPI } from '@/api/system/user'
import type { DefaultRow } from 'element-plus/es/components/table/src/table/defaults.mjs'
import { TABLE_COLUMN_OPERATIONS_NAME } from '@/constants/proTable'

// ProTable 实例
const proTable = ref<ProTableInstance>()

// 自定义渲染表头（使用tsx语法）
const headerRender = (scope: HeaderRenderScope<ResUserList>) => {
  return h(
    'el-button',
    {
      type: 'primary',
      onClick: () => ElMessage.success('我是通过 tsx 语法渲染的表头'),
    },
    scope.column.label
  )
}

// 表格配置项
const columns = reactive<ColumnProps<ResUserList>[]>([
  { type: 'index', label: '#', width: 60 },
  { type: 'selection', width: 60 },
  { type: 'expand', label: 'Expand', width: 100 },
  {
    prop: 'base',
    label: '基本信息',
    headerRender,
    children: [
      { prop: 'username', label: '用户姓名', width: 110 },
      { prop: 'user.detail.age', label: '年龄', width: 100 },
      {
        prop: 'gender',
        label: '性别',
        width: 100,
        enum: UserAPI.getUserGender,
        fieldNames: { label: 'genderLabel', value: 'genderValue' },
      },
      {
        prop: 'details',
        label: '详细资料',
        children: [
          { prop: 'idCard', label: '身份证号' },
          { prop: 'email', label: '邮箱' },
          { prop: 'address', label: '居住地址' },
        ],
      },
    ],
  },
  {
    prop: 'status',
    label: '用户状态',
    tag: true,
    enum: UserAPI.getUserStatus,
    fieldNames: { label: 'userLabel', value: 'userStatus' },
  },
  { prop: 'createTime', label: '创建时间', width: 200 },
  { prop: TABLE_COLUMN_OPERATIONS_NAME, label: '操作', fixed: 'right', width: 230 },
])

// 选择行
const setCurrent = () => {
  proTable.value?.element?.setCurrentRow(proTable.value?.tableData[4])
  proTable.value?.element?.toggleRowSelection(proTable.value?.tableData[4], true)
}

// 表尾合计行（自行根据条件计算）
interface SummaryMethodProps<T extends DefaultRow = ResUserList> {
  columns: TableColumnCtx<T>[]
  data: T[]
}
const getSummaries = (param: SummaryMethodProps) => {
  const { columns } = param
  const sums: string[] = []
  columns.forEach((column, index) => {
    if (index === 0) {
      return (sums[index] = '合计')
    } else if (column.property === 'user.detail.age') {
      const values = param.data.map(item => Number(item.user?.detail?.age))
      sums[index] = values.reduce((a, b) => a + b, 0).toString()
    } else {
      sums[index] = 'N/A'
    }
  })
  return sums
}

// 列合并
interface SpanMethodProps {
  row: ResUserList
  column: TableColumnCtx<ResUserList>
  rowIndex: number
  columnIndex: number
}
const objectSpanMethod = ({ rowIndex, columnIndex }: SpanMethodProps) => {
  if (columnIndex === 3) {
    if (rowIndex % 2 === 0) {
      return { rowspan: 2, colspan: 1 }
    } else {
      return { rowspan: 0, colspan: 0 }
    }
  }
}

// 设置列样式
const tableRowClassName = ({ rowIndex }: { row: ResUserList; rowIndex: number }) => {
  if (rowIndex === 2) {
    return 'warning-row'
  }
  if (rowIndex === 6) {
    return 'success-row'
  }
  return ''
}

// 单击行
const rowClick = (row: ResUserList, column: TableColumnCtx<ResUserList>) => {
  if (column.property == 'radio' || column.property == TABLE_COLUMN_OPERATIONS_NAME) {
    return
  }
  ElMessage.success('当前行被点击了！' + row.id)
}

// 删除用户信息
const deleteAccount = async (params: ResUserList) => {
  await useHandleData(UserAPI.deleteUser, { id: [params.id] }, `删除【${params.username}】用户`)
  proTable.value?.getTableList()
}

// 批量删除用户信息
const batchDelete = async (id: string[]) => {
  await useHandleData(UserAPI.deleteUser, { id }, '删除所选用户信息')
  proTable.value?.clearSelection()
  proTable.value?.getTableList()
}

// 重置用户密码
const resetPass = async (params: ResUserList) => {
  await useHandleData(UserAPI.resetUserPassWord, { id: params.id }, `重置【${params.username}】用户密码`)
  proTable.value?.getTableList()
}
</script>

<style lang="scss">
.el-table .warning-row,
.el-table .warning-row .el-table-fixed-column--right,
.el-table .warning-row .el-table-fixed-column--left {
  background-color: var(--el-color-warning-light-9);
}
.el-table .success-row,
.el-table .success-row .el-table-fixed-column--right,
.el-table .success-row .el-table-fixed-column--left {
  background-color: var(--el-color-success-light-9);
}
</style>
