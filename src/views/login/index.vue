<template>
  <div class="login-container">
      <!-- 导航栏 -->
      <van-nav-bar
      title="登录"
    />
    <!-- 表单域 -->
      <van-cell-group>
      <van-field
        required
        clearable
        label="手机号"
        placeholder="请输入手机号"
      />

      <van-field required label="验证码" placeholder="请输入验证码">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="login-btn">
      <van-button type="info">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loginPage'
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
