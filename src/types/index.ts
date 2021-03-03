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
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  // XMLHttpRequestResponseType TypeScript 自带 可 Ctrl+click 跳转查看
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {
  // Promise 泛型接口
}

export interface AxiosError<T = any> extends Error {
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse<T>
  isAxiosError: boolean
}

export interface Axios {
  defaults: AxiosRequestConfig

  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }

  request<T = any>(url: any, config?: any): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

// 这样的话 自己本身是一个方法  也可以继承上面接口的一些方法 （混合类型结构）
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(url: any, config?: any): AxiosPromise<T>
}

// 拦截器
export interface AxiosInterceptorManager<T> {
  // 安装拦截器
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number
  // 卸载某个拦截器
  eject(id: number): void
}

// T => AxiosRequestConfig
export interface ResolvedFn<T> {
  // Promise<T> 主要是为了添加异步代码逻辑
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (err: any): any
}
