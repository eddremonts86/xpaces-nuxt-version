export type IDictionary = {
  [key: string]: any
}

export type Dictionary<T> = {
  [key: string]: T
}

export interface MenuItems {
  title: string
  icon?: string
  href: string | undefined
}

export type UserMenuItems = Omit<MenuItems, 'href'> & {
  status: boolean
  type: string
  icon?: string
  action?: string
  to?: string
}

export type User = {
  id: string
  name: string
  email: string
  picture: string
  roles?: string[]
  permissions?: string[]
  given_name: string
  family_name: string
  nickname: string
  locale: string
  updated_at: string
  email_verified: boolean
  sub: string
}

export type Notifications = {
  title: string
  type: 'info' | 'error' | 'success' | 'warning'
  message: string
}

interface FormItemOptions {
  value: string
  label: string
  content?: string
  icon?: string
}
interface InputConfig {
  rows?: number
  rowHeight?: number
  autoGrow?: boolean
  clearable?: boolean
  prefix?: string
}

export type FormItem = {
  type: string
  name: string
  label: string
  placeholder?: string
  variant?: string
  required?: boolean
  disabled?: boolean
  options?: FormItemOptions[]
  defValue?: number | string | boolean
  hidden?: boolean
  config?: InputConfig
}

export type FileRejectReasonExt = {
  file: {
    name: string
  }
  errors: errors[]
}
type errors = {
  message: string
}
