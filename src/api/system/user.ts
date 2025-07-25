import http from '@/utils/request/geeker'
import { SERVER_ENDPOINTS } from '@/constants'

export interface ReqUserParams extends RequestPage {
  username: string
  gender: number
  idCard: string
  email: string
  address: string
  startTime: string
  endTime: string
  status: number
}
export interface ResUserList {
  id: string
  username: string
  gender: number
  user: { detail: { age: number } }
  idCard: string
  email: string
  address: string
  createTime: string
  status: number
  avatar: string
  photo: any[]
  children?: ResUserList[]
}
export interface ResStatus {
  userLabel: string
  userValue: number
}
export interface ResGender {
  genderLabel: string
  genderValue: number
}
export interface ResDepartment {
  id: string
  name: string
  children?: ResDepartment[]
}
export interface ResRole {
  id: string
  name: string
  children?: ResDepartment[]
}
/**
 * @name 用户管理模块
 */

export const UserAPI = {
  // 获取用户列表
  getUserList: (params: ReqUserParams) => {
    return http.post<ResultPage<ResUserList>>(SERVER_ENDPOINTS.geeker + `/user/list`, params)
  },

  // 获取树形用户列表
  getUserTreeList: (params: ReqUserParams) => {
    return http.post<ResultPage<ResUserList>>(SERVER_ENDPOINTS.geeker + `/user/tree/list`, params)
  },

  // 新增用户
  addUser: (params: { id: string }) => {
    return http.post(SERVER_ENDPOINTS.geeker + `/user/add`, params)
  },

  // 批量添加用户
  batchAddUser: (params: FormData) => {
    return http.post(SERVER_ENDPOINTS.geeker + `/user/import`, params)
  },

  // 编辑用户
  editUser: (params: { id: string }) => {
    return http.post(SERVER_ENDPOINTS.geeker + `/user/edit`, params)
  },

  // 删除用户
  deleteUser: (params: { id: string[] }) => {
    return http.post(SERVER_ENDPOINTS.geeker + `/user/delete`, params)
  },

  // 切换用户状态
  changeUserStatus: (params: { id: string; status: number }) => {
    return http.post(SERVER_ENDPOINTS.geeker + `/user/change`, params)
  },

  // 重置用户密码
  resetUserPassWord: (params: { id: string }) => {
    return http.post(SERVER_ENDPOINTS.geeker + `/user/rest_password`, params)
  },

  // 导出用户数据
  exportUserInfo: (params: ReqUserParams) => {
    return http.download(SERVER_ENDPOINTS.geeker + `/user/export`, params)
  },

  // 获取用户状态字典
  getUserStatus: () => {
    return http.get<ResStatus[]>(SERVER_ENDPOINTS.geeker + `/user/status`)
  },

  // 获取用户性别字典
  getUserGender: () => {
    return http.get<ResGender[]>(SERVER_ENDPOINTS.geeker + `/user/gender`)
  },

  // 获取用户部门列表
  getUserDepartment: () => {
    return http.get<ResDepartment[]>(SERVER_ENDPOINTS.geeker + `/user/department`, {}, { cancel: false })
  },

  // 获取用户角色字典
  getUserRole: () => {
    return http.get<ResRole[]>(SERVER_ENDPOINTS.geeker + `/user/role`)
  },
}
