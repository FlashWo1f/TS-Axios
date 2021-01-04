import { isPlainObject } from './util'

// 对 请求的数据进行处理，data 默认能接受 blob ArrayBuffer 等类型 所以这边只对 JSON 做处理
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
