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
})

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json;'
  },
  data: {
    a: 1,
    b: 2
  }
})

// 浏览器自动解析 并且 自动配置合适的 Content-Type
const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
})