<template>
  <div class="search-container">
      <!-- 搜索栏 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="$router.back()"
        @focus='isResultShow = false'
        @input='onSearchInput'
      />
    </form>

     <!-- 搜索结果 -->
    <search-result v-if="isResultShow"/>

    <!-- 联想建议 -->
     <van-cell-group v-else-if = "searchText">
      <van-cell
      icon="search"
      v-for="(item, index) in suggestions"
      :key="index"
      >
      <!-- 我们要把item处理成带有高亮的字符串
      过滤器：专门用于文本格式化，但是他只能用在{{}}和v-bind中 -->
        <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
    </van-cell-group>

    <!-- 历史记录 -->
     <van-cell-group v-else>
      <van-cell title="历史记录">
        <van-icon name="delete"></van-icon>
        <span>全部删除</span>
        &nbsp;&nbsp;
        <span>完成</span>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
import SearchResult from './components/search-result'

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
      suggestions: [] // 接收联想建议列表
    }
  },
  methods: {
    // 搜索关键字高亮处理
    highlight (str) {
      // 如果想要动态的创建一个正则表达式，使用new RegExp手动构造
      // 它会根据 字符串来创建一个正则表达式对象
      // 参数2：用来指定匹配模式，列如g 全局i忽略大小写
      const reg = new RegExp(this.searchText, 'ig')
      return str.replace(reg, `<span style='color:red'>${this.searchText}</span>`)
    },
    // 发生值改变事件时 获取联想建议
    async onSearchInput () {
      if (this.searchText) {
        let { data } = await getSuggestions(this.searchText)
        this.suggestions = data.data.options
      }
    },
    //   确定搜索时获取搜索结果
    onSearch () {
      this.isResultShow = true
    }
  },
  computed: {},
  watch: {},
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
        .van-search__action {
          color: #fff;
        }
    }
</style>
