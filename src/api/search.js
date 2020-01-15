// 搜索接口模块
import request from '@/utils/request'

// 获取搜素联想建议
export const getSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
