import axios from '../../src/index'


axios({
  method: 'get',
  // 错误 url => 404
  url: '/error/get1'
})
  .then(res => console.log(res))
  .catch(e => console.log(e))


axios({
  method: 'get',
  url: '/error/get'
})
  .then(res => console.log(res))
  .catch(e => console.log(e))

  // 模拟网络错误 => 刷新页面后 再在控制台的 Network 控制 offline 就可以看到 5000 就是给时间做这个手动操作的😁
setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  })
    .then(res => console.log(res))
    .catch(e => console.log(e))
}, 5000)
// 模拟超时
axios({
  method: 'get',
  url: '/error/get',
  timeout: 2000,
})
  .then(res => console.log(res))
  .catch(e => console.log(e, e.message))