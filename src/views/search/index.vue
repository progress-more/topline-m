<template>
  <div class="search-container">
      <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="$router.back()"
      />
    </form>

    <!-- 联想建议 -->
     <van-cell-group>
      <van-cell title="单元格" icon="search" />
      <van-cell title="单元格" icon="search" />
      <van-cell title="单元格" icon="search" />
      <van-cell title="单元格" icon="search" />
      <van-cell title="单元格" icon="search" />
      <van-cell title="单元格" icon="search" />
    </van-cell-group>

    <!-- 历史记录 -->
     <van-cell-group>
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

    <!-- 搜索结果 -->
    <search-result/>
  </div>
</template>

<script>
import SearchResult from './components/search-result'
export default {
  name: 'SearchPage',
  components: {
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '' // 输入搜索内容
    }
  },
  methods: {
    onSearch () {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {}
}
</script>

<style>

</style>