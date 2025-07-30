import type { AxiosInstance, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/components/Loading/fullScreen'
import { LOGIN_URL } from '@/config'
import { ElMessage } from 'element-plus'
import { ResultEnum } from '@/enums/httpEnum'
import { useUserStore } from '@/stores/modules/user'
import router from '@/routers'
import { useLoadingStore } from '@/stores/modules/loading'
import { statusMessages } from '@/constants'
import qs from 'qs'

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean
  cancel?: boolean
}

// 声明一个 Map 用于存储每个请求的标识和取消函数
const pendingMap = new Map<string, AbortController>()

// 序列化参数，确保对象属性顺序一致
const sortedStringify = (obj: any) => {
  return qs.stringify(obj, { arrayFormat: 'repeat', sort: (a, b) => a.localeCompare(b) })
}

// 获取请求的唯一标识
export const getPendingUrl = (config: CustomAxiosRequestConfig) => {
  return [config.method, config.url, sortedStringify(config.data), sortedStringify(config.params)].join('&')
}

export class AxiosCanceler {
  /**
   * @description: 添加请求
   * @param {Object} config
   * @return void
   */
  addPending(config: CustomAxiosRequestConfig) {
    // 在请求开始前，对之前的请求做检查取消操作
    this.removePending(config)
    const url = getPendingUrl(config)
    const controller = new AbortController()
    config.signal = controller.signal
    pendingMap.set(url, controller)
  }

  /**
   * @description: 移除请求
   * @param {Object} config
   */
  removePending(config: CustomAxiosRequestConfig) {
    const url = getPendingUrl(config)
    // 如果在 pending 中存在当前请求标识，需要取消当前请求并删除条目
    const controller = pendingMap.get(url)
    if (controller) {
      controller.abort()
      pendingMap.delete(url)
    }
  }

  /**
   * @description: 清空所有pending
   */
  removeAllPending() {
    pendingMap.forEach(controller => {
      controller && controller.abort()
    })
    pendingMap.clear()
  }
}

const axiosCanceler = new AxiosCanceler()

export class RequestHttp {
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    // instantiation
    this.service = axios.create(config)

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的 token,存储到 vuex/pinia/本地储存当中
     */
    this.service.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        const userStore = useUserStore()
        const loadingStore = useLoadingStore()
        loadingStore.setLoading(true)
        // 重复请求不需要取消，在 api 服务中通过指定的第三个参数: { cancel: false } 来控制
        config.cancel ??= true
        config.cancel && axiosCanceler.addPending(config)
        // 当前请求不需要显示 loading，在 api 服务中通过指定的第三个参数: { loading: false } 来控制
        config.loading ??= true
        config.loading && showFullScreenLoading()
        if (config.headers && typeof config.headers.set === 'function') {
          config.headers.set('x-access-token', userStore.token)
        }
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse & { config: CustomAxiosRequestConfig }) => {
        const loadingStore = useLoadingStore()
        loadingStore.setLoading(false)
        // todo responseType is blob or arraybuffer
        const { data, config } = response
        const userStore = useUserStore()
        axiosCanceler.removePending(config)
        config.loading && tryHideFullScreenLoading()
        // 登录失效
        if (data.code == ResultEnum.OVERDUE) {
          userStore.setToken('')
          ElMessage.error(data.msg || data.message)
          return Promise.reject(router.replace(LOGIN_URL))
        }
        // 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          ElMessage.error(data.msg || data.message)
          return Promise.reject(data)
        }
        // 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
        return data.data
      },
      async (error: AxiosError) => {
        const loadingStore = useLoadingStore()
        loadingStore.setLoading(false)
        const { response } = error
        tryHideFullScreenLoading()
        // 请求超时 && 网络错误单独判断，没有 response
        if (error.message.indexOf('timeout') !== -1) {
          ElMessage.error('请求超时！请您稍后重试')
        }
        if (error.message.indexOf('Network Error') !== -1) {
          ElMessage.error('网络错误！请您稍后重试')
        }
        // 根据服务器响应的错误状态码，做不同的处理
        if (response) {
          const message = statusMessages[response.status] || '请求失败！'
          ElMessage.error(message)
        }
        // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) {
          return Promise.reject(router.replace('/500'))
        }
        return Promise.reject(error)
      }
    )
  }

  /**
   * @description 常用请求方法封装
   */
  get<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.get(url, { params, ..._object })
  }
  post<T>(url: string, params?: object | string, _object = {}): Promise<T> {
    return this.service.post(url, params, _object)
  }
  put<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.put(url, params, _object)
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<T> {
    return this.service.delete(url, { params, ..._object })
  }
  download(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ..._object, responseType: 'blob' })
  }
}
