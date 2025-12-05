import { isArray } from '@/utils/is'
import type { FieldNamesProps } from '@/components/ProTable/interface'
import type { MenuOptions } from '@/api/system/menu'
import type { LocationQuery, RouteLocationNormalized } from 'vue-router'
import router from '@/routers'
import { HOME_URL, LOGIN_URL } from '@/config'

const mode = import.meta.env.VITE_ROUTER_MODE

/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @returns {String}
 */
export function localGet(key: string) {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(window.localStorage.getItem(key) as string)
  } catch (error) {
    return value
  }
}

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {*} value Storage值
 * @returns {void}
 */
export function localSet(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 * @returns {void}
 */
export function localRemove(key: string) {
  window.localStorage.removeItem(key)
}

/**
 * @description 清除所有localStorage
 * @returns {void}
 */
export function localClear() {
  window.localStorage.clear()
}

/**
 * @description 判断数据类型
 * @param {*} val 需要判断类型的数据
 * @returns {String}
 */
export function isType(val: any) {
  if (val === null) {
    return 'null'
  }
  if (typeof val !== 'object') {
    return typeof val
  } else {
    return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase()
  }
}

/**
 * 判断两个对象是否相同
 * @param {Object} a 要比较的对象一
 * @param {Object} b 要比较的对象二
 * @returns {Boolean} 相同返回 true，反之 false
 */
export function isObjectValueEqual(a: { [key: string]: any }, b: { [key: string]: any }) {
  if (!a || !b) {
    return false
  }
  const aProps = Object.getOwnPropertyNames(a)
  const bProps = Object.getOwnPropertyNames(b)
  if (aProps.length != bProps.length) {
    return false
  }
  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i]
    const propA = a[propName]
    const propB = b[propName]
    if (!b[propName]) {
      return false
    }
    if (propA instanceof Object) {
      if (!isObjectValueEqual(propA, propB)) {
        return false
      }
    } else if (propA !== propB) {
      return false
    }
  }
  return true
}

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @returns {Number}
 */
export function randomNum(min: number, max: number): number {
  return Math.floor(Math.random() * (min - max) + max)
}

/**
 * @description 获取当前时间对应的提示语
 * @returns {String}
 */
export function getTimeState() {
  const timeNow = new Date()
  const hours = timeNow.getHours()
  if (hours >= 6 && hours <= 10) {
    return `早上好 ⛅`
  }
  if (hours >= 10 && hours <= 14) {
    return `中午好 🌞`
  }
  if (hours >= 14 && hours <= 18) {
    return `下午好 🌞`
  }
  if (hours >= 18 && hours <= 24) {
    return `晚上好 🌛`
  }
  if (hours >= 0 && hours <= 6) {
    return `凌晨好 🌛`
  }
}

/**
 * @description 获取浏览器默认语言
 * @returns {String}
 */
export function getBrowserLang() {
  const browserLang = navigator.language ? navigator.language : navigator.browserLanguage
  let defaultBrowserLang = ''
  if (['cn', 'zh', 'zh-cn'].includes(browserLang.toLowerCase())) {
    defaultBrowserLang = 'zh'
  } else {
    defaultBrowserLang = 'en'
  }
  return defaultBrowserLang
}

/**
 * @description 获取不同路由模式所对应的 url + params
 * @returns {String}
 */
export function getUrlWithParams() {
  const url = {
    hash: location.hash.substring(1),
    history: location.pathname + location.search,
  }
  return url[mode]
}

