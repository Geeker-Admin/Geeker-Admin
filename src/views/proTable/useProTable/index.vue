<template>
  <div class="table-box">
    <ProTable ref="proTable" v-bind="tableConfig" @drag-sort="sortTable" @toolbar-click="toolbarClickHandler">
      <!-- 表格 header 按钮 -->
      <!-- <template #toolbarLeft="scope">
        <el-button v-auth="'add'" type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增用户</el-button>
        <el-button v-auth="'batchAdd'" type="primary" :icon="Upload" plain @click="batchAdd">批量添加用户</el-button>
        <el-button v-auth="'export'" type="primary" :icon="Download" plain @click="downloadFile">
          导出用户数据
        </el-button>
        <el-button
          type="primary"
          plain
          :disabled="!scope.isSelected && scope.selectedListIds.length === 0"
          @click="toDetail(scope.selectedListIds)"
        >
          To 子集详情页面
        </el-button>
        <el-button
          type="danger"
          :icon="Delete"
          plain
          :disabled="!scope.isSelected"
          @click="batchDelete(scope.selectedListIds)"
        >
          批量删除用户
        </el-button>
      </template> -->
      <!-- Expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <!-- usernameHeader -->
      <template #usernameHeader="scope">
        <el-button type="primary" @click="ElMessage.success('我是通过作用域插槽渲染的表头')">
          {{ scope.column.label }}
        </el-button>
      </template>
      <!-- createTime -->
      <template #createTime="scope">
        <el-button type="primary" link @click="ElMessage.success('我是通过作用域插槽渲染的内容')">
          {{ scope.row.createTime }}
        </el-button>
      </template>
    </ProTable>
    <UserDrawer ref="drawerRef" />
    <ImportExcel ref="dialogRef" />
    <el-dialog v-model="functionDialogVisible" title="功能说明" width="30%">
      <h3>本页面演示了 ProTable 组件的以下功能：</h3>
      <ul>
        <li>1. 使用 单独文件 `config.tsx` 配置表格</li>
        <li>2. 使用 config.tsx 配置表格的 toolbarLeft 和 toolbarRight</li>
        <li>
          3. 使用 config.tsx 配置和 slot 渲染表格的 表头和表格内容。用户姓名表头是 slots 插槽，表格内容是 render
          插槽，创建时间表头是 headerRender 插槽，表格内容是 slot 插槽
        </li>
        <li>
          4. 注意，本示例中，为了演示选中行之后修改 toolbar
          按钮的状态，代码非常复杂，且可读性很差。所以，请根据项目需求，选择更适合的方式渲染表格。
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, watch } from 'vue'
import { ElButton, ElDialog, ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { type ResUserList } from '@/api/system/user'
import { useHandleData } from '@/hooks/useHandleData'
import { useDownload } from '@/hooks/useDownload'
import { useAuthButtons } from '@/hooks/useAuthButtons'
import ProTable from '@/components/ProTable/index.vue'
import ImportExcel from '@/components/ImportExcel/index.vue'
import UserDrawer from '@/views/proTable/components/UserDrawer.vue'
import type { ProTableInstance } from '@/components/ProTable/interface'
import { UserAPI } from '@/api/system/user'
import getTableConfig from './config'

const functionDialogVisible = ref(false)

const router = useRouter()

// 跳转详情页
const toDetail = (ids: string[]) => {
  router.push(`/proTable/useProTable/detail/${ids.join(',')}/?params=detail-page`)
}

// ProTable 实例
const proTable = ref<ProTableInstance>()

// 页面按钮权限（按钮权限既可以使用 hooks，也可以直接使用 v-auth 指令，指令适合直接绑定在按钮上，hooks 适合根据按钮权限显示不同的内容）
const { BUTTONS } = useAuthButtons()

// 表格拖拽排序
const sortTable = ({ newIndex, oldIndex }: { newIndex?: number; oldIndex?: number }) => {
  // oxlint-disable-next-line no-console
  console.log(newIndex, oldIndex)
  // oxlint-disable-next-line no-console
  console.log(proTable.value?.tableData)
  ElMessage.success('修改列表排序成功')
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

// 切换用户状态
const changeStatusHandler = async (row: ResUserList) => {
  await useHandleData(
    UserAPI.changeUserStatus,
    { id: row.id, status: row.status == 1 ? 0 : 1 },
    `切换【${row.username}】用户状态`
  )
  proTable.value?.getTableList()
}

// 导出用户列表
const downloadFile = async () => {
  ElMessageBox.confirm('确认导出用户数据?', '温馨提示', { type: 'warning' }).then(() =>
    useDownload(UserAPI.exportUserInfo, '用户列表', proTable.value?.searchParam)
  )
}

// 批量添加用户
const dialogRef = ref<InstanceType<typeof ImportExcel> | null>(null)
const batchAdd = () => {
  const params = {
    title: '用户',
    tempApi: UserAPI.exportUserInfo,
    importApi: UserAPI.batchAddUser,
    getTableList: proTable.value?.getTableList,
  }
  dialogRef.value?.acceptParams(params)
}

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof UserDrawer> | null>(null)
const openDrawer = (title: string, row: Partial<ResUserList> = {}) => {
  const params = {
    title,
    isView: title === '查看',
    row: { ...row },
    api: title === '新增' ? UserAPI.addUser : title === '编辑' ? UserAPI.editUser : undefined,
    getTableList: proTable.value?.getTableList,
  }
  drawerRef.value?.acceptParams(params)
}

const openFunctionDialog = () => {
  functionDialogVisible.value = true
}

const tableConfig = getTableConfig({
  changeStatusHandler,
  openDrawer,
  resetPass,
  deleteAccount,
  openFunctionDialog,
})

watch(
  () => proTable.value?.selectedListIds,
  () => {
    const selectedListIdsEmpty = !proTable.value?.selectedListIds || proTable.value?.selectedListIds?.length === 0
    const toDetailItem = tableConfig.toolbarLeft!.find(item => typeof item === 'object' && item.name === 'toDetail')
    if (toDetailItem && typeof toDetailItem === 'object' && toDetailItem.attrs) {
      // 由于 attrs.disabled 是只读属性，不能直接赋值，需整体替换 attrs
      toDetailItem.attrs = { ...toDetailItem.attrs, disabled: selectedListIdsEmpty }
    }
    const batchDeleteItem = tableConfig.toolbarLeft!.find(
      item => typeof item === 'object' && item.name === 'batchDelete'
    )
    if (batchDeleteItem && typeof batchDeleteItem === 'object' && batchDeleteItem.attrs) {
      // 由于 attrs.disabled 是只读属性，不能直接赋值，需整体替换 attrs
      batchDeleteItem.attrs = { ...batchDeleteItem.attrs, disabled: selectedListIdsEmpty }
    }
  }
)

const toolbarClickHandler = ({ name }) => {
  if (name === 'add') {
    openDrawer('新增')
  } else if (name === 'batchAdd') {
    batchAdd()
  } else if (name === 'export') {
    downloadFile()
  } else if (name === 'toDetail') {
    toDetail(proTable.value?.selectedListIds || [])
  } else if (name === 'batchDelete') {
    batchDelete(proTable.value?.selectedListIds || [])
  }
}
</script>
