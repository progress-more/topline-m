// 封装axios请求模块
// 将每一个请求都封装成一个个函数 在需要时加载调用即可

import axios from 'axios'

// axios.create()复制一个axios
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

export default request
