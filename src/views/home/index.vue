<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar title="首页"/>
    <!-- 频道列表 -->
    <!-- tab组件 v-model=‘active’控制被激活的标签
    title 标签标题 -->
    <van-tabs v-model="active">
      <van-tab
      :title="item.name"
      v-for="item in userChannels"
      :key="item.id">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
          <van-cell
            v-for="item in list"
            :key="item"
            :title="item"
          />
        </van-list>
        </van-pull-refresh>
         <!-- 文章列表 -->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
export default {
  name: 'homePage',
  data () {
    return {
      active: 0,
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
      userChannels: [] // 接收用户频道列表
    }
  },
  methods: {
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 1000)
    },
    // 上拉加载更多调用onload
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
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
