import type { VNode, ComponentPublicInstance, Ref, VNodeChild } from 'vue'
import type { BreakPoint, Responsive } from '@/components/Grid/interface'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import type ProTable from '@/components/ProTable/index.vue'
import type { ColProps, DialogProps, DrawerProps, ButtonProps, FormItemRule, FormProps } from 'element-plus'
import type { MaybeRef } from 'vue'
import type { DefaultRow } from 'element-plus/es/components/table/src/table/defaults.mjs'

export interface EnumProps {
  label?: string // 选项框显示的文字
  value?: string | number | boolean | any[] // 选项框值
  disabled?: boolean // 是否禁用此选项
  tagType?: string // 当 tag 为 true 时，此选择会指定 tag 显示类型
  children?: EnumProps[] // 为树形选择时，可以通过 children 属性指定子选项
  [key: string]: any
}

export type TypeProps = 'index' | 'selection' | 'radio' | 'expand' | 'sort'

export type SearchType =
  | 'input'
  | 'input-number'
  | 'select'
  | 'select-v2'
  | 'tree-select'
  | 'cascader'
  | 'date-picker'
  | 'time-picker'
  | 'time-select'
  | 'switch'
  | 'slider'

export type SearchRenderScope = {
  searchParam: { [key: string]: any }
  placeholder: string
  clearable: boolean
  options: EnumProps[]
  data: EnumProps[]
}

export type SearchProps = {
  el?: SearchType // 当前项搜索框的类型
  label?: string // 当前项搜索框的 label
  props?: any // 搜索项参数，根据 element plus 官方文档来传递，该属性所有值会透传到组件
  key?: string // 当搜索项 key 不为 prop 属性时，可通过 key 指定
  tooltip?: string // 搜索提示
  order?: number // 搜索项排序（从大到小）
  span?: number // 搜索项所占用的列数，默认为 1 列
  offset?: number // 搜索字段左侧偏移列数
  defaultValue?: string | number | boolean | any[] | Ref<any> // 搜索项默认值
  render?: (_scope: SearchRenderScope) => VNode // 自定义搜索内容渲染（tsx语法）
} & Partial<Record<BreakPoint, Responsive>>

export type FieldNamesProps = {
  label: string
  value: string
  children?: string
}

export type RenderScope<T extends DefaultRow> = {
  row: T
  $index: number
  column: TableColumnCtx<T>
  [key: string]: any
}

export type HeaderRenderScope<T extends DefaultRow> = {
  $index: number
  column: TableColumnCtx<T>
  [key: string]: any
}

export interface ColumnProps<T extends DefaultRow = any>
  extends Partial<Omit<TableColumnCtx<T>, 'type' | 'children' | 'renderCell' | 'renderHeader' | 'label'>> {
  type?: TypeProps // 列类型
  tag?: MaybeRef<boolean> // 是否是标签展示
  isShow?: MaybeRef<boolean> // 是否显示在表格当中，默认值为 true
  isSetting?: MaybeRef<boolean> // 是否在 ColSetting 中可配置
  search?: SearchProps // 搜索项配置
  enum?: EnumProps[] | Ref<EnumProps[]> | ((_params?: any) => Promise<any>) // 枚举字典
  isFilterEnum?: boolean | Ref<boolean> // 当前单元格值是否根据 enum 格式化（示例：enum 只作为搜索项数据）
  fieldNames?: FieldNamesProps // 指定 label && value && children 的 key 值
  headerRender?: (_scope: HeaderRenderScope<T>) => VNode // 自定义表头内容渲染（tsx语法）
  render?: (_scope: RenderScope<T>) => VNode | string // 自定义单元格内容渲染（tsx语法）
  children?: ColumnProps<T>[] // 多级表头
  label?: MaybeRef<string>
}

export type ProTableInstance = Omit<InstanceType<typeof ProTable>, keyof ComponentPublicInstance | keyof ProTableProps>

