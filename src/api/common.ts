import { SERVER_ENDPOINTS } from '@/constants'
import http from '@/utils/request/geeker'

export const CommonAPI = {
  downloadFile: (url: string) => http.get<Blob>(url, { responseType: 'blob' }),
  uploadImg: (params: FormData) => {
    return http.post<{ fileUrl: string }>(SERVER_ENDPOINTS.geeker + `/file/upload/img`, params, { cancel: false })
  },
  uploadVideo: (params: FormData) => {
    return http.post<{ fileUrl: string }>(SERVER_ENDPOINTS.geeker + `/file/upload/video`, params, { cancel: false })
  },
}
