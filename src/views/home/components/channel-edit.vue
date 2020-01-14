<template>
  <div class="channel-edit">
      <!-- 导航栏 -->
    <van-nav-bar title="编辑频道" fixed/>
    <!-- 我的频道 -->
    <van-cell title="我的频道" :border='false'>
        <van-button
        size='mini'
        type='danger'
        round
        plain
        @click='isEditShow = !isEditShow'>
        {{isEditShow ? '完成' : '编辑'}}
        </van-button>
    </van-cell>
    <van-grid :gutter='10'>
        <van-grid-item
        v-for="(channel,index) in userChannels"
        :key="channel.id"
        @click="onUserChannelClick(index)">
        <!-- active：CSS类名，value ===index 一个条件
        如果条件为true，则作用active类名，
        如果条件为false 则去除active类名 -->
        <span
        slot="text"
        class="text"
        :class="{active: value === index}"
        >{{channel.name}}</span>
          <van-icon
          v-show="isEditShow && index !== 0"
          slot="icon"
          class="close-icon"
          name="close" />
        </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道" :border='false'/>
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
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEditShow: false // 编辑的显示状态
    }
  },
  methods: {
    // 点击我的频道 删除 或切换
    onUserChannelClick (index) {
      if (this.isEditShow && index !== 0) {
        // 如果是编辑状态，则删除频道 iseditshow=true
        this.userChannels.splice(index, 1)
      } else {
        // 如果是完成状态，则切换频道 false
        this.$emit('input', index) // 修改激活的标签
        this.$emit('close') // 关闭弹层
      }
    },
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
  watch: {
    // 当userchannels 发生改变的时候 将该数据存储到本地存储
    userChannels () {
      setItem('user-channels', this.userChannels)
    }
  },
  created () {
    this.loadAllChannels()
  },
  mounted () {}
}
</script>

<style lang='less' scoped>
    .channel-edit {
        padding-top: 46px;
        ::v-deep.van-grid-item__content {
          position:relative;
          background-color: #f4f5f6;
          .van-grid-item__icon-wrapper {
            position: absolute;
            top: -10px;
            right: -5px;
            .close-icon {
              font-size: 16px;
            }
          }
        }
        .text {
          font-size: 14px;
          color: #222;
        }
        .active {
          color: red;
        }
    }
</style>
