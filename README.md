all in `https://www.tslang.cn/docs/handbook/`

## 相对之前不清楚的一些概念

### 类型断言
断言:  让编辑器相信自己，我比你更懂这个变量是什么类型

```ts

let someValue : any = 'this is a string'
// 尖括号语法
let strLength: number = (<string>someValue).length
// 下面这种比较友好 as 语法
let strLength1: number = (someValue as string).length
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig)
```

### type & interface 的区别
`https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types`

### 重载

天啦，typeScript 也有重载概念拉

```ts
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```


### 泛型

```ts
function identity<T>(arg: T): T {
  return arg
}
// 泛型接口
interface GenericIdentityFn {
  <T>(arg: T): T;
}

let myIdentity3: GenericIdentityFn = identity;
// 将类型定在声明时的泛型接口
interface GenericIdentityFn1<T> {
  (arg: T): T
}

let myIdentity4: GenericIdentityFn1<number> = identity

console.log(myIdentity4(3))
// 泛型类
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
// 类有两部分：静态部分和实例部分。 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

### 类型兼容性
很少用的不做记录
```ts
interface Named {
  name: string
}
class Person {
  name: string
}
let p: Named
// same structural typing
p = new Person()
```
如果 x 要兼容 y，那么 y 至少具有与 x 相同的属性。比如：
```ts
interface Named {
    name: string;
}

