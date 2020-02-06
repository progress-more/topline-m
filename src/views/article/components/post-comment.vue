<template>
  <!-- 发布评论组件 -->
  <div class="post-comment">
    <van-field
    class="post-field"
        :value="value"
        @input="$emit('input', $event)"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        :placeholder="`回复${comment.aut_name}`"
        show-word-limit
    />
    <van-button
        size='small'
        type='primary'
        :disabled='!value'
        @click="$emit('click-post')"
    >发布</van-button>
  </div>
</template>

<script>
export default {
  name: 'postComment',
  props: {
    value: {
      type: String,
      required: true
    },
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      message: '' // 输入的评论回复内容
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
    .post-comment {
      display: flex;
      align-items: flex-end;
      padding: 10px;
      .post-field {
        background: #f5f7f9;
        margin-right: 15px;
      }
    }
</style>
