// 表单验证配置模块
import Vue from 'vue'
// 验证需要使用的验证组件
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'

// 加载内置的验证规则
import * as rules from 'vee-validate/dist/rules'

// 加载中文语言包
// // 官方文档：https://logaretm.github.io/vee-validate/guide/rules.html#importing-the-rules
import { messages } from 'vee-validate/dist/locale/zh_CN.json'

// 注册全局组件
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// 配置验证规则和中文提示信息
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule]
  })
})

// 添加自定义验证规则  extend

// 最简单的用法 示例
// extend('positive', value => {
//   return value >= 0
// })

extend('mobile', {
  validate: value => {
    return /^1(3|5|6|7|8|9)\d{9}$/.test(value)
  },
  message: '{_field_}格式错误'
})

extend('code', {
  validate: value => {
    return /^\d{6}$/.test(value)
  },
  message: '{_field_}格式错误'
})
