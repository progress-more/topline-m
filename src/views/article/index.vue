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
            <p class="time">{{article.pubdate}}</p>
          </div>
        </div>
        <van-button class="follow-btn" type="info" size="small" round>+ 关注</van-button>
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

    <!-- 底部区域 -->
    <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        class="comment-icon"
        name="comment-o"
        info="9"
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
  </div>
</template>

<script>
import {
  getArticleById,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike } from '@/api/article'
export default {
  name: 'ArticlePage',
  components: {},
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
      loading: true
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
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

  }
</style>