let x: Named;
// y 的推断类型为 { name: string; location: string; }
let y = { name: 'Alice', location: 'Seattle' };
x = y;
```

## 初始化项目

git clone https://github.com/alexjoverm/typescript-library-starter.git ts-axios
cd ts-axios

npm install

### 优秀工具集成
使用 TypeScript library starter 创建的项目集成了很多优秀的开源工具：

使用 RollupJS 帮助我们打包。
使用 Prettier 和 TSLint 帮助我们格式化代码以及保证代码风格一致性。
使用 TypeDoc 帮助我们自动生成文档并部署到 GitHub pages。
使用 Jest帮助我们做单元测试。
使用 Commitizen帮助我们生成规范化的提交注释。
使用 Semantic release帮助我们管理版本和发布。
使用 husky帮助我们更简单地使用 git hooks。
使用 Conventional changelog帮助我们通过代码提交信息自动生成 change log。

### tsconfig.json

详见 Typescript 官网 的介绍

### XMLHttpRequest !important

https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest

### 依赖

```json
"webpack": "^4.28.4",
"webpack-dev-middleware": "^3.5.0",
"webpack-hot-middleware": "^2.24.3",
"ts-loader": "^5.3.3",
"tslint-loader": "^3.5.4",
"express": "^4.16.4",
"body-parser": "^1.18.3"
```
webpack 是打包构建工具，webpack-dev-middleware 和 webpack-hot-middleware 是 2 个 express 的 webpack 中间件，ts-loader 和 tslint-loader 是 webpack 需要的 TypeScript 相关 loader，express 是 Node.js 的服务端框架，body-parser 是 express 的一个中间件，解析 body 数据用的

## 需求分析

### body

`https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send`
处理 body 为 isPlainObject 的情况

我们发现 `send` 方法的参数支持 `Document` 和 `BodyInit` 类型，`BodyInit` 包括了 `Blob`, `BufferSource`, `FormData`, `URLSearchParams`, `ReadableStream`、`USVString`，当没有数据的时候，我们还可以传入 `null`。

但是我们最常用的场景还是传一个普通对象给服务端，例如：

```typescript
axios({
  method: 'post',
  url: '/base/post',
  data: { 
    a: 1,
    b: 2 
  }
})
```

这个时候 `data`是不能直接传给 `send` 函数的，我们需要把它转换成 JSON 字符串。


### header
并且在当我们传入的 `data` 为普通对象的时候，`headers` 如果没有配置 `Content-Type` 属性，需要自动设置请求 `header` 的 `Content-Type` 字段为：`application/json;charset=utf-8`。
```json
{
  "content-type": "application/json;charset=utf-8"
}
```
## responseHeaders能在xhr.ts做处理，为什么data不也在xhr.ts中做处理呢？

黄奕老师：
`你可以理解 parseHeaders 也是为了构建响应数据对象 res，这部分是 xhr 函数处理的，xhr 函数的职责就是发送请求接收响应并构建响应对象，到这就结束了。而对res 的加工处理这部分逻辑需要摘出去，并且未来 axios 还要支持自定义响应对象的处理逻辑。`
但是我并不能很清晰地 get 到老师表达的意思...
我认为 parseHeaders 也可以算构建相应对象 res 之外的范畴 parseData 也可算在为了构建相应数据对象 res...

## 第六章 异常情况处理

## 第七章 扩展接口

混合对象实现思路很简单，首先这个对象是一个函数，其次这个对象要包括 Axios 类的所有原型属性和实例属性，我们首先来实现一个辅助函数 extend。
```ts
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
```

### 混合对象 创建实例

在 `createInstance` 工厂函数的内部，我们首先实例化了 Axios 实例 context，接着创建instance 指向 `Axios.prototype.request` 方法，并绑定了`上下文 context`；接着通过 extend 方法把 context 中的原型方法和实例方法全部`拷贝到 instance 上`，这样就实现了一个`混合对象`：`instance 本身是一个函数，又拥有了 Axios 类的所有原型和实例属性`，最终把这个 instance 返回。由于这里 TypeScript 不能正确推断 instance 的类型，我们把它断言成 AxiosInstance 类型。

这样我们就可以通过 createInstance 工厂函数创建了 axios，当直接调用 axios 方法就相当于执行了 Axios 类的 request 方法发送请求，当然我们也可以调用 `axios.get、axios.post` 等方法。

```ts
function createInstance(): AxiosInstance {
  const context = new Axios()
  // bind； 这边实现对象本身是方法 
  const instance = Axios.prototype.request.bind(context)
  // 且自身属性也是方法
  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()
```

### 文件位置改动

将核心的步骤文件放到了 /core 文件夹下..

### axios 函数重载

```ts
axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})
// 同
axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hello'
  }
})
```
`JavaScript 中没有真正意义上的函数重载。`

### 接口添加泛型参数

见 /examples/extend 的demo


## 拦截器管理类实现

整个过程是一个链式调用的方式，并且每个拦截器都可以支持同步和异步处理，我们自然而然地就联想到使用 Promise 链的方式来实现整个调用过程。

在这个 Promise 链的执行过程中，请求拦截器 resolve 函数处理的是 config 对象，而相应拦截器 resolve 函数处理的是 response 对象。

<img src="./img/interceptor.png" alt="interceptor">

拦截器 feature 实现中 interface<T> 很多，容易晕...

要理顺哪些接口是对内的哪些是对用户的

## flatten headers

经过合并后的配置中的 headers 是一个复杂对象，多了 common、post、get 等属性，而这些属性中的值才是我们要真正添加到请求 header 中的。

```js
{
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    },
    post: {
      'Content-Type':'application/x-www-form-urlencoded'
    }
  }
}
```

我们需要把它压成一级的，如下：

```js
headers: {
  Accept: 'application/json, text/plain, */*',
 'Content-Type':'application/x-www-form-urlencoded'
}
```



## 目前位置 项目的代码逻辑

`src/axios.ts` 中通过 `createInstance(defaults)` 创建一个带有默认 defaults 的 axios 实例
```js
function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  // 满足 axios({...}) 和 axios.request({...})
  extend(instance, context)

  return instance as AxiosInstance
}
```

当使用实例  axios.request() || axios() 时 执行 axios.request 方法。

```ts
// 合并 defaults && config  其中涉及到较多的数据合并处理  需要较强的模块化思想
config = mergeConfig(this.defaults, config)
const chain: PromiseChain<any>[] = [
  {
    resolved: dispatchRequest,
    rejected: undefined
  }
]
// 注册拦截器
this.interceptors.request.forEach(interceptor => {
  // 后加入的先执行
  chain.unshift(interceptor)
})
this.interceptors.response.forEach(interceptor => {
  chain.push(interceptor)
})
let promise = Promise.resolve(config)
// 调用拦截器
while (chain.length) {
  const { resolved, rejected } = chain.shift()!
  promise = promise.then(resolved, rejected)
}
```
dispatchRequest 发送请求
```ts
function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // 处理 config
  processConfig(config)
  return xhr(config).then(res => {
    // 处理响应 res
    return transformResponseData(res)
  })
}
```

## 实现取消 feature 后整体的代码走向。

### 创建 axios 实例
从方法 `createInstance` 函数体的第一行开始 debugger
```ts
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  debugger
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  // 满足 axios({...}) 和 axios.request({...})
  extend(instance, context)

  return instance as AxiosStatic
}
```
首先进入 `new Axios(config)` Axios 中 constructor() 传入默认的 config 初始化 `this.defaults && this.interceptors`
```ts
constructor(initConfig: AxiosRequestConfig) {
  this.defaults = initConfig
  this.interceptors = {
    request: new InterceptorManager<AxiosRequestConfig>(),
    response: new InterceptorManager<AxiosResponse>()
  }
}
```
`extend(instance, context)` 后，返回的 instance 就是一个带有 Axios 所有属性的一个方法了， 兼容 `axios({...}) 和 axios.request({...})`

下面的代码让 axios 从单例 => 多例
```ts
axios.create = function(config) {
  return createInstance(mergeConfig(defaults, config))
}
```
将类 `CancelToken` 、类 `Cancel`、方法 `isCancel` 挂载到 axios 方法对象上
```ts
axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel
```
### 来到 /examples/cancel/app.ts 发送请求
class CancelToken && function xhr 拦截操作 设计的较为巧妙(或许是我没见识), 可以学习学习
```ts
const CancelToken = axios.CancelToken
// 创建 CancelToken 实例 返回包含 实例 token 和 触发取消的 cancel 函数（promise）的 source 对象
const source = CancelToken.source()
```

正式进入发送请求
```ts
axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled', e.message)
  }
})
```
进入 Axios.prototype.request 中, `mergeConfig(this.defaults, config)`

merge 完成之后 进入 拦截器的收集和执行区域

```ts
// 初始化 chain 数组，唯一项为 dispatchRequest
const chain: PromiseChain<any>[] = [
  {
    resolved: dispatchRequest,
    rejected: undefined
  }
]
// 请求拦截器 插在 dispatchRequest 的前面
this.interceptors.request.forEach(interceptor => {
  // 后加入的先执行
  chain.unshift(interceptor)
})
// 响应拦截器 插在 dispatchRequest 的后面
this.interceptors.response.forEach(interceptor => {
  chain.push(interceptor)
})
// 将初始的 res = config 传给请求头。
let promise = Promise.resolve(config)
// 在 chain 逐一从头部开始执行
while (chain.length) {
  // const { resolved, rejected } = chain.shift() as PromiseChain<any> // 同下
  const { resolved, rejected } = chain.shift()!
  promise = promise.then(resolved, rejected)
}
```
来到 `function dispatchRequest` 验证接口的cancel有没有已经执行，如果有直接 throw reason
processConfig(config) && transformResponseData(res) 中有 transformRequest 以及 transformResponse 去操作 header, data 
下面就是一系列的 处理 AxiosRequestConfig 的操作 代码健壮性

```ts
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // 如果 有 cancel.reason 就直接不发送请求了
  throwIfCancellationRequested(config)
  // config 复杂数据类型 按值传递 => 按址传递
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}
```

来到 `function xhr`

xhr 方法返回用 Promise 包裹的 new XMLHttpRequest 实例去发送请求

其中

```ts
// send 前取消请求
if (cancelToken) {
  // 传入 message(reason)后就到这里了
  cancelToken.promise.then(reason => {
    request.abort()
    reject(reason)
  })
}

