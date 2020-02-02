// 文章评论模块

import request from '@/utils/request'

// 获取指定文章的评论列表
export const getComments = params => {
  return request({
    url: '/app/v1_0/comments',
    method: 'GET',
    params
  })
}
