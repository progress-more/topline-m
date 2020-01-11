<template>
    <div class="home-container">
        <!--路由容器 -->
        <router-view></router-view>
        <!-- tab切换拦 -->
          <van-tabbar route>
          <van-tabbar-item to='/' icon="home-o">首页</van-tabbar-item>
          <van-tabbar-item to='/qa' icon="comment-o">问答</van-tabbar-item>
          <van-tabbar-item to='/video' icon="video-o">视频</van-tabbar-item>
          <van-tabbar-item to='/my' icon="user-o">{{$store.state.user ? '我的' : '未登录'}}</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
