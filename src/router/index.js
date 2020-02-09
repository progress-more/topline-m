import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/views/login') },
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  { path: '/',
  // 不要给有默认子路由的父路由起名字
    component: () => import('@/views/tab-bar'),
    children: [
      { path: '', name: 'home', component: () => import('@/views/home') },
      { path: 'qa', name: 'qa', component: () => import('@/views/qa') },
      { path: 'video', name: 'video', component: () => import('@/views/video') },
      { path: 'my', name: 'my', component: () => import('@/views/my') }
    ]
  },
  { path: '/search', name: 'search', component: () => import('@/views/search') },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true
    // 将路由参数映射到组件的props数据中
    // 参考文档：https://router.vuejs.org/zh/guide/essentials/passing-props.html
  },
  { path: '/user/profile', name: 'user-profile', component: () => import('@/views/user-profile') },
  { path: '/my-article', name: 'my-article', component: () => import('@/views/user-articles') },
  { path: '/my-article/collect', name: 'my-collect', component: () => import('@/views/user-articles') },
  { path: '/my-article/history', name: 'my-history', component: () => import('@/views/user-articles') }
]

const router = new VueRouter({
  routes
})

export default router
