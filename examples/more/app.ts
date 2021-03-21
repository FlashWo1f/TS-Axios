import axios from '../../src/index'

document.cookie = 'a=b'


// withCredentials
// axios.get('/more/get').then(res => {
//   console.log(res)
// })

// axios.post('http://127.0.0.1:8088/more/server2', {}, {
//   withCredentials: true
// }).then(res => {
//   console.log(res)
// })

// xsrf 防御  在请求头中添加 cookie 中的 token, 让服务端去判断请求头中的 token 而不是 cookie 中的

const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

instance.get('/more/get').then(res => {
  console.log('/more/get', res)
})