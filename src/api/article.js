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
