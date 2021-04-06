import axios, { AxiosResponse, AxiosError } from '../src/index'
import { getAjaxRequest } from './helper'

describe('requests', () => {
  // 每个测试用例运行前的钩子函数
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should treat single string arg as url', () => {
    // 异步测试
    // Jest 非常好地支持异步测试代码。通常有 2 种解决方案。
    // 1. 利用 done 参数，每个测试用例函数有一个 done 参数，一旦我们使用了该参数，只有当 done 函数执行的时候表示这个测试用例结束。
    // 2. 测试函数返回一个 Promise 对象，一旦这个 Promise 对象 resolve 了，表示这个测试结束。
    // 下面就是第二种解决方案了

    axios('/foo')

    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('GET')
    })
  })

  test('should treat method value as lowercase string', () => {
    axios({
      url: '/foo',
      method: 'POST'
    }).then(res => {
      expect(res.config.method).toBe('post')
    })

    return getAjaxRequest().then(req => {
      req.respondWith({
        status: 200
      })
    })
  })

  test('should reject on network errors', done => {
    const resolveSpy = jest.fn((res: AxiosResponse) => {
      return res
    })

    const rejectSpy = jest.fn((e: AxiosError) => {
      return e
    })

    jasmine.Ajax.uninstall()

    axios('/foo')
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next)

    function next(reason: AxiosResponse | AxiosError) {
      expect(resolveSpy).not.toHaveBeenCalled()
      expect(rejectSpy).toHaveBeenCalled()
      expect(reason instanceof Error).toBeTruthy()
      expect((reason as AxiosError).message).toBe('Network Error')
      expect(reason.request).toEqual(expect.any(XMLHttpRequest))

      jasmine.Ajax.install()

      done()
    }
  })
})
