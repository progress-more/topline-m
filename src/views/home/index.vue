<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" fixed/>
    <!-- 频道列表 -->
    <!-- tab组件 v-model=‘active’控制被激活的标签
    title 标签标题 -->
    <van-tabs v-model="active">
      <!-- 利用tab标签页的tabs上的插槽 定义面包按钮 点击显示弹出层 -->
        <van-icon
        name='wap-nav'
        class="wap-nav"
        slot="nav-right"
        @click="isChannelEditShow=true"
        />
      <van-tab
      :title="channel.name"
      v-for="channel in userChannels"
      :key="channel.id">

       <!-- 文章列表组件 -->
       <article-list :channel='channel'/>
      </van-tab>
    </van-tabs>

    <!-- 弹出层组件 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-edit :user-channels='userChannels'/>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
// 引入文章列表组件
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
export default {
  name: 'homePage',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      userChannels: [], // 接收用户频道列表
      isChannelEditShow: false // 频道编辑的显示状态
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

<style lang='less' scoped>
// 父组件的组用于默认只能影响到子组件的根节点
// 若要影响深 需用深度选择器 或不要作用域
  .home-container {
    padding-top: 90px;
    padding-bottom: 50px;
    /deep/ .van-tabs__wrap {
      position: fixed;
      top: 46px;
      left: 0;
      right: 0;
      z-index: 2;
      .wap-nav {
        position: fixed;
        right: 0;
        line-height: 44px;
        background-color: #fff;
      }
    }
  }
</style>
