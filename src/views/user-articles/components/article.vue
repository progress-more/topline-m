<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
  </van-list>
</template>

<script>
import { getCurrentUserArticles } from '@/api/article'

export default {
  name: 'UserArticle',
  components: {},
  props: {},
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 当前页码
      perPage: 10 // 每页大小
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    //   加载当前用户文章作品
    async onLoad () {
      // 发送请求
      const { data } = await getCurrentUserArticles({
        page: this.page,
        per_page: this.perPage
      })

      //   渲染页面
      const { results } = data.data
      this.list.push(...results)

      // 关闭loading
      this.loading = false
      // 判断是否还有数据
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>
