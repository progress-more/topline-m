<template>
  <div class="channel-edit">
      <!-- 导航栏 -->
    <van-nav-bar title="编辑频道" fixed/>
    <!-- 我的频道 -->
    <van-cell title="我的频道">
        <van-button
        size='mini'
        type='danger'
        round>编辑</van-button>
    </van-cell>
    <van-grid :gutter='10'>
        <van-grid-item
        v-for="value in 8"
        :key="value"
        text="文字"/>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道"/>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="value in 8"
        :key="value"
        text="文字"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'ChannelEdit',
  components: {},
  props: {},
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  created () {},
  mounted () {}
}
</script>

<style lang='less' scoped>
    .channel-edit {
        padding-top: 46px;
    }
</style>
