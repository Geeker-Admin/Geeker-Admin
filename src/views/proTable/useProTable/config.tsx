import { computed, reactive } from 'vue'
import { dayjs, ElButton, ElInput, ElMessage, ElSwitch, ElTag } from 'element-plus'
import type { ReqUserParams } from '@/api/system/user'
import { type ResUserList, UserAPI } from '@/api/system/user'
import type { HeaderRenderScope, ProTableProps } from '@/components/ProTable/interface'
import { useAuthStore } from '@/stores/modules/auth'

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
}: {
  changeStatusHandler: (_row: ResUserList) => Promise<void>
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
        search: { el: 'select', props: { filterable: true } },
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
          props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss' },
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
        search: { el: 'tree-select', props: { filterable: true } },
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
      { prop: 'operation', label: '操作', fixed: 'right', width: 330 },
    ]),
    // toolbarLeft: [
    //   'add',
    //   { auth: 'batchAdd', name: 'batchAdd', text: '批量添加用户', icon: 'Upload', type: 'primary' },
    //   'delete',
    // ],
    toolbarRight: ['search', 'export', 'refresh', 'layout'],
    requestApi: getTableList,
    initParam: reactive({ status: 1 }),
    toolbarMiddle: <ElButton onClick={() => ElMessage.success('自定义中间按钮')}>自定义中间按钮</ElButton>,
  }
}

export default getTableConfig
