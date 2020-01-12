<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar title="首页"/>
    <!-- 频道列表 -->
    <!-- tab组件 v-model=‘active’控制被激活的标签
    title 标签标题 -->
    <van-tabs v-model="active">
      <van-tab
      :title="channel.name"
      v-for="channel in userChannels"
      :key="channel.id">

       <!-- 文章列表组件 -->
       <article-list :channel='channel'/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
// 引入文章列表组件
import ArticleList from './components/article-list'
export default {
  name: 'homePage',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0,
      userChannels: [] // 接收用户频道列表
    }
  },
  methods: {
    // 获取用户频道列表
    async loadUserChannels () {
      const { data } = await getUserChannels()
      this.userChannels = data.data.channels
    }
  },
  created () {
    this.loadUserChannels()
  }
}
</script>

<style>

</style>
