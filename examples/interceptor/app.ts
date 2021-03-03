import axios from '../../src/index'

axios.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})

axios.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})

axios.interceptors.response.use(res => {
  console.log('response1')
  res.data += '1'
  return res
})

const interceptor = axios.interceptors.response.use(res => {
  console.log('response2')
  res.data += '2'
  return res
})

axios.interceptors.response.use(res => {
  console.log('response3')
  res.data += '3'
  return res
})

axios.interceptors.response.eject(interceptor)

axios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: '',
  }
}).then(res => {
  console.log('axios.then', res.data)
})
