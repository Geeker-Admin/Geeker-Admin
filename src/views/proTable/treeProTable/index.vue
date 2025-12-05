<template>
  <div class="main-box">
    <TreeFilter
      label="name"
      title="部门列表(单选)"
      :data="treeFilterData"
      :default-value="initParam.departmentId"
      @change="changeTreeFilter"
    />
    <div class="table-box">
      <!-- @vue-generic {import('@/api/system/user').ReqUserParams} -->
      <ProTable
        ref="proTable"
        :indent="20"
        :columns="columns"
        :request-api="UserAPI.getUserTreeList"
        :request-auto="false"
        :init-param="initParam"
        :search-col="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }"
      >
        <!-- 表格 header 按钮 -->
        <template #toolbarLeft>
          <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增用户</el-button>
        </template>
        <!-- 表格操作 -->
        <template #operation="scope">
          <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
          <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
          <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
        </template>
      </ProTable>
      <UserDrawer ref="drawerRef" />
      <ImportExcel ref="dialogRef" />
    </div>
  </div>
</template>

<script setup lang="tsx" name="treeProTable">
import { onMounted, reactive, ref } from 'vue'
import type { ResUserList } from '@/api/system/user'
import { genderType } from '@/utils/dict'
import { useHandleData } from '@/hooks/useHandleData'
import { ElMessage, ElNotification } from 'element-plus'
import ProTable from '@/components/ProTable/index.vue'
import TreeFilter from '@/components/TreeFilter/index.vue'
import ImportExcel from '@/components/ImportExcel/index.vue'
import UserDrawer from '@/views/proTable/components/UserDrawer.vue'
import { CirclePlus, Delete, EditPen, View } from '@element-plus/icons-vue'
import type { ColumnProps, ProTableInstance } from '@/components/ProTable/interface'
import { UserAPI } from '@/api/system/user'

onMounted(() => {
  getTreeFilter()
  ElNotification({
    title: '温馨提示',
    message: '该页面 ProTable 数据不会自动请求，需等待 treeFilter 数据请求完成之后，才会触发表格请求。',
    type: 'info',
    duration: 10000,
  })
  setTimeout(() => {
    ElNotification({
      title: '温馨提示',
      message: '该页面 ProTable 性别搜索框为远程数据搜索，详情可查看代码。',
      type: 'info',
      duration: 10000,
    })
  }, 0)
})

// ProTable 实例
const proTable = ref<ProTableInstance>()

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({ departmentId: '' })

// 获取 treeFilter 数据
// 当 proTable 的 requestAuto 属性为 false，不会自动请求表格数据，等待 treeFilter 数据回来之后，更改 initParam.departmentId 的值，才会触发请求 proTable 数据
const treeFilterData = ref<any>([])
const getTreeFilter = async () => {
  treeFilterData.value = await UserAPI.getUserDepartment()
  initParam.departmentId = treeFilterData.value[1].id
}

// 树形筛选切换
const changeTreeFilter = (val: string) => {
  ElMessage.success('请注意查看请求参数变化 🤔')
  proTable.value!.pageable.pageNum = 1
  initParam.departmentId = val
}

// 模拟远程加载性别搜索框数据
const loading = ref(false)
const filterGenderEnum = ref<typeof genderType>([])
const remoteMethod = (query: string) => {
  filterGenderEnum.value = []
  if (!query) {
    return
  }
  loading.value = true
  setTimeout(() => {
    loading.value = false
    filterGenderEnum.value = genderType.filter(item => item.label.includes(query))
  }, 500)
}

// 表格配置项
const columns = reactive<ColumnProps<ResUserList>[]>([
  { type: 'index', label: '#', width: 80 },
  { prop: 'username', label: '用户姓名' },
  {
    prop: 'gender',
    label: '性别',
    sortable: true,
    isFilterEnum: false,
    enum: filterGenderEnum,
    search: {
      el: 'select',
      attrs: {
        placeholder: '请输入性别查询',
        filterable: true,
        remote: true,
        reserveKeyword: true,
        loading,
        remoteMethod,
      },
    },
  },
  { prop: 'idCard', label: '身份证号' },
  { prop: 'email', label: '邮箱' },
  { prop: 'address', label: '居住地址' },
  {
    prop: 'status',
    label: '用户状态',
    sortable: true,
    tag: true,
    enum: UserAPI.getUserStatus,
    search: { el: 'tree-select' },
    fieldNames: { label: 'userLabel', value: 'userStatus' },
  },
  { prop: 'createTime', label: '创建时间', width: 180 },
  { type: 'operation', label: '操作', width: 300, fixed: 'right' },
])

// 删除用户信息
const deleteAccount = async (params: ResUserList) => {
  await useHandleData(UserAPI.deleteUser, { id: [params.id] }, `删除【${params.username}】用户`)
  proTable.value?.getTableList()
}

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof UserDrawer> | null>(null)
const openDrawer = (title: string, row: Partial<ResUserList> = {}) => {
  const params = {
    title,
    row: { ...row },
    isView: title === '查看',
    api: title === '新增' ? UserAPI.addUser : title === '编辑' ? UserAPI.editUser : undefined,
    getTableList: proTable.value?.getTableList,
  }
  drawerRef.value?.acceptParams(params)
}
</script>
