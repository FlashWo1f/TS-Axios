import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  // config 复杂数据类型 按值传递 => 按址传递
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // 合并 axios 内部对 data 和 headers 的默认处理  都在 transformRequest 了
  // 虽然这个功能能被拦截器代替，这也相当于 axios 内部给你做的默认的拦截器，只不过拦截器功能更加地灵活
  // 但是在 axios 内部，tranformRequest 相对之前的处理 data 和 headers 扩展性更好一些，单个模块负责的功能也更清晰一些
  // 这个请求和相应配置化算是丰富 dispatchRequest 的能力
  config.data = transform(config.data, config.headers, config.transformRequest)
  // debugger
  config.headers = flattenHeaders(config.headers, config.method!)
  console.log('axiosaxios', config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
