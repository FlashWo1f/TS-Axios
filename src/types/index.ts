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
  headers?: any
  // XMLHttpRequestResponseType TypeScript 自带 可 Ctrl+click 跳转查看
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}
export interface AxiosPromise extends Promise<AxiosResponse> {
  // Promise 泛型接口
}
