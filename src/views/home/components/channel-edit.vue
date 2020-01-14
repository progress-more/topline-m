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
        v-for="channel in userChannels"
        :key="channel.id"
        :text="channel.name"/>
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
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannels: []
    }
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      console.log(data)
      this.allChannels = data.data.channels
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {}
}
</script>

<style lang='less' scoped>
    .channel-edit {
        padding-top: 46px;
    }
</style>
