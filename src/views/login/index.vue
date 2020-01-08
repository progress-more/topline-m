<template>
  <div class="login-container">
      <!-- 导航栏 -->
      <van-nav-bar
      title="登录"
    />
    <!-- 表单域 -->
      <van-cell-group>
      <van-field
        left-icon='graphic'
        v-model="user.mobile"
        clearable
        label="手机号"
        placeholder="请输入手机号"
      />

      <van-field left-icon='lock' v-model="user.code" label="验证码" placeholder="请输入验证码">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="login-btn">
      <van-button @click='onLogin' type="info">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'loginPage',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    // 点击登录
    async onLogin () {
      // 轻提示是单例模式 同一时间只会存在一个toast
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        loadingType: 'spinner'
      })
      // 获取表单数据
      // 验证表单
      // 请求提交
      try {
        let res = await login(this.user)
        this.$toast.success('登录成功')
        console.log(res)
      } catch (error) {
        // console.log(error)
        this.$toast.fail('登录失败')
      }
      // 返回处理
    }
  }
}
</script>

<style lang='less' scoped>
  .login-container {
    .login-btn {
      padding: 20px;
      .van-button {
      width: 100%;
      border-radius: 5px;
      background-color: #6db4fb;
    }
    }

  }
</style>
