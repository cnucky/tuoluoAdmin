<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in levelList" :key="item.path" v-if="item.meta.title">
        <!-- <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span> -->
        <router-link :to="item.redirect||item.path">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    float: left;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
