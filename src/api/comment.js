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

// 取消对评论或评论回复点赞
export const deleteCommentLike = target => {
  return request({
    url: `/app/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}

// 对评论或评论回复点赞
export const addCommentLike = target => {
  return request({
    url: '/app/v1_0/comment/likings',
    method: 'POST',
    data: { target }
  })
}
