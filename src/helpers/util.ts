const toString = Object.prototype.toString

// val is Date 类型保护
export function isDate(val: any): val is Date {
  return toString.call(val) === '[Object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

// 判断是否为普通对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

// 深拷贝 lodash 版本太复杂
export function deepMerge(...objs: any[]): any {
  if (!objs || !objs.length) {
    return
  }
  // console.log("...objs", objs)
  const result = Object.create(null)
  objs.forEach(v => {
    // debugger
    Object.keys(v).forEach(key => {
      const val = v[key]
      if (isPlainObject(val)) {
        if (isPlainObject(result[key])) {
          result[key] = deepMerge(result[key], val)
        } else {
          result[key] = deepMerge({}, val)
        }
      } else {
        result[key] = val
      }
    })
  })
  return result
}
