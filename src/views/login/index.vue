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
      <ValidationObserver ref="form">
        <ValidationProvider name='手机号' rules='required|mobile'>
          <van-field
            left-icon='graphic'
            v-model="user.mobile"
            clearable
            label="手机号"
            placeholder="请输入手机号"
          />
          <!-- errors[0]获取验证失败的错误信息
          移动端一般不再输入框下提示错误 基本是$toast-->
          <!-- <span>{{ errors[0] }}</span> -->
        </ValidationProvider>

        <ValidationProvider name='验证码' rules='required|code'>
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
import { validate } from 'vee-validate'
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
      // 参数：1.要验证的数据， 2.验证规则，3.一个可选的配置对象，例如配置错误消息字段名称name
      // 返回值：{valid，errors，...}
      //   valid:验证是否成功，成功true，失败false
      //  errors：数组，错误提示信息
      const validateRes = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })

      // 如果验证失败 ，提示错误信息 停止发送验证码
      if (!validateRes.valid) {
        this.$toast(validateRes.errors[0])
        return
      }
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
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证
      const success = await this.$refs.form.validate()
      // 如果验证失败 提示错误信息 停止表单提交
      if (!success) {
        // Vue调试工具中 输入ValidationObserver 可以看到这个组件实例的data数据对象
        // 里面有errors对象 放置的是错误信息 当触发验证时错误信息的数组便会有长度
        // 而我们要提示的信息 就是找到的第一个错误信息
        // 由于插件有一些问题 so需用定时器
        setTimeout(() => {
          const errors = this.$refs.form.errors
          // 将错误对象取出来
          // 将错误对象的值 提取出来形成新的数组
          // 若无错误则值为空即undefined
          // 若有错误 则为字符串 则返回该元素
          // 1. const item = Object.values(errors).find(item => {
          //   if (item) {
          //     return item[0]
          //   }
          // })
          // this.$toast(item[0])
          // 2. for (let key in errors) {
          //   const item = errors[key]
          //   if (item[0]) {
          //     this.$toast(item[0])
          //     return
          //   }
          // }
          const item = Object.values(errors).find(item => item[0])
          this.$toast(item[0])
        }, 100)
        this.$toast('验证失败')
        return
      }
      // 3.验证通过 提示请求中 轻提示是单例模式 同一时间只会存在一个toast
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        loadingType: 'spinner'
      })

      // 请求提交
      try {
        let res = await login(user)
        // 登录成功  将token存入Vuex容器中 并存入本地以保持持久化
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')
        // 如果有redirect 则跳转到来源页 没有就跳转到首页
        const redirect = this.$route.query.redirect || '/'
        this.$router.push(redirect)
        // console.log(res)
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
