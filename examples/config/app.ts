import axios from '../../src/index'
import { AxiosTransformer } from '../../src/types'
import qs from 'qs'

axios.defaults.headers.common['test2'] = 123
console.log('??', axios.defaults)
// axios({
//   url: '/config/post',
//   method: 'post',
//   data: qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test: '321'
//   }
// }).then((res) => {
//   console.log(res.data)
// })

axios({
  // 不能不返回值，不然就断了。而且函数顺序要注意
  transformRequest: [(function(data) {
    console.log('before first transformRequest', data)
    return qs.stringify(data)
    // return data
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }],
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})