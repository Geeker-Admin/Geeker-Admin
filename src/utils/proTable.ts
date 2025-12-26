import type { IColumnSettingItem } from '@/components/ProTable/components/ColSetting.vue'
import type { ColumnProps } from '@/components/ProTable/interface'
import { COL_SETTINGS_CACHE_KEY } from '@/constants/proTable'
import type { ButtonProps } from 'element-plus'

/**
 * @description 表格工具栏按钮配置
 */
export const toolbarButtonsConfig: Record<
  string,
  {
    auth: string
    icon: string
    name: string
    text: string
    type: ButtonProps['type']
    attrs?: Omit<ButtonProps, 'icon' | 'text' | 'type'>
  }
> = {
  // 默认左边按钮
  add: {
    auth: 'add',
    icon: 'Plus',
    name: 'add',
    text: '新增',
    type: 'primary',
  },
  delete: {
    auth: 'delete',
    icon: 'Delete',
    name: 'delete',
    text: '删除',
    type: 'danger',
  },
  import: {
    auth: 'import',
    icon: 'Upload',
    name: 'import',
    text: '导入',
    type: 'primary',
  },
  // 默认右边按钮
  refresh: {
    auth: 'refresh',
    icon: 'Refresh',
    name: 'refresh',
    type: 'primary',
    text: '刷新',
  },
  layout: {
    auth: 'layout',
    icon: 'Setting',
    name: 'layout',
    type: 'primary',
    text: '列布局',
  },
  upload: {
    auth: 'upload',
    icon: 'Upload',
    name: 'upload',
    type: 'primary',
    text: '上传',
  },
  export: {
    auth: 'export',
    icon: 'Download',
    name: 'export',
    type: 'primary',
    text: '下载',
  },
  search: {
    auth: 'search',
    icon: 'Search',
    name: 'search',
    text: '搜索',
    type: 'primary',
  },
}

export const applyColSetting = (pageId: string, columns: ColumnProps[]) => {
  const cachedValue = localStorage.getItem(`${pageId}${COL_SETTINGS_CACHE_KEY}`)
  if (cachedValue) {
    const colSettings: IColumnSettingCache = JSON.parse(cachedValue)
    columns.forEach(col => {
      if (col.prop && colSettings[col.prop]) {
        const setting = colSettings[col.prop]
        col.isShow = setting.show
        col.sortable = setting.sort
        col.fixed = setting.fixed
      }
    })
    // 根据 order 排序
    columns.sort((a, b) => {
      const aOrder = a.prop && colSettings[a.prop]?.order
      const bOrder = b.prop && colSettings[b.prop]?.order
      if (typeof aOrder === 'number' && typeof bOrder === 'number') {
        return aOrder - bOrder
      }
      return 0
    })
  }
}

export const generateColumnSettingCache = (columns: IColumnSettingItem[]): IColumnSettingCache => {
  const cache: IColumnSettingCache = {}
  columns.forEach((item, index) => {
    if (item.prop) {
      cache[item.prop] = {
        order: index,
        show: item.isShow !== false, // 默认为 true
        sort: !!item.sortable,
        fixed: item.fixed,
        children: item.children ? generateColumnSettingCache(item.children) : undefined,
      }
    }
  })
  return cache
}

export type IColumnSettingCache = {
  [key: string]: {
    order: number
    show: boolean
    sort: boolean
    fixed?: string | boolean
    children?: IColumnSettingCache
  }
}
