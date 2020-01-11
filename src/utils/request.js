// 封装axios请求模块
// 将每一个请求都封装成一个个函数 在需要时加载调用即可

import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'

// axios.create()复制一个axios
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (error) {
    return {}
  }
}]

// 请求拦截器
request.interceptors.request.use(function (config) {
  // config 为请求配置对象 ，我们可以通过修改 config 来实现统一请求数据处理
  const { user } = store.state

  // 统一添加 token
  if (user) {
    // config.headers 获取操作请求头对象
    // Authorization 是后端要求的字段名称
    // 数据值后端要求提供： Bearer 空格 token数据
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 请求错误时 返回promise的reject（）函数 进入异步请求axios的catch中
  return Promise.reject(error)
})

// 响应拦截器

export default request
