<template>
  <div>
    <el-form :inline="true" :model="account" class="">
      <el-form-item label="账号:">
        <el-input v-model="account.name" placeholder="账号"></el-input>
      </el-form-item>
      <!--<el-form-item label="活动区域">-->
        <!--<el-select v-model="account.region" placeholder="活动区域">-->
          <!--<el-option label="区域一" value="shanghai"></el-option>-->
          <!--<el-option label="区域二" value="beijing"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="search(account)">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'WithdrawManage',
    components: {},
    computed: {
//      ...mapGetters({
//
//      }),
    },
    data () {
      return {
        account: {
          name: ''
        }
      }
    },
    props: [''],
    methods: {
      ...mapActions({
        search: 'searchWithdraw'
      }),
    }
  }
</script>

<style lang="less" scoped>

</style>
