<template>
  <div class="app">
    <h1>首页</h1>
    <!-- 根路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
h1{
  font-size: 20px;
}
</style>
