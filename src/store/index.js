// vuex容器
import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 设置登录用户信息 对象 存储token信息
    user: getItem('user')
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了防止刷新丢失 state中的user状态 ，我们把它放到本地存储
      setItem('user', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
