import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig): void {
  // config 复杂数据类型 按值传递 => 按址传递
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // 要先处理headers 因为下面 config.data 那边已经改掉了 data
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformRequestData(config: AxiosRequestConfig): void {
  return transformRequest(config.data)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformHeaders(config: AxiosRequestConfig): any {
  // headers 默认值 {} 保证，isPlainObject(data) => headers['Content-Type'] = 'application/json;charset=utf-8'
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
