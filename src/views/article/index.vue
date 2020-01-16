<template>
  <div class="article-container">文章详情页</div>
</template>

<script>
export default {
  name: 'ArticlePage',
  components: {},
  props: {
    // 路由参数会映射到这里
    articleId: {
      type: [Object, Number, String],
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style>

</style>
