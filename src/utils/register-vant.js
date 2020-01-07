// 由于vant组件库 需要按需引入 并注册需用组件 so内容较多
// 在main.js 中引入的话 不方便阅读和维护 所以建立一个独立的模块中
import Vue from 'vue'
import { Button,
  NavBar,
  CellGroup,
  Field
} from 'vant'

Vue.use(Button)
  .use(NavBar)
  .use(Field)
  .use(CellGroup)
