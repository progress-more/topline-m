<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div v-if="$store.state.user" class="user-info-wrap">
      <div class="base-info-wrap">
        <div class="avatar-title-wrap">
          <van-image class="avatar" round fit='cover' :src='user.photo'/>
          <div class="title">{{user.name}}</div>
        </div>
        <van-button round size='mini' @click="$router.push('/user/profile')">编辑资料</van-button>
      </div>
      <van-grid class="data-info" :border="false">
        <van-grid-item>
          <span class="count">{{user.art_count}}</span>
          <span class="text">头条</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">{{user.follow_count}}</span>
          <span class="text">关注</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">{{user.fans_count}}</span>
          <span class="text">粉丝</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">{{user.like_count}}</span>
          <span class="text">获赞</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 未登录 -->
    <div v-else class="not-login"  @click="$router.push('/login')">
      <div class="mobile"></div>
      <div class="text">点击登录</div>
    </div>

    <!-- 其它 -->
    <van-grid clickable :column-num="3">
      <van-grid-item text="我的收藏" to='/my-article/collect'>
        <van-icon slot="icon" name="star-o" color="#eb5253" />
      </van-grid-item>
      <van-grid-item text="浏览历史" to='/my-article/history'>
        <van-icon slot="icon" name="browsing-history-o" color="#ffa023" />
      </van-grid-item>
      <van-grid-item text="作品" to='/my-article/myarticle'>
        <van-icon slot="icon" name="edit" color="#678eff" />
      </van-grid-item>
    </van-grid>

    <van-cell-group :border="false">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link @click="$router.push('/user/chat')"/>
    </van-cell-group>

<!-- 当用户登录时 即有token令牌时 才可以点击退出 -->
    <van-cell-group v-if="$store.state.user" @click="onLogout">
      <van-cell
        style="text-align: center;"
        title="退出登录"
        clickable
      />
    </van-cell-group>
    <!-- /其它 -->
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  data () {
    return {
      user: {} // 接收用户信息
    }
  },
  name: 'myPage',
  methods: {
    // 获取用户信息
    async loadUser () {
      try {
        let res = await getUserInfo()
        this.user = res.data.data
        console.log(res)
      } catch (error) {
        this.$toast('获取数据失败')
      }
    },
    // 退出登录
    onLogout () {
      // 点击确定信息
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗?'
      }).then(() => {
        // 清除登录状态
        this.$store.commit('setUser', null)
      }).catch(() => {
        // 取消的话提示
        // this.$toast('已取消退出')
      })
    }
  },
  created () {
    // 初始化的时候 如果用户登录的话 才请求获取当前用户信息
    if (this.$store.state.user) {
      this.loadUser()
    }
  }
}
</script>

<style lang='less' scoped>
  .my-container {
    .user-info-wrap {
      background: url('./banner.png') no-repeat;
      height: 182px;
      box-sizing: border-box;
      background-size: cover;
      padding: 40px 20px;
      font-size: 15px;
      color: fff;
      .base-info-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .avatar-title-wrap {
          display: flex;
          align-items: center;
          .avatar {
            margin-right: 15px;
            width: 66px;
            height: 66px;
            padding: 2px;
            background: #fff;
          }
        }
      }
      .data-info {
        ::v-deep .van-grid-item__content {
        background: none;
        }
      }
    }

     .not-login {
    background: url("./banner.png") no-repeat;
    height: 182px;
    box-sizing: border-box;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .mobile {
      background: url("./mobile.png") no-repeat;
      background-size: cover;
      width: 66px;
      height: 66px;
      margin-bottom: 10px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }
  > .van-cell-group {
    margin-top: 10px;
  }
  }
</style>
