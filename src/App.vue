<template>
  <div class="app">
    <!-- 根路由出口 -->
    <!-- keep-alive是vue本身内置的一个组件，专门用来缓存组件的；
    默认缓存所有组件，也可以通过include和exclude来配置组件缓存；
    include可以配置哪些组件缓存；
    exclude配置哪些组件不缓存 -->
    <keep-alive :include="$store.state.cachePages">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      cachePages: ['TabBar']
    }
  }
}
</script>

<style>

</style>
