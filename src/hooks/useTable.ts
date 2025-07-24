import { reactive, toRefs } from 'vue'
import { DEFAULT_PAGE_SIZE } from '@/constants/proTable'
export interface Pageable {
  pageNum: number
  pageSize: number
  total: number
}
export interface StateProps {
  tableData: any[]
  pageable: Pageable
  searchParam: IObject
  searchInitParam: IObject
  totalParam: IObject
  icon?: IObject
}

/**
 * @description table 页面操作方法封装
 * @param {Function} api 获取表格数据 api 方法 (非必传)
 * @param {Object} initParam 获取数据初始化参数 (非必传，默认为{})
 * @param {Boolean} isPageable 是否有分页 (非必传，默认为true)
 * @param {Function} dataCallBack 对后台返回的数据进行处理的方法 (非必传)
 * */
export const useTable = <
  RequestT,
  ResponseT extends { list: TableItem[]; total: number } | TableItem[],
  TableItem = any,
>(
  api?: (_params: RequestT) => Promise<ResponseT>,
  _initParam: object = {},
  isPageable: boolean = true,
  dataCallBack?: (_data: TableItem[]) => IObject[]
) => {
  const state = reactive<StateProps>({
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
  const getTableList = async (resetPageSize: boolean = false) => {
    if (!api) {
      return
    }
    try {
      // 先把初始化参数和分页参数放到总参数里面
      state.totalParam = { ...state.totalParam, ..._initParam, pageNum: 1 }
      if (resetPageSize) {
        state.pageable.pageSize = DEFAULT_PAGE_SIZE
      }
      // todo 这里不用 as RequestT，更优雅一些
      const data = await api({ ...state.searchInitParam, ...state.totalParam } as RequestT)
      const listData: TableItem[] = isPageable ? (data as { list: TableItem[] }).list : (data as TableItem[])
      state.pageable.total = isPageable ? (data as { total: number }).total : 0
      state.tableData = dataCallBack ? dataCallBack(listData) : (listData as TableItem[])
      // 解构后台返回的分页数据 (如果有分页更新分页信息)
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
    const nowSearchParam: StateProps['searchParam'] = {}
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
    getTableList()
  }

  /**
   * @description 表格数据重置
   * @return void
   * */
  const reset = () => {
    state.pageable.pageNum = 1
    // 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
    state.searchParam = { ...state.searchInitParam }
    updatedTotalParam()
    getTableList(true)
  }

  /**
   * @description 每页条数改变
   * @param {Number} val 当前条数
   * @return void
   * */
  const handleSizeChange = (val: number) => {
    state.pageable.pageNum = 1
    state.pageable.pageSize = val
    getTableList()
  }

  /**
   * @description 当前页改变
   * @param {Number} val 当前页
   * @return void
   * */
  const handleCurrentChange = (val: number) => {
    state.pageable.pageNum = val
    getTableList()
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
