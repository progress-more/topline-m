<template>
  <div class="article-container">
      <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      left-arrow
      fixed
      @click-left="$router.back()"
    ></van-nav-bar>

    <!-- 加载中 -->
    <van-loading
      v-if="loading"
      class="loading"
      color="#1989fa"
      vertical
    >
      <slot>加载中...</slot>
    </van-loading>

    <!-- 文章详情 -->
    <div class="detail" v-else-if="article.title">
      <h3 class="title">{{article.title}}</h3>
      <div class="author-wrap">
        <div class="base-info">
          <van-image
            class="avatar"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div class="text">
            <p class="name">{{article.aut_name}}</p>
            <p class="time">{{article.pubdate | relativeTime}}</p>
          </div>
        </div>
        <!-- 如果用户没有登录 或 当前文章作者不是当前登录用户
        则展示关注按钮 -->
        <van-button
        v-if="!$store.state.user || article.aut_id !== $store.state.user.id"
        class="follow-btn"
        :type="article.is_followed ? 'default' : 'info'"
        size="small"
        round
        :loading='isFollowLoading'
        @click="onFollow">{{article.is_followed ? '已关注' : '+ 关注'}}</van-button>
      </div>
      <div class="markdown-body" v-html="article.content"></div>
    </div>

    <!-- 加载失败提示 -->
     <div class="error" v-else>
      <img src="./no-network.png" alt="no-network">
      <p class="text">亲，网络不给力哦~</p>
      <van-button
        @click="loadArticle"
        class="btn"
        type="default"
        size="small"
      >点击重试</van-button>
    </div>
    <!-- 分隔线 -->
    <van-divider>正文结束</van-divider>

    <!-- 文章评论区域 -->
     <van-cell title="全部评论" :border="false" />
      <van-list
        v-model="articleComment.loading"
        :finished="articleComment.finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <comment-item
          v-for="(comment, index) in articleComment.list"
          :key="index"
          :comment="comment"
        />
        <!-- <van-cell
          v-for="(comment, index) in articleComment.list"
          :key="index"
          :title="comment.content"
        /> -->
      </van-list>

    <!-- 底部区域 -->
    <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
      >写评论</van-button>
      <van-icon
        class="comment-icon"
        name="comment-o"
        :info="articleComment.totalCount"
      />
      <van-icon
        @click="onCollect"
        color="orange"
        :name="article.is_collected ? 'star' : 'star-o'"
      />
      <!-- 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞 -->
      <van-icon
        @click="onLike"
        color="#e5645f"
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
      />
      <van-icon class="share-icon" name="share" />
    </div>

    <!-- 发布文章评论 -->
    <van-popup
      v-model="isPostShow"
      position='bottom'
    >
      <div class="post-comment">
        <van-field
          class="post-field"
          v-model="postMessage"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
        <van-button size="small" type="primary">发布</van-button>
      </div>

    </van-popup>
  </div>
</template>

<script>
import {
  getArticleById,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike } from '@/api/article'
import { addFollow, deleteFollow } from '@/api/user'
import CommentItem from './components/comment-item'
import { getComments } from '@/api/comment'

export default {
  name: 'ArticlePage',
  components: {
    CommentItem
  },
  props: {
    // 路由参数会映射到这里
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章详情
      loading: true,
      isFollowLoading: false, // 关注按钮的loading状态
      articleComment: {
        list: [],
        loading: false,
        finished: false,
        offset: null, // 请求下一页数据的页码
        totalCount: 0 // 总数据条数
      },
      isPostShow: false, // 发布评论弹层的显示
      postMessage: '' // 发布评论输入内容
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    // 加载文章评论
    async onLoad () {
      const articleComment = this.articleComment
      // 1.请求获取数据
      const { data } = await getComments({
        type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.articleId, // 源id，文章id或评论id
        offset: articleComment.offset, //  获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: 10 // 每页大小
      })
      // 2.将数据添加到列表中
      const { results } = data.data
      articleComment.list.push(...results)
      // 3.更新总数据条数
      articleComment.totalCount = data.data.total_count
      // 4.将加载更多的loading设置为false
      articleComment.loading = false
      // 5.判断是否还有数据
      if (results.length) {
        articleComment.offset = data.data.last_id
        // 更新获取下一页数据的页码
      } else {
        articleComment.finished = true
        // 没有数据了，关闭加载更多
      }
    },
    // 点击关注文章作者
    async onFollow () {
      // 开启按钮的loading状态
      this.isFollowLoading = true

      try {
        // 如果已关注 则取消关注
        const authorId = this.article.aut_id
        if (this.article.is_followed) {
          await deleteFollow(authorId)
        } else {
          // 否则添加关注
          await addFollow(authorId)
        }

        // 更新视图
        this.article.is_followed = !this.article.is_followed
      } catch (error) {
        this.$toast.fail('操作失败')
      }

      // 关闭按钮的loading状态
      this.isFollowLoading = false
    },
    // 点击点赞或是不点赞
    async onLike () {
      // 两个作用 1.交互提示 2.防止网络慢用户连续不断的点击按钮请求
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        // 若已点赞 取消点赞
        if (this.article.attitude === 1) {
          await deleteLike(this.articleId)
          this.article.attitude = -1
          this.$toast.success('取消点赞')
        } else {
          // 若未点赞 添加点赞
          await addLike(this.articleId)
          this.article.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },

    // 点击收藏或取消收藏文章
    async onCollect () {
      // 两个作用 1.交互提示 2.防止网络慢用户连续不断的点击按钮请求
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        // 判断 若已收藏 则取消收藏
        if (this.article.is_collected) {
          await deleteCollect(this.articleId)
          this.$toast.success('取消收藏')
        } else {
          // 若未收藏 则添加收藏
          await addCollect(this.articleId)
          this.$toast.success('收藏成功')
        }
        this.article.is_collected = !this.article.is_collected
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },
    //   打开页面获取文章详情
    async loadArticle () {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        this.article = data.data
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    }
    // 点击收藏文章
    // onCollect () {}
  }
}
</script>

<style lang='less' scoped>
@import "./github-markdown.css";
  .article-container {
    padding: 46px 20px 50px;
    background: #fff;
    .loading {
      padding-top: 100px;
      text-align: center;
    }
    .detail {
       .title {
         margin: 0;
         padding-top: 24px;
         font-size: 20px;
         color: #3A3A3A;
       }
        .author-wrap {
        padding: 20px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
            .base-info {
            display: flex;
            align-items: center;
                .avatar {
                  width: 35px;
                  height: 35px;
                  margin-right: 5px;
                }
                .text {
                    line-height: 1.5;
                    .name {
                    margin: 0;
                    font-size: 12px;
                    }
                    .time {
                    margin: 0;
                    font-size: 10px;
                    color: #999;
                    }
                }
            }
            .follow-btn {
              width: 85px;
            }
       }
    }
    .error {
        padding-top: 100px;
        text-align: center;
        .text {
          font-size: 15px;
        }
        .btn {
          width: 30%;
        }
    }
    .footer {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 44px;
      border-top: 1px solid #d8d8d8;
      background-color: #fff;
      .write-btn {
        width: 160px;
      }
      .van-icon {
        font-size: 20px;
      }
      .comment-icon {
        bottom: -2px;
      }
      .share-icon {
        bottom: -2px;
      }
    }

    .post-comment {
      display: flex;
      align-items: flex-end;
      padding: 10px;
      .post-field {
        background: #f5f7f9;
        margin-right: 15px;
      }
    }
  }
</style>