export interface ProTableProps<Q = any, I extends DefaultRow = any, Extra = IObject> {
  loading?: boolean // 表格是否加载中 ==> 非必传（默认为false）
  // 表格工具栏(默认支持add,delete,export,也可自定义)
  toolbarLeft?: Array<
    | 'add'
    | 'delete'
    | 'import'
    | {
        auth: string
        icon?: string
        name: string
        text: string
        type: ButtonProps['type']
        attrs?: Omit<ButtonProps, 'icon' | 'text' | 'type'>
      }
  >
  // 表格工具栏右侧图标
  toolbarRight?: Array<
    | 'refresh'
    | 'layout'
    | 'export'
    | 'download'
    | 'search'
    | {
        name: string
        icon: string
        text?: string
        auth?: string
        attrs?: Omit<ButtonProps, 'icon' | 'text' | 'circle'>
      }
  >
  toolbarMiddle?: VNodeChild | Component // 表格工具栏中间内容
  columns: ColumnProps<I>[] // 列配置项  ==> 必传
  data?: I[] // 静态 table data 数据，若存在则不会使用 requestApi 返回的 data ==> 非必传
  requestApi: (_params: Q & Extra) => Promise<ResultPage<I>> // 请求表格数据的 api ==> 非必传
  requestAuto?: boolean // 是否自动执行请求 api ==> 非必传（默认为true）
  dataCallback?: (_data: I[]) => IObject[] // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
  title?: string // 表格标题 ==> 非必传
  pagination?: boolean // 是否需要分页组件 ==> 非必传（默认为true）
  initParam?: Partial<Q> // 初始化请求参数 ==> 非必传（默认为{}）
  border?: boolean // 是否带有纵向边框 ==> 非必传（默认为true）
  rowKey?: string // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
  searchCol?: number | Record<BreakPoint, number> // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
}

type DateComponent = 'date-picker' | 'time-picker' | 'time-select' | 'custom-tag' | 'input-tag'
type InputComponent = 'input' | 'select' | 'input-number' | 'cascader' | 'tree-select'
type OtherComponent = 'text' | 'radio' | 'checkbox' | 'switch' | 'icon-select' | 'custom'

export type IComponentType = DateComponent | InputComponent | OtherComponent

export type IFormItems<T = IComponentType> = Array<{
  // 组件类型(如input,select,radio,custom等)
  type?: T
  // 标签提示
  tips?: string | IObject
  // 标签文本
  label: string | (() => VNode)
  // 键名
  prop: string
  // 组件属性
  attrs?: IObject
  // 组件可选项(只适用于select,radio,checkbox组件)
  options?: Array<{ label: string; value: any; [key: string]: any }> | Ref<any[]>
  // 验证规则
  rules?: FormItemRule[]
  // 初始值
  initialValue?: any
  // 插槽名(适用于自定义组件，设置类型为custom)
  slotName?: string
  // 自定义渲染
  render?: (_scope: { row: IObject }) => VNode | string
  // 是否隐藏
  hidden?: boolean
  // layout组件Col属性
  col?: Partial<ColProps>
  // 组件事件
  events?: Record<string, (..._args: any) => void>
  // 初始化数据函数扩展
  initFn?: (_item: IObject) => void
}>

type IForm = Partial<Omit<FormProps, 'model' | 'rules'>>

export interface IModalConfig<T = any> {
  // 权限前缀(如sys:user，用于组成权限标识)，不提供则不进行权限校验
  permPrefix?: string
  // 标签冒号(默认：false)
  colon?: boolean
  // 主键名(主要用于编辑数据,默认为id)
  pk?: string
  // 组件类型(默认：dialog)
  component?: 'dialog' | 'drawer'
  // dialog组件属性
  dialog?: Partial<Omit<DialogProps, 'modelValue'>>
  // drawer组件属性
  drawer?: Partial<Omit<DrawerProps, 'modelValue'>>
  // form组件属性
  form?: IForm
  // 表单项
  formItems: IFormItems<IComponentType>
  // 提交之前处理
  beforeSubmit?: (_data: T) => void
  // 提交的网络请求函数(需返回promise)
  formAction?: (_data: T) => Promise<any>
}
