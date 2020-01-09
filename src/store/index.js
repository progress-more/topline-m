// vuex容器
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 设置登录用户信息 对象 存储token信息
    user: null
  },
  mutations: {
    setUser (state, data) {
      state.user = data
    }
  },
  actions: {
  },
  modules: {
  }
})
