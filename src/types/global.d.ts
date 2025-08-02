declare global {
  /* FileType */

  type ImageMimeType =
    | 'image/apng'
    | 'image/bmp'
    | 'image/gif'
    | 'image/jpeg'
    | 'image/pjpeg'
    | 'image/png'
    | 'image/svg+xml'
    | 'image/tiff'
    | 'image/webp'
    | 'image/x-icon'

  type ExcelMimeType = 'application/vnd.ms-excel' | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

  /* Vite */
  declare type Recordable<T = any> = Record<string, T>

  declare interface ViteEnv {
    VITE_USER_NODE_ENV: 'development' | 'production' | 'test'
    VITE_GLOB_APP_TITLE: string
    VITE_PORT: number
    VITE_OPEN: boolean
    VITE_REPORT: boolean
    VITE_ROUTER_MODE: 'hash' | 'history'
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'gzip,brotli' | 'none'
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
    VITE_DROP_CONSOLE: boolean
    VITE_PWA: boolean
    VITE_DEVTOOLS: boolean
    VITE_PUBLIC_PATH: string
    VITE_API_URL: string
    VITE_PROXY: [string, string][]
    VITE_CODE_INSPECTOR: boolean
    VITE_CDN: boolean
  }

  /* __APP_INFO__ */
  declare const __APP_INFO__: {
    pkg: {
      name: string
      version: string
      dependencies: Recordable<string>
      devDependencies: Recordable<string>
      engines: {
        node: string
      }
    }
    lastBuildTime: string
  }

  // https://cn.vitejs.dev/guide/env-and-mode

  // TypeScript 类型提示都为 string： https://github.com/vitejs/vite/issues/6930
  interface ImportMetaEnv {
    /** 应用端口 */
    VITE_APP_PORT: number
    /** API 基础路径(代理前缀) */
    VITE_APP_BASE_API: string
    /** API 地址 */
    VITE_APP_API_URL: string
    /** 是否开启 Mock 服务 */
    VITE_MOCK_DEV_SERVER: boolean
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }

  interface Result {
    code: string
    msg: string
  }

  // 请求响应参数（包含data）
  interface ResultData<T = any> extends Result {
    data: T
  }

  // 分页响应参数
  interface ResultPage<T> {
    list: T[]
    pageNum?: number
    pageSize?: number
    total: number
  }

  // 分页请求参数
  interface RequestPage {
    pageNum: number
    pageSize: number
  }

  interface SelectOption {
    value: string | number
    label: string
    [key: string]: any
  }

  type TreeLike<T, K extends string = 'children'> = T & { [P in K]: TreeLike<T, K>[] }

  type NullableString = string | null

  type IObject = Record<string, any>
}

export {}
