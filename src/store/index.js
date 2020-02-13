// vuex容器
import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
import decodeJwt from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 设置登录用户信息 对象 存储token信息
    user: getItem('user'),
    cachePages: ['TabBar']
  },
  mutations: {
    setUser (state, data) {
      // 解析 JWT 中的数据 （需要使用用户id）
      if (data && data.token) {
        data.id = decodeJwt(data.token).user_id
      }
      state.user = data

      // 为了防止刷新丢失 state中的user状态 ，我们把它放到本地存储
      setItem('user', state.user)
    },

    // 添加缓存页面
    addCachePage (state, name) {
      if (!state.cachePages.includes(name)) {
        state.cachePages.push(name)
      }
    },
    // 移除缓存页面
    removeCachePage (state, name) {
      const index = state.cachePages.indexOf(name)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
