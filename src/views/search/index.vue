<template>
  <div class="search-container">
      <!-- 搜索栏 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus='isResultShow = false'
        @input='onSearchInput'
      />
    </form>

     <!-- 搜索结果 -->
    <search-result :q='searchText' v-if="isResultShow"/>

    <!-- 联想建议 -->
     <van-cell-group v-else-if = "searchText">
      <van-cell
      icon="search"
      v-for="(item, index) in suggestions"
      :key="index"
      @click = 'onSearch(item)'
      >
      <!-- 我们要把item处理成带有高亮的字符串
      过滤器：专门用于文本格式化，但是他只能用在{{}}和v-bind中 -->
        <div slot="title" v-html="highlight(item,searchText)"></div>
      </van-cell>
    </van-cell-group>

    <!-- 历史记录 -->
     <van-cell-group v-else>
      <van-cell title="历史记录">
        <template v-if="isDeleteShow">
          <span @click="searchHistories = []">全部删除</span>
            &nbsp;&nbsp;
          <span @click="isDeleteShow = false">完成</span>
        </template>
        <van-icon v-else @click="isDeleteShow = true" name="delete"></van-icon>
      </van-cell>
      <van-cell
      :title="item"
      v-for="(item,index) in searchHistories"
      :key='index'
      @click='onSearch(item)'>
        <van-icon
        v-show="isDeleteShow"
        @click="searchHistories.splice(index,1)"
        name="close"></van-icon>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
import SearchResult from './components/search-result'
import { getItem, setItem } from '@/utils/storage'
import { debounce } from 'lodash'

export default {
  name: 'SearchPage',
  components: {
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '', // 输入搜索内容
      isResultShow: false,
      suggestions: [], // 接收联想建议列表
      searchHistories: getItem('search-histories') || [], // 搜索历史记录
      isDeleteShow: false // 删除的显示状态
    }
  },
  methods: {
    // 搜索关键字高亮处理
    highlight (str, keyword) {
      // 如果想要动态的创建一个正则表达式，使用new RegExp手动构造
      // 它会根据 字符串来创建一个正则表达式对象
      // 参数2：用来指定匹配模式，列如g 全局i忽略大小写
      const reg = new RegExp(keyword, 'ig')
      return str.replace(reg, `<span style='color:red'>${keyword}</span>`)
    },

    // 发生值改变事件时 获取联想建议
    // 加入函数防抖
    onSearchInput: debounce(async function () {
      if (!this.searchText) {
        return
      }
      let { data } = await getSuggestions(this.searchText)
      this.suggestions = data.data.options
    }, 500),
    //   确定搜索时获取搜索结果
    // 与点击联想建议跟历史记录 同用一个方法
    onSearch (q) {
      // 更新搜索内容 结果列表显示新内容
      this.searchText = q

      // 记录搜索历史记录
      const index = this.searchHistories.indexOf(this.searchText)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(this.searchText)

      // 确定搜索 搜索结果组件显示
      // 将搜索关键字传给搜索结果组件 并获取搜索结果列表
      this.isResultShow = true
    }
  },
  computed: {},
  watch: {
    // 只要一搜索 搜索历史就会变化 视图也要跟着变化 而且要存储到本地进行持久化
    // so需要监听历史数据 一旦变化 就保存到本地 以便一直都有
    //  然后在组件数据中 进行获取本地数据 这样无论何时获取到的数据都是最新的
    searchHistories (newVal) {
      setItem('search-histories', newVal)
    }
  },
  created () {},
  mounted () {}
}
</script>

<style lang='less' scoped>
    .search-container {
        padding-top: 54px;
        .search-form {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1;
        }
    }
</style>
