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
    <!-- 让子组件双向绑定active
    在组件上使用v-model 默认传递一个名字叫value的数据给子组件 :value='active'
    默认监听名字叫 input的自定义事件： @input='active=事件参数'
    当子组件内部发布this.$emit('input',123)
    v-model 还是父子通信
    什么时候用？当你想要在子组件和父组件之间同步一些数据的时候，建议使用v-model，更简洁
    它的本质还是父子组建通信
    在一个组件上，v-model只能使用一次-->
      <channel-edit
      :user-channels='userChannels'
      v-model="active"
      @close = 'isChannelEditShow = false'/>
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
      active: 0, // 控制激活的标签
      userChannels: [], // 接收用户频道列表
      isChannelEditShow: false // 频道编辑组件的显示状态
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
