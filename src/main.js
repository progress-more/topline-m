import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './utils/register-vant'
import './styles/index.less'// 加载全局样式 要放在第三方样式之后
import 'amfe-flexible'
import './utils/validation' // 加载表单验证组件
import './utils/datetime'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
