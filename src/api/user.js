// 用户相关请求模块
import request from '@/utils/request'
// 登录注册
export const login = (data) => {
  return request({
    // 请求方法
    method: 'post',
    // 请求路径
    url: '/app/v1_0/authorizations',
    // 请求头
    // headers:{}
    // 查询参数
    // query
    // body 请求体参数
    data
  })
}
// 获取短信验证码
export const getSmsCode = mobile => {
  return request({
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: '/app/v1_0/user',
    method: 'GET'
  })
}

// 获取用户频道列表 或默认推荐频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
