<template>
  <div class="chat-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
      fixed
    />

    <!-- 消息列表 -->
    <div class="message-list" ref="message-list">
      <!-- :class="{ CSS类名:布尔值 }"
      true：作用类名
      false：不作用类名-->
      <div
        class="message-item"
        :class="{ reverse: item.isMe }"
        v-for="(item, index) in messages"
        :key="index"
      >
        <van-image
          class="avatar"
          slot="icon"
          round
          width="30"
          height="30"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="title">
          <span>{{ item.msg }}</span>
        </div>
      </div>
    </div>
    <!-- /消息列表 -->

    <!-- 发送消息 -->
    <van-cell-group class="send-message">
      <van-field v-model.trim="message" center clearable>
        <van-button
          slot="button"
          size="small"
          type="primary"
          @click="onSend"
        >发送</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发送消息 -->
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'UserChat',
  data () {
    return {
      message: '',
      socket: null, // 通信对象 代替测试的全局socket
      messages: [] // 消息列表
    }
  },
  created () {
    // 建立websocket连接
    // 这里的请求是websocket请求 和项目中的axios没有任何关系
    const socket = io('http://ttapi.research.itcast.cn')
    this.socket = socket

    socket.on('connect', function () {
      console.log('建立连接成功')
    })

    // 发送信息
    // socket.emit('消息类型', 消息内容)

    // 测试小技巧： 手动将数据成员暴露到全局， 就可以在控制台中直接访问了， 测试完毕，删除代码
    // window.socket = socket

    // 接收消息
    // socket.on('消息类型', data => console.log(data))
    socket.on('message', message => {
      // console.log('message => ', message)
      this.messages.push(message)
    })
  },

  methods: {
    // 点击发送信息
    onSend () {
      // 1.获取发送内容 若为空则返回
      const message = this.message
      if (!message.length) {
        return
      }

      // 2.不为空 socket触发message事件 传递发送的信息及时间戳
      const data = {
        msg: message,
        timestamp: Date.now(),
        isMe: true // 表示是我发的消息
      }
      this.socket.emit('message', data)

      // 将消息存储到列表中
      this.messages.push(data)

      // 3.清空文本框
      this.message = ''
    }
  }
}
</script>

<style scoped lang="less">
  .chat-container {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 46px 0 50px 0;
    top: 0;
    left: 0;
    box-sizing: border-box;
    background: #f5f5f6;
    .message-list {
      height: 100%;
      overflow-y: scroll;
      .message-item {
        display: flex;
        align-items: center;
        padding: 10px;
        .title {
          background: #fff;
          padding: 5px;
          border-radius: 6px;
        }
        .avatar {
          margin-right: 5px;
        }
      }
      .reverse {
        flex-direction: row-reverse;
        .title {
          margin-right: 5px;
        }
      }
    }
    .send-message {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #f5f5f6 !important;
    }
  }
</style>
