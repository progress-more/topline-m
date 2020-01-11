// 封装axios请求模块
// 将每一个请求都封装成一个个函数 在需要时加载调用即可

import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
import router from '@/router'

// axios.create()复制一个axios
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
// 处理后端返回数据中超出js 安全整数范围的问题
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
request.interceptors.response.use(
  // 响应成功进入第一个函数
  // 该函数的参数是响应对象
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  // 响应失败进入第二个函数 ，该函数的参数是错误对象
  async function (error) {
    // 如果响应码是401 则请求新的token
    // 响应拦截器中的 error 就是相应的错误对象
    if (error.response && error.response.status === 401) {
      // 校验是否有refresh_token
      const user = store.state.user
      if (!user || !user.refresh_token) {
        router.push('/login')
        // 代码不往后执行
        return
      }

      // 如果有refresh_token ，则请求获取新的token
      try {
        const res = await axios({
          method: 'PUT',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })

        // 如果获取成功 则把新的token更新到容器中
        // console.log('刷新token成功', res)
        store.commit('setUser', {
          token: res.data.data.token, // 最新获取的可用token
          refresh_token: user.refresh_token // 还是原来的refresh_token
        })

        // 把之前失败的用户请求继续发出去
        // config 是一个对象 其中包含本次失败请求相关的那些配置信息，
        // return 把request 的请求结果继续返回给发请求的具体位置
        return request(error.config)
      } catch (error) {
        // 如果获取失败，直接跳转登录页
        router.push('/login')
      }
    }
    return Promise.reject(error)
  }
)

export default request
