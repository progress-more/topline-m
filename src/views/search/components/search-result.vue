<template>
   <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell
      v-for="(article,index) in list"
      :key="index"
      :title="article.title"
    />
  </van-list>
</template>

<script>
import { getSearch } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    q: {
      type: String,
      require: true
    }
  },
  components: {},
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20
    }
  },
  methods: {
    async onLoad () {
    //  1.请求获取数据
      const { data } = await getSearch({
        page: this.page, // 页码
        per_page: this.perPage, // 每页大小
        q: this.q // 搜索关键字
      })
      // 2.将数据加载到页面上
      const { results } = data.data
      console.log(results)
      this.list.push(...results)
      // 3.设置加载状态结束
      this.loading = false
      // 4.数据全部加载完成
      if (results.length) {
        this.page++ // 更新获取下一页数据的页码
      } else {
        this.finished = true // 没有数据了 将加载状态设置结束，不在onload
      }
    }
  }
}
</script>

<style>

</style>
