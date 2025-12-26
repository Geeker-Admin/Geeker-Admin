import type { ProTableProps } from '@/components/ProTable/interface'
import type { DictListItem, DictQuery } from '@/api/system/dict'
import { DictAPI } from '@/api/system/dict'
import { ElButton, ElMessage, ElTag } from 'element-plus'

export function getConfig(): ProTableProps<DictQuery, DictListItem> {
  return {
    pageId: 'system:dictManage',
    columns: [
      {
        prop: 'name',
        search: { el: 'input' },
        label: '字典名称',
        width: 150,
        align: 'left',
      },
      {
        prop: 'code',
        search: { el: 'input' },
        label: '字典编码',
      },
      {
        prop: 'remark',
        label: '备注',
      },
      {
        prop: 'status',
        label: '状态',
        width: 90,
        render: scope => {
          if (scope.row.parentId === 0) {
            return '-'
          }
          return <ElTag type={scope.row.type as any}>{scope.row.status === 1 ? '启用' : '禁用'}</ElTag>
        },
      },
      {
        type: 'operation',
        width: 200,
        fixed: 'right',
        render: scope => {
          return (
            <ElButton type="primary" link onClick={() => ElMessage.success('tsx button')}>
              operation of {scope.row.code}
            </ElButton>
          )
        },
      },
    ],
    initParam: {},
    requestApi: DictAPI.getDictList,
    toolbarLeft: ['add', 'delete'],
    toolbarRight: ['refresh', 'layout', 'search'],
    toolbarMiddle: () => <span>本页面是随机 mock 数据，跟常用组件里的 dict 数据没有关系</span>,
    searchCol: { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 },
    title: '字典管理',
  }
}
