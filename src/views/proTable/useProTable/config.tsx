import { computed, reactive } from 'vue'
import { dayjs, ElButton, ElInput, ElMessage, ElSwitch, ElTag } from 'element-plus'
import type { ReqUserParams } from '@/api/system/user'
import { type ResUserList, UserAPI } from '@/api/system/user'
import type { HeaderRenderScope, ProTableProps } from '@/components/ProTable/interface'
import { useAuthStore } from '@/stores/modules/auth'
import { Delete, EditPen, View, Refresh, InfoFilled } from '@element-plus/icons-vue'

const authStore = useAuthStore()
const BUTTONS = computed(() => authStore.authButtonList)

// 自定义渲染表头（使用tsx语法）
export const headerRender = (scope: HeaderRenderScope<ResUserList>) => {
  return (
    <ElButton type="primary" onClick={() => ElMessage.success('我是通过 tsx 语法渲染的表头')}>
      {scope.column.label}
    </ElButton>
  )
}

const getTableList = (params: { createTime?: string[] } & ReqUserParams) => {
  const { createTime, ...newParams } = params
  if (createTime) {
    newParams.startTime = createTime[0]
    newParams.endTime = createTime[1]
  }
  return UserAPI.getUserList(newParams)
}

const getTableConfig = ({
  changeStatusHandler,
  openDrawer,
  resetPass,
  deleteAccount,
  openFunctionDialog,
}: {
  changeStatusHandler: (_row: ResUserList) => Promise<void>
  openDrawer: (_title: string, _row: ResUserList) => void
  resetPass: (_row: ResUserList) => void
  deleteAccount: (_row: ResUserList) => void
  openFunctionDialog: () => void
}): ProTableProps<ReqUserParams, ResUserList> => {
  return {
    columns: reactive([
      { type: 'selection', fixed: 'left', width: 70 },
      { type: 'sort', label: 'Sort', width: 80 },
      { type: 'expand', label: 'Expand', width: 85 },
      {
        prop: 'username',
        label: '用户姓名',
        minWidth: 130,
        search: { el: 'input', tooltip: '我是搜索提示' },
        render: scope => {
          return (
            <ElButton type="primary" link onClick={() => ElMessage.success('我是通过 tsx 语法渲染的内容')}>
              {scope.row.username}
            </ElButton>
          )
        },
      },
      {
        prop: 'gender',
        label: '性别',
        enum: UserAPI.getUserGender,
        search: { el: 'select', attrs: { filterable: true } },
        fieldNames: { label: 'genderLabel', value: 'genderValue' },
      },
      {
        prop: 'user.detail.age',
        label: '年龄',
        search: {
          render: ({ searchParam }) => {
            return (
              <div class=" flex justify-center items-center">
                <ElInput modelValue={searchParam.minAge} placeholder="最小年龄" />
                <span class="mr-2.5 ml-2.5">-</span>
                <ElInput modelValue={searchParam.maxAge} placeholder="最大年龄" />
              </div>
            )
          },
        },
      },
      { prop: 'idCard', label: '身份证号', minWidth: 110, search: { el: 'input' } },
      { prop: 'email', label: '邮箱', minWidth: 110 },
      { prop: 'address', label: '居住地址', minWidth: 110 },
      {
        prop: 'createTime',
        label: '创建时间',
        headerRender,
        width: 180,
        search: {
          el: 'date-picker',
          span: 2,
          attrs: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss' },
          defaultValue: [
            dayjs().subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss'),
            dayjs().format('YYYY-MM-DD HH:mm:ss'),
          ],
        },
      },
      {
        prop: 'status',
        label: '用户状态',
        enum: UserAPI.getUserStatus,
        minWidth: 110,
        search: { el: 'tree-select', attrs: { filterable: true } },
        fieldNames: { label: 'userLabel', value: 'userStatus' },
        render: scope => {
          return BUTTONS.value.includes('status') ? (
            <ElSwitch
              modelValue={scope.row.status}
              activeText={scope.row.status ? '启用' : '禁用'}
              activeValue={1}
              inactiveValue={0}
              onChange={() => changeStatusHandler(scope.row)}
            />
          ) : (
            <ElTag type={scope.row.status ? 'success' : 'danger'}>{scope.row.status ? '启用' : '禁用'}</ElTag>
          )
        },
      },
      {
        prop: 'operation',
        label: '操作',
        fixed: 'right',
        width: 330,
        render: scope => {
          // 也可以使用数组的方式，但是要注意不要缺少了 key 属性
          return (
            <>
              <ElButton type="primary" link={true} icon={View} onClick={() => openDrawer('查看', scope.row)}>
                查看
              </ElButton>
              <ElButton type="primary" link={true} icon={EditPen} onClick={() => openDrawer('编辑', scope.row)}>
                编辑
              </ElButton>
              <ElButton type="primary" link={true} icon={Refresh} onClick={() => resetPass(scope.row)}>
                重置密码
              </ElButton>
              <ElButton type="primary" link={true} icon={Delete} onClick={() => deleteAccount(scope.row)}>
                删除
              </ElButton>
            </>
          )
        },
      },
    ]),
    toolbarLeft: [
      { auth: 'add', name: 'add', text: '新增用户', icon: 'CirclePlus', type: 'primary' },
      { auth: 'batchAdd', name: 'batchAdd', text: '批量添加用户', icon: 'Upload', type: 'primary' },
      { auth: 'export', name: 'export', text: '导出用户数据', icon: 'Download', type: 'primary' },
      { auth: 'toDetail', name: 'toDetail', text: 'To 子集详情页面', type: 'primary', attrs: { disabled: true } },
      {
        auth: 'batchDelete',
        name: 'batchDelete',
        text: '批量删除用户',
        icon: 'Delete',
        type: 'danger',
        attrs: { disabled: true },
      },
    ],
    toolbarRight: ['search', 'export', 'refresh', 'layout'],
    requestApi: getTableList,
    initParam: { status: 1 },
    toolbarMiddle: () => (
      <ElButton onClick={() => openFunctionDialog()}>
        <InfoFilled />
        功能说明
      </ElButton>
    ),
  }
}

export default getTableConfig
