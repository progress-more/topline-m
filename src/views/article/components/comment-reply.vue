<template>
  <!-- 评论回复组件 -->
  <div class="comment-reply">
      <!-- 导航栏 -->
    <van-nav-bar
      class="reply-nav-bar"
      :title="`${currentComment.reply_count}条回复`"
    >
        <van-icon
         name="cross"
         slot="left"
         @click="$emit('click-close')"
        />
    </van-nav-bar>

    <!-- 当前评论项 -->
    <comment-item :comment='currentComment'/>

    <van-cell title="所有回复" />

    <!-- 评论的回复列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
     <comment-item
        v-for="(comment,index) in list"
        :key="index"
        :comment='comment'
     />
    </van-list>

    <!-- 底部 -->
    <div class="footer">
        <van-button
          class="write-btn"
          type='default'
          round
          size='small'
        >
            写评论
        </van-button>
        <van-icon
          color='#e5645f'
          name="good-job"
        />
    </div>
  </div>
</template>

<script>
import CommentItem from './comment-item'
import { getComments } from '@/api/comment'

export default {
  name: 'commentReply',
  props: {
    currentComment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 20
    }
  },
  components: {
    CommentItem
  },
  methods: {
    async onLoad () {
      // 1.请求获取数据
      const { data } = await getComments({
        type: 'c', // 评论类型 a-对文章的评论，c-对评论的回复
        source: this.currentComment.com_id.toString(), // 源id，文章id或评论id
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，
        // 不传表示从第一页开始读取数据
        limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数量
      })
      //   2.将数据添加到列表中
      const { results } = data.data
      this.list.push(...results)
      // 3.关闭loading
      this.loading = false
      // 4.判断数据是否加载完毕
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang='less' scoped>
    .comment-reply {
        padding-bottom: 44px;
        .reply-nav-bar {
            background-color: #fff;
            .van-icon, .van-nav-bar__title, .van-nav-bar__right {
                color: #333;
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
        }
    }
</style>
