import { AxiosTransformer } from '../types'

export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns!.forEach(fn => {
    // 每次把上一次的 data 传给下一次的 fn，所以 fn 要 return data 不然会出问题
    data = fn(data, headers)
  })
  return data
}