/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 */
export function getFlatMenuList(menuList: MenuOptions[]): MenuOptions[] {
  const newMenuList: MenuOptions[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.flatMap(item => [item, ...(item.children ? getFlatMenuList(item.children) : [])])
}

/**
 * @description 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 isHide == true 的菜单)
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 * */
export function getShowMenuList(menuList: MenuOptions[]) {
  const newMenuList: MenuOptions[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.filter(item => {
    item.children?.length && (item.children = getShowMenuList(item.children))
    return !item.meta?.isHide
  })
}

/**
 * @description 使用递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Array} menuList 菜单列表
 * @param {Array} parent 父级菜单
 * @param {Object} result 处理后的结果
 * @returns {Object}
 */
export const getAllBreadcrumbList = (menuList: MenuOptions[], parent = [], result: { [key: string]: any } = {}) => {
  for (const item of menuList) {
    result[item.path] = [...parent, item]
    if (item.children) {
      getAllBreadcrumbList(item.children, result[item.path], result)
    }
  }
  return result
}

/**
 * @description 使用递归处理路由菜单 path，生成一维数组 (第一版本地路由鉴权会用到，该函数暂未使用)
 * @param {Array} menuList 所有菜单列表
 * @param {Array} menuPathArr 菜单地址的一维数组 ['**','**']
 * @returns {Array}
 */
export function getMenuListPath(menuList: MenuOptions[], menuPathArr: string[] = []): string[] {
  for (const item of menuList) {
    if (typeof item === 'object' && item.path) {
      menuPathArr.push(item.path)
    }
    if (item.children?.length) {
      getMenuListPath(item.children, menuPathArr)
    }
  }
  return menuPathArr
}

/**
 * @description 找出targetItem的所有父级，并返回包含targetItem本身的路径数组（targetItem作为最后一个元素）。
 * @param {Array} menu 菜单列表
 * @param {Object} targetItem 菜单对象
 * @returns {MenuOptions[]} 返回所有父级菜单项及targetItem本身组成的数组，targetItem为最后一个元素
 */
export function findParents(menu: MenuOptions[], targetItem: MenuOptions): MenuOptions[] {
  const recursiveFind = (
    menu: MenuOptions[],
    targetItem: MenuOptions,
    currentPath: MenuOptions[]
  ): MenuOptions[] | null => {
    for (const item of menu) {
      const newPath = [...currentPath, item]
      if (item.path === targetItem.path) {
        return newPath
      }
      if (item.children) {
        const found = recursiveFind(item.children, targetItem, newPath)
        if (found) {
          return found
        }
      }
    }
    return null
  }
  const result = recursiveFind(menu, targetItem, [])
  return result ?? []
}

/**
 * @description 递归查询当前 path 所对应的菜单对象 (该函数暂未使用)
 * @param {Array} menuList 菜单列表
 * @param {String} path 当前访问地址
 * @returns {Object | null}
 */
export function findMenuByPath(menuList: MenuOptions[], path: string): MenuOptions | null {
  for (const item of menuList) {
    if (item.path === path) {
      return item
    }
    if (item.children) {
      const res = findMenuByPath(item.children, path)
      if (res) {
        return res
      }
    }
  }
  return null
}

/**
 * @description 使用递归过滤需要缓存的菜单 name (该函数暂未使用)
 * @param {Array} menuList 所有菜单列表
 * @param {Array} keepAliveNameArr 缓存的菜单 name ['**','**']
 * @returns {Array}
 * */
export function getKeepAliveRouterName(menuList: MenuOptions[], keepAliveNameArr: string[] = []) {
  menuList.forEach(item => {
    item.meta.isKeepAlive && item.name && keepAliveNameArr.push(item.name)
    item.children?.length && getKeepAliveRouterName(item.children, keepAliveNameArr)
  })
  return keepAliveNameArr
}

/**
 * @description 格式化表格单元格默认值 (el-table-column)
 * @param {Number} row 行
 * @param {Number} col 列
 * @param {*} callValue 当前单元格值
 * @returns {String}
 * */
export function formatTableColumn(row: number, col: number, callValue: any) {
  // 如果当前值为数组，使用 / 拼接（根据需求自定义）
  if (isArray(callValue)) {
    return callValue.length ? callValue.join(' / ') : '--'
  }
  return callValue ?? '--'
}

/**
 * @description 处理 ProTable 值为数组 || 无数据
 * @param {*} callValue 需要处理的值
 * @returns {String}
 * */
export function formatValue(callValue: any) {
  // 如果当前值为数组，使用 / 拼接（根据需求自定义）
  if (isArray(callValue)) {
    return callValue.length ? callValue.join(' / ') : '--'
  }
  return callValue ?? '--'
}

/**
 * @description 处理 prop 为多级嵌套的情况，返回的数据 (列如: prop: user.name)
 * @param {Object} row 当前行数据
 * @param {String} prop 当前 prop
 * @returns {*}
 * */
export function handleRowAccordingToProp(row: { [key: string]: any }, prop: string) {
  if (!prop.includes('.')) {
    return row[prop] ?? '--'
  }
  prop.split('.').forEach(item => (row = row[item] ?? '--'))
  return row
}

/**
 * @description 处理 prop，当 prop 为多级嵌套时 ==> 返回最后一级 prop
 * @param {String} prop 当前 prop
 * @returns {String}
 * */
export function handleProp(prop: string) {
  const propArr = prop.split('.')
  if (propArr.length == 1) {
    return prop
  }
  return propArr[propArr.length - 1]
}

/**
 * @description 根据枚举列表查询当需要的数据（如果指定了 label 和 value 的 key值，会自动识别格式化）
 * @param {String} callValue 当前单元格值
 * @param {Array} enumData 字典列表
 * @param {Array} fieldNames label && value && children 的 key 值
 * @param {String} type 过滤类型（目前只有 tag）
 * @returns {String}
 * */
export function filterEnum(callValue: any, enumData?: any, fieldNames?: FieldNamesProps, type?: 'tag') {
  const value = fieldNames?.value ?? 'value'
  const label = fieldNames?.label ?? 'label'
  const children = fieldNames?.children ?? 'children'
  let filterData: { [key: string]: any } = {}
  // 判断 enumData 是否为数组
  if (Array.isArray(enumData)) {
    filterData = findItemNested(enumData, callValue, value, children)
  }
  // 判断是否输出的结果为 tag 类型
  if (type == 'tag') {
    return filterData?.tagType ? filterData.tagType : ''
  } else {
    return filterData ? filterData[label] : '--'
  }
}

/**
 * @description 递归查找 callValue 对应的 enum 值
 * */
export function findItemNested(enumData: any, callValue: any, value: string, children: string) {
  return enumData.reduce((accumulator: any, current: any) => {
    if (accumulator) {
      return accumulator
    }
    if (current[value] === callValue) {
      return current
    }
    if (current[children]) {
      return findItemNested(current[children], callValue, value, children)
    }
  }, null)
}

/**
 * 树形结构过滤器
 * @param tree 树形数据 (必须包含 children 数组)
 * @param fn 过滤条件函数
 * @param childKey 子树的key名称
 * @returns 过滤后的新树 (保持原始结构)
 */
export function treeFilter<T, K extends string = 'children'>(
  node: TreeLike<T, K>,
  fn: (_node: TreeLike<T, K>) => boolean,
  childKey: K = 'children' as K
): TreeLike<T, K> | null {
  // 递归处理子节点
  const children = node[childKey] ?? []
  const filteredChildren = children
    .map(child => treeFilter(child, fn, childKey))
    .filter((child): child is TreeLike<T, K> => child !== null)

  // 判断是否保留当前节点：自身符合条件或存在有效子节点
  const keepNode = fn(node) || filteredChildren.length > 0

  return keepNode ? { ...node, [childKey]: filteredChildren } : null
}

/**
 * 树形结构转换器
 * @param tree 树形数据 (必须包含 children 数组)
 * @param fn 过滤条件函数
 * @param childKey 子树的key名称
 * @returns 过滤后的新树
 */
export function treeMap<T, R, K extends string = 'children'>(
  tree: TreeLike<T, K>,
  mapFn: (_node: T) => R,
  childrenKey: K = 'children' as K
): TreeLike<R, K> {
  const newNode: any = { ...mapFn(tree) }
  if (tree[childrenKey] && Array.isArray(tree[childrenKey])) {
    newNode[childrenKey] = tree[childrenKey].map(child => treeMap(child, mapFn, childrenKey))
  } else {
    newNode[childrenKey] = []
  }
  return newNode as TreeLike<R, K>
}

// 使用Web Crypto API进行SHA-256加盐哈希，提高密码安全性。
// 请替换为自己项目的加密方法。如果确定使用这个方法加密通讯，也请替换盐值。
export async function encryptPassword(password: string) {
  const salt = 'geeker-admin-salt'
  const encoder = new TextEncoder()
  const data = encoder.encode(password + salt)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashedPassword = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashedPassword
}

// 给登出加上redirect，登录之后自动跳转到对应页面
export const logoutWithRedirect = (to: RouteLocationNormalized | string) => {
  let redirect = ''
  const redirectString = 'redirect'
  if (typeof to === 'string') {
    if (to.includes(`${LOGIN_URL}?${redirectString}`)) {
      redirect = decodeURIComponent(to.split(`${LOGIN_URL}?${redirectString}=`)[1])
    } else {
      redirect = to
    }
  } else {
    const params = new URLSearchParams(to.query as Record<string, string>)
    const queryString = params.toString()
    redirect = queryString ? `${to.path}?${queryString}` : to.path
  }
  return router.push(`${LOGIN_URL}?${redirectString}=${encodeURIComponent(redirect)}`)
}

/**
 * 解析 redirect 字符串 为 path 和  queryParams
 * @returns { path: string, queryParams: Record<string, string> } 解析后的 path 和 queryParams
 */
export const parseRedirect = (query: LocationQuery): { path: string; queryParams: Record<string, string> } => {
  const redirect = (query.redirect as string) ?? HOME_URL

  const url = new URL(redirect, window.location.origin)
  const path = url.pathname === LOGIN_URL ? HOME_URL : url.pathname
  const queryParams: Record<string, string> = {}

  url.searchParams.forEach((value, key) => {
    queryParams[key] = value
  })

  return { path, queryParams }
}

/**
 * 从一个排序的稀疏数组里找到第一个不存在的数字
 * @param array 正序排序的稀疏数组
 * @param from 开始查找的数字
 * @example findFirstMissingNumber([0, 1, 2, 3, 5], 0) // 4
 * @example findFirstMissingNumber([0, 1, 2, 3, 5], 4) // 6
 * @example findFirstMissingNumber([0, 1, 2, 3, 5], 8) // 9
 * @returns 第一个不存在的数字
 */
export function findFirstMissingNumber(array: number[], from: number) {
  let current = from
  for (let i = 0; i < array.length; i++) {
    if (array[i] > current) {
      return current
    } else if (array[i] === current) {
      current++
    }
  }
  return current
}
