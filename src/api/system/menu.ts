export interface MenuOptions {
  path: string
  name: string
  component?: string | (() => Promise<unknown>)
  redirect?: string
  meta: MetaProps
  children?: MenuOptions[]
}
export interface MetaProps {
  icon: string
  title: string
  customTitle?: string
  activeMenu?: string
  isLink?: string
  isHide: boolean
  isFull: boolean
  isAffix: boolean
  isKeepAlive: boolean
}
