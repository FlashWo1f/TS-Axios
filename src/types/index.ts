export type Method =
  | 'get'
  | 'GET'
  | 'head'
  | 'HEAD'
  | 'delete'
  | 'DELETE'
  | 'OPTIONS'
  | 'options'
  | 'PUT'
  | 'put'
  | 'patch'
  | 'PATCH'
  | 'post'
  | 'POST'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
}
