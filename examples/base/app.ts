import axios from '../../src/index'


// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz'],
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     obj: {
//       a: 1,
//       b: {
//         c: 3
//       }
//     },
//   }
// })

// const a = new Date('2020-12-17 22:38')
// console.log('8时区？',a)
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date: a,
//   }
// })

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2,
//   }
// })

// const arr = new Int32Array([21, 31])

// axios({
//   method: 'post',
//   url: '/base/buffer',
//   data: arr
// })

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(res.data, res)
})

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  },
  // 设置之后 response.data 是json类型 否则是 text
  responseType: 'json',
}).then(res => {
  console.log(res)
})

// axios({
//   method: 'post',
//   url: '/base/post',
//   headers: {
//     'content-type': 'application/json',
//     'Accept': 'application/json, text/plain, */*'
//   },
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// 浏览器自动解析 并且 自动配置合适的 Content-Type
// 下面的例子中 浏览器自动添加 `Content-Type: application/x-www-form-urlencoded;charset=UTF-8`
const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams
// })