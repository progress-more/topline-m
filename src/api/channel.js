// 获取文章频道列表模块
import request from '@/utils/request'

export const getAllChannels = () => {
  return request({
    url: '/app/v1_0/channels'
  })
}
