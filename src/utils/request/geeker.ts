import { RequestHttp } from './base'
import { ResultEnum } from '@/enums/httpEnum'

const config = {
  // 默认地址请求地址，可在 .env.** 文件中修改
  baseURL: import.meta.env.VITE_API_URL_GEEKER,
  // 设置超时时间
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true,
}

export default new RequestHttp(config)
