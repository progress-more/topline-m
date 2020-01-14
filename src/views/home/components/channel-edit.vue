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
        v-for="channel in remainingChannels"
        :key="channel.id"
        :text="channel.name"
        @click='onAdd(channel)'
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
    // 点击添加频道
    onAdd (channel) {
      this.userChannels.push(channel)
    },
    // 加载所有频道
    async loadAllChannels () {
      const { data } = await getAllChannels()
      console.log(data)
      this.allChannels = data.data.channels
    }
  },
  computed: {
    // 要展示剩余频道 ，而且要根据我的频道的变化而变化，so计算属性
    remainingChannels () {
      const { allChannels, userChannels } = this
      // 剩余频道 = 所有频道- 我的频道
      const channels = []
      // 遍历所有频道
      allChannels.forEach(item => {
        // 如果我的频道中不包含当前被遍历的频道，则要放入新数组中
        // 用!userChannels.includes(item)或!userChannels.find(c=>c.id==item.id)
        if (!userChannels.find(c => c.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }
  },
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
