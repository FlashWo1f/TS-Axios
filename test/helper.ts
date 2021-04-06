/**
 * jasmine.Ajax.requests.mostRecent() 拿到最近一次请求的 request 对象，
 * 这个 request 对象是 jasmine-ajax 库伪造的 xhr 对象，
 * 它模拟了 xhr 对象上的方法，并且提供一些 api 让我们使用，
 * @returns 比如 request.respondWith 方法返回一个响应。
 */

export function getAjaxRequest(): Promise<JasmineAjaxRequest> {
  return new Promise(function(resolve) {
    setTimeout(() => {
      return resolve(jasmine.Ajax.requests.mostRecent())
    }, 0)
  })
}
