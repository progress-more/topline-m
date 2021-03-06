// 文章接口模块
import request from '@/utils/request'

// 获取频道的文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

// 根据id获取指定文章详情
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

// 收藏文章
export const addCollect = articleId => {
  return request({
    method: 'POST',
    url: `/app/v1_0/article/collections`,
    data: {
      target: articleId
    }
  })
}

// 取消收藏文章
export const deleteCollect = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${articleId}`
  })
}

// 文章点赞
export const addLike = articleId => {
  return request({
    method: 'POST',
    url: `/app/v1_0/article/likings`,
    data: {
      target: articleId
    }
  })
}

// 取消文章点赞
export const deleteLike = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${articleId}`
  })
}

// 获取当前用户的文章列表
export const getCurrentUserArticles = params => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user/articles`,
    params
  })
}

// 获取用户的收藏列表
export const getCollectArticles = params => {
  return request({
    method: 'GET',
    url: `/app/v1_0/article/collections`,
    params
  })
}

// 获取用户的历史记录
export const getHistoryArticles = params => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user/histories`,
    params
  })
}
