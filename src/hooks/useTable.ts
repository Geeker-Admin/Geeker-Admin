import { reactive, toRefs } from 'vue'
import { DEFAULT_PAGE_SIZE } from '@/constants/proTable'
import { ProTablePaginationEnum } from '@/enums'
import type { ComposerTranslation } from 'vue-i18n'

export interface Pageable {
  pageNum: number
  pageSize: number
  total: number
}
export interface StateProps<T> {
  tableData: (T & IObject)[]
  pageable: Pageable
  searchParam: IObject
  searchInitParam: IObject
  totalParam: IObject
  icon?: IObject
}

// 重载1
export function useTable<TableItem>(
  _api: (_params: IObject) => Promise<ResultPage<TableItem>> | Promise<TableItem[]>,
  _initParam: object,
  _pagination: ProTablePaginationEnum,
  _t: ComposerTranslation,
  _fePaginationFilterMethod?: (_query: IObject) => IObject[],
  _dataCallBack?: (_data: TableItem[]) => IObject[]
): any

export function useTable<TableItem>(
  api: (_params: IObject) => Promise<ResultPage<TableItem>> | Promise<TableItem[]>,
  initParam: object = {},
  pagination: ProTablePaginationEnum = ProTablePaginationEnum.BE,
  t: ComposerTranslation,
  fePaginationFilterMethod?: (_query: IObject) => IObject[],
  dataCallBack?: (_data: TableItem[]) => IObject[]
) {
  const state = reactive<StateProps<TableItem>>({
    // 表格数据
    tableData: [],
    // 分页数据
    pageable: {
      // 当前页数
      pageNum: 1,
      // 每页显示条数
      pageSize: DEFAULT_PAGE_SIZE,
      // 总条数
      total: 0,
    },
    // 查询参数(只包括查询)
    searchParam: {},
    // 初始化默认的查询参数
    searchInitParam: {},
    // 总参数(包含分页和查询参数)
    totalParam: {},
  })

  /**
   * @description 获取表格数据
   * @return void
   * */
  const getTableList = async () => {
    try {
      // 先把初始化参数和分页参数放到总参数里面
      Object.assign(
        state.totalParam,
        initParam,
        pagination !== ProTablePaginationEnum.NONE
          ? { pageNum: state.pageable.pageNum, pageSize: state.pageable.pageSize }
          : {}
      )

      const data = await api({ ...state.searchInitParam, ...state.totalParam })
      let listData: TableItem[] | IObject[] = []
      if (pagination === ProTablePaginationEnum.BE) {
        if (Array.isArray((data as ResultPage<TableItem>).list)) {
          listData = (data as ResultPage<TableItem>).list
        } else {
          throw new Error(t('error.tableDataShouldBeArray'))
        }
        state.pageable.total = (data as ResultPage<TableItem>).total
      } else {
        if (Array.isArray(data)) {
          listData = data
        } else {
          throw new Error(t('error.tableDataShouldBeArray'))
        }
      }

      if (pagination === ProTablePaginationEnum.FE) {
        if (!fePaginationFilterMethod) {
          throw new Error(t('error.fePaginationFilterMethodIsRequired'))
        }
        const { pageNum, pageSize, ...rest } = state.totalParam
        const queryKeys = Object.keys(rest)
        const filterData = queryKeys.length ? fePaginationFilterMethod(rest) : (data as TableItem[])
        listData = filterData.slice((pageNum - 1) * pageSize, pageNum * pageSize)
        state.pageable.total = queryKeys.length ? filterData.length : (data as TableItem[]).length
      }
      // @ts-expect-error 类型不兼容
      state.tableData = dataCallBack ? dataCallBack(listData) : listData
    } catch (error) {
      throw new Error(error as any)
    }
  }

  /**
   * @description 更新查询参数
   * @return void
   * */
  const updatedTotalParam = () => {
    state.totalParam = {}
    // 处理查询参数，可以给查询参数加自定义前缀操作
    const nowSearchParam: StateProps<TableItem>['searchParam'] = {}
    // 防止手动清空输入框携带参数（这里可以自定义查询参数前缀）
    for (const key in state.searchParam) {
      // 某些情况下参数为 false/0 也应该携带参数
      if (state.searchParam[key] || state.searchParam[key] === false || state.searchParam[key] === 0) {
        nowSearchParam[key] = state.searchParam[key]
      }
    }
    Object.assign(state.totalParam, nowSearchParam)
  }

  /**
   * @description 表格数据查询
   * @return void
   * */
  const search = () => {
    state.pageable.pageNum = 1
    updatedTotalParam()
    void getTableList()
  }

  /**
   * @description 表格数据重置
   * @return void
   * */
  const reset = () => {
    state.pageable.pageNum = 1
    // 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
    state.searchParam = { ...state.searchInitParam }
    state.pageable.pageSize = DEFAULT_PAGE_SIZE
    updatedTotalParam()
    void getTableList()
  }

  /**
   * @description 每页条数改变
   * @param {Number} val 当前条数
   * @return void
   * */
  const handleSizeChange = (val: number) => {
    state.pageable.pageNum = 1
    state.pageable.pageSize = val
    void getTableList()
  }

  /**
   * @description 当前页改变
   * @param {Number} val 当前页
   * @return void
   * */
  const handleCurrentChange = (val: number) => {
    state.pageable.pageNum = val
    void getTableList()
  }

  return {
    ...toRefs(state),
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange,
    updatedTotalParam,
  }
}
