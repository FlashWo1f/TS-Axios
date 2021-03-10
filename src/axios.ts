import Axios from './core/Axios'
import { AxiosStatic, AxiosRequestConfig } from './types'
import defaults from './defaults'
import { extend } from './helpers/util'
import mergeConfig from './core/mergeConfig'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  // 满足 axios({...}) 和 axios.request({...})
  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function(config) {
  return createInstance(mergeConfig(defaults, config))
}

export default axios
