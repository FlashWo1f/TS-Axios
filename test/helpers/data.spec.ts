import { transformRequest, transformResponse } from '../../src/helpers/data'

describe('helpers: data', () => {
  describe('transformRequest', () => {
    test('如果目标是 PlainObject, 那么处理为 string', () => {
      const a = { a: 1 }
      expect(transformRequest(a)).toBe('{"a":1}')
    })

    test('如果目标不是 PlainObject, 那么不做处理', () => {
      const target = new URLSearchParams('a=b')
      expect(transformRequest(target)).toBe(target)
    })
  })

  describe('transformResponse', () => {
    test('如果目标是 JSON string, 则用 JSON.parse 去处理', () => {
      const target = '{ "a": 1 }'
      expect(transformResponse(target)).toEqual({ a: 1 })
    })

    test('如果目标单纯的 string, 则不做处理', () => {
      const target = "{ 'a' : 1 }"
      expect(transformResponse(target)).toBe("{ 'a' : 1 }")
    })

    test('如果目标不是 string, 也不做处理', () => {
      const target = { a: 3 }
      expect(transformResponse(target)).toBe(target)
    })
  })
})
