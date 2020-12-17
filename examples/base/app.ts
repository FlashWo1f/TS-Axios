import axios from '../../src/index'


axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz'],
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    obj: {
      a: 1,
      b: {
        c: 3
      }
    },
  }
})

const a = new Date('2020-12-17 22:38')
console.log('8时区？',a)
axios({
  method: 'get',
  url: '/base/get',
  params: {
    date: a,
  }
})