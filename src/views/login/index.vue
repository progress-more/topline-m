<template>
  <div class="login-container">
      <!-- 导航栏 -->
      <van-nav-bar
      title="登录"
    />
    <!-- vee-validate 验证插件使用：
    1.使用ValidationObserver 把需要校验的整个表单包起来
    2.使用ValidationProvider 把需要校验的及具体表单元素包起来
    3.通过 ValidationProvider 配置具体的校验规则
      name 配置验证字段的名称
      rules 验证规则
      rules="requried" 单个验证规则
      rules="required|length:4" 多个验证规则使用 | 分隔
      v-slot=‘{errors}’获取错误信息-->
    <!-- van-cell-group不是必须的 只是给cell提供上下外边框 -->
    <!-- 表单域 -->
      <ValidationObserver>
        <ValidationProvider name='手机号' rules='required' v-slot='{ errors }'>
          <van-field
            left-icon='graphic'
            v-model="user.mobile"
            clearable
            label="手机号"
            placeholder="请输入手机号"
          />
          <!-- errors[0]获取验证失败的错误信息 -->
          <span>{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider>
          <van-field left-icon='lock' v-model="user.code" label="验证码" placeholder="请输入验证码">

            <van-count-down
            @finish='isCountDownShow=false'
            v-if="isCountDownShow"
            format="ss 秒" slot="button"
            :time="1000*60" />
            <van-button
            @click='onSendSmsCode'
            slot="button"
            size="small"
            type="primary"
            round
            >发送验证码</van-button>
          </van-field>
        </ValidationProvider>
    </ValidationObserver>
    <div class="login-btn">
      <van-button @click='onLogin' type="info">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
export default {
  name: 'loginPage',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }, // 用户信息
      isCountDownShow: false // 倒计时是否显示
    }
  },
  methods: {
    // 发送验证码
    async onSendSmsCode () {
      // 获取手机号
      let { mobile } = this.user
      // 验证手机号
      try {
        // 倒计时显示
        this.isCountDownShow = true
        // 发送请求
        await getSmsCode(mobile)
        // 发送成功 倒计时隐藏 标签上已设置
      } catch (error) {
        // console.dir(error)
        // 发送失败 倒计时隐藏
        this.isCountDownShow = false
        if (error.response.status === 429) {
          this.$toast('请勿频繁发送')
          return
        }
        this.$toast('发送失败')
      }
    },
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
