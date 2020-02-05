<template>
<!-- 评论项列表 -->
  <van-cell class="comment-item">
    <!-- 评论作者头像 -->
    <van-image
      slot="icon"
      class="avatar"
      round
      :src="comment.aut_photo"
    />

     <!-- 评论作者名字 -->
    <span style="color: #466b9d;" slot="title">{{ comment.aut_name }}</span>
    <!-- 评论作者名字 -->

     <div slot="label">
      <!-- 评论内容 -->
      <p style="color: #363636;">{{ comment.content }}</p>
      <!-- /评论内容 -->

      <p>
        <!-- 评论发布日期 -->
        <span style="margin-right: 10px;">{{ comment.pubdate }}</span>
        <!-- 评论发布日期 -->

        <van-button
          size="mini"
          type="default"
          @click="$emit('click-reply',comment)"
        >回复 {{ comment.reply_count }}</van-button>
      </p>
    </div>
    <div slot="right-icon" class="like-container">
      <van-icon
        @click="onLike"
        :color="comment.is_liking ? '#e5645f' : ''"
        :name="comment.is_liking ? 'good-job' : 'good-job-o'"
      />
      <span>{{ comment.is_liking ? comment.like_count : '赞' }}</span>
    </div>
  </van-cell>
</template>

<script>
import { deleteCommentLike, addCommentLike } from '@/api/comment'

export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },

  methods: {
    // 评论项点赞或取消点赞
    async onLike () {
      // 两个作用 1.交互提示 2.防止网络慢用户连续不断的点击按钮请求
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        // 若已点赞 取消点赞
        if (this.comment.is_liking) {
          await deleteCommentLike(this.comment.com_id.toString())
          // 最新的点赞数量减1
          this.comment.like_count--
          this.$toast.success('取消点赞')
        } else {
          // 若未点赞 添加点赞
          await addCommentLike(this.comment.com_id.toString())
          // 最新的点赞数量增加1
          this.comment.like_count++
          this.$toast.success('点赞成功')
        }
        this.comment.is_liking = !this.comment.is_liking
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
  .comment-item {
  display: flex;
  align-items: flex-start;
  .avatar {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .like-container {
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
  }
}
</style>
