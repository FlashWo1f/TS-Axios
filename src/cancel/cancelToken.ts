import { Canceler, CancelExecutor, CancelTokenSource } from '../types'

interface ResolvePromise {
  (reason?: string): void
}

export default class CancelToken {
  promise: Promise<string>
  reason?: string

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<string>((resolve: any) => {
      // resolvePromise 是 resolve 的引用 这种写法可以学习一下
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = message
      // 这里相当于把 this.promise 从 pending => resolved
      resolvePromise(this.reason)
    })
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}
