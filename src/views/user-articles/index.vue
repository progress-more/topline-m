<template>
  <div class="user-articles">
     <!-- 导航栏 -->
    <van-nav-bar
      title="我的收藏/历史/作品"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <!-- /导航栏 -->
    <!-- 三个标签列表根据需要设置一个或多个组件；
    这里使用三个组件：1.避免后期更改需求；2。需要判断，内容多的时候回比较麻烦 -->
    <van-tabs v-model="active">
      <van-tab title="我的收藏">
        <collect-article/>
      </van-tab>
      <van-tab title="我的历史">
        <history-article/>
      </van-tab>
      <van-tab title="我的作品">
        <user-article />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import UserArticle from './components/article'
import CollectArticle from './components/collect'
import HistoryArticle from './components/history'

export default {
  name: 'UserArticles',
  components: {
    UserArticle,
    CollectArticle,
    HistoryArticle
  },
  props: {
    type: {
      type: String
    }
  },
  data () {
    let active = ['collect', 'history'].indexOf(this.type)
    if (active === -1) {
      active = 2
    }
    return {
      active // 控制激活的标签选项
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang='less' scoped>
  .user-articles {
    padding-top: 50px;
     padding-bottom: 50px;
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
  }
</style>
