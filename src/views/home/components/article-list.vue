<template>
  <!-- 文章列表组件 -->
     <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <!-- 文章列表 -->
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
    </van-pull-refresh>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'articleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
      timestamp: null // 用于获取下一页数据的时间戳
    }
  },
  methods: {
    // 下拉刷新
    async onRefresh () {
      // 请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道id
        // 第一次使用 Date.now()获取最新数据
        // 下一页的数据使用本次返回的数据中的timestamp
        timestamp: Date.now(), // 时间戳 ，
        // 请求新的推荐数据传当前的时间戳 请求历史推荐传指定的时间戳
        with_top: 1
      })
      //   2.如果有最新数据 则把数据放到列表的顶部
      const { results } = data.data
      this.list.unshift(...results)
      //   3.关闭下拉刷新的loading状态
      this.isLoading = false
      // 4.提示更新成功
      this.$toast(`更新了${results.length}条数据`)
    },
    // 上拉加载更多调用onload
    async onLoad () {
      // 1.请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道id
        // 第一次使用 Date.now()获取最新数据
        // 下一页的数据使用本次返回的数据中的timestamp
        timestamp: this.timestamp || Date.now(), // 时间戳 ，
        // 请求新的推荐数据传当前的时间戳 请求历史推荐传指定的时间戳
        with_top: 1
      })// 是否包含置顶，进入页面第一次请求时要包含置顶文章，1包含 0 不包含
      //   2.把请求获取到的数据添加到数组列表中
      const results = data.data.results
      this.list.push(...results)
      // 3.加载状态结束
      this.loading = false
      // 4.数据全部加载完成
      if (results.length) {
        //   更新获取下一页数据的时间戳
        this.timestamp = data.data.pre_timestamp
      } else {
        //   没有数据了，把finished设置为true
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>