request.send(data)
```

发送完成后 res => 送给 transfromResponseData(res) 去做处理再传给 响应拦截器
那么 顺序是 请求拦截器 => transformRequest => transformResonse => 响应拦截器

具体 `transform 与拦截器的异同` 可以再看看代码以及对应的注释

最后 cancel/app.ts 中 source.cancel('Operation canceled by the user.')让 `function xhr` 中的下列代码得以执行  因为 source.cancel() 让 cancelToken.promise 的状态变为 resolved
```ts
if (cancelToken) {
  // 传入 message(reason)后就到这里了
  cancelToken.promise.then(reason => {
    request.abort()
    reject(reason)
  })
}
```
然后后面的 post 方法由于 source.token 已经被执行 所以在发送请求前的就被throwIfCancellationRequested() throw 了

所以post请求对应的 console.log 先被打印出来...

大致的过程就是如此，其中省略了大量的 header data config 的处理函数
每个方法都各司其职 在模块化方面还是很有体现的。  可以多多学习它的实现方式

## 请求和响应配置化
其实 dispatchRequest 本来也就是这个 Promise chain 中的一个环节，请求和响应配置化就是去丰富 dispatchRequest 的能力，你可以理解为是一个默认处理环节吧。
也将 dispatchRequest 中处理 headers 和 data 做了抽离和加强可维护性可扩展性
具体可以看 `core/transform.ts` `core/dispatchRequest.ts`
```ts
export interface AxiosRequestConfig {
  ...
  + transformRequest?: AxiosTransformer | AxiosTransformer[]
  + transformResponse?: AxiosTransformer | AxiosTransformer[]
  [propName: string]: any
}
```

## 取消功能的设计

`取消功能是我在这堂课开始之前对 axios 比较感兴趣的一个 feature 了，希望通过本次源码学习到其中的思想。`

## withCredentials

有些时候我们会发一些跨域请求，比如 http://domain-a.com 站点发送一个 http://api.domain-b.com/get 的请求，默认情况下，浏览器会根据同源策略限制这种跨域请求，但是可以通过 CORS 技术解决跨域问题。

在同域的情况下，我们发送请求会默认携带当前域下的 cookie，但是在跨域的情况下，默认是不会携带请求域下的 cookie 的，比如 http://domain-a.com 站点发送一个 http://api.domain-b.com/get 的请求，默认是不会携带 api.domain-b.com 域下的 cookie，如果我们想携带（很多情况下是需要的），只需要设置请求的 xhr 对象的 withCredentials 为 true 即可。

## xsrf 防御

最简单的CSRF
攻击用户Alice登录和访问某银行网站A，保留cookie。
Alice被某些信息诱导访问危险网站B。
危险网站B上有一个<img>标签：<img src="http://www.examplebank.com/account=Alice&amount=1000&payfor=Badman" >
这个标签的src不指向一张图片，而是一个http请求，这个请求向银行要求将Alice的1000元转给Badman，由于Alice的浏览器上有cookie，这样浏览器发出的这个请求就能得到响应执行。
这样Alice的钱就被偷了

### 关键

坏人并不能伪造 cookie， 他只是利用服务器对浏览器的信任 


因为CSRF攻击利用的是冲着浏览器分不清发起请求是不是真正的用户本人，所以防范的关键在于在请求中放入黑客所不能伪造的信息。从而防止黑客伪造一个完整的请求欺骗服务器。

## 问题

https://coding.imooc.com/learn/questiondetail/205383.html
