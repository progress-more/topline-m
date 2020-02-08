// 由于vant组件库 需要按需引入 并注册需用组件 so内容较多
// 在main.js 中引入的话 不方便阅读和维护 所以建立一个独立的模块中
import Vue from 'vue'
import {
  Button,
  NavBar,
  CellGroup,
  Field,
  Toast,
  Icon,
  CountDown,
  Tabbar,
  TabbarItem,
  Grid,
  GridItem,
  Image,
  Cell,
  Dialog,
  Tab,
  Tabs,
  List,
  PullRefresh,
  Popup,
  Search,
  Loading,
  Divider,
  ImagePreview
} from 'vant'

Vue.use(Button)
  .use(NavBar)
  .use(Field)
  .use(CellGroup)
  .use(Toast)
  .use(Icon)
  .use(CountDown)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Grid)
  .use(GridItem)
  .use(Image)
  .use(Cell)
  .use(Dialog)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(PullRefresh)
  .use(Popup)
  .use(Search)
  .use(Loading)
  .use(Divider)
  .use(ImagePreview)
