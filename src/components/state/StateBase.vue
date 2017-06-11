<template>
  <div id="">
    <h3>{{this.$route.meta.title}}</h3><el-button type="primary" :loading="loading" @click="reflesh">刷新</el-button>
    <el-table :data="stateData" border stripe style="width: 100%" :default-sort="{prop: 'device_id', order: 'ascending'}">
      <el-table-column prop="device_id" label="编号" sortable ></el-table-column>
      <el-table-column prop="name" label="网点"></el-table-column>
      <el-table-column prop="leaseCount" label="租借次数" sortable></el-table-column>
      <el-table-column prop="android" label="安卓(条)" sortable></el-table-column>
      <el-table-column prop="iphone" label="苹果(条)" sortable></el-table-column>
      <el-table-column prop="typeC" label="type-c(条)" sortable></el-table-column>
      <el-table-column prop="leaseIncome" label="租金收入" sortable></el-table-column>
      <el-table-column prop="itemIncome" label="数据线收入" sortable></el-table-column>
    </el-table>
  </div>
</template>

<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'StateBase',
    components: {},
    computed: mapGetters({
      stateData: 'stateData',
      loading: 'loading'
    }),
    data () {
      return {
        meta: {}
      }
    },
    methods: {
      ...mapActions(['fetchData', 'reflesh']),
    },
    created () {
      this.$store.dispatch('fetchData');//action
      this.$store.commit('init', this.$route.meta);

    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route' () {
        this.$store.commit('init', this.$route.meta);
        this.stateData.length || this.$store.dispatch('fetchData');
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
