<template>
  <!-- 评论回复组件 -->
  <div class="comment-reply">
      <!-- 导航栏 -->
    <van-nav-bar
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

    <!-- 评论回复列表 -->

    <!-- 底部 -->
  </div>
</template>

<script>
import CommentItem from './comment-item'

export default {
  name: 'commentReply',
  props: {
    currentComment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  components: {
    CommentItem
  },
  methods: {}
}
</script>

<style lang='less' scoped>
    .comment-reply {
        .van-nav-bar {
            color: #000;
            background-color: #fff;
        //   .van-icon-cross:before {
        //     color: #fff;
        //   }
        }
    }
</style>
