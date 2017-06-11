<template>
  <div id="">
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
    <el-table :data="test" border stripe style="width: 100%" :default-sort="{prop: ''}" >
      <el-table-column prop="orderUuid" label="订单编号"></el-table-column>
      <el-table-column prop="orderDate" label="日期"></el-table-column>
      <el-table-column prop="name" label="网点"></el-table-column>
      <el-table-column prop="android" label="安卓"></el-table-column>
      <el-table-column prop="iphone" label="苹果"></el-table-column>
      <el-table-column prop="typeC" label="type-c"></el-table-column>
      <el-table-column label="电池租借" align="center">
        <el-table-column label="状态" align="center">
          <template scope="scope">
            <div v-if="scope.row.state==='LEASING'">
              <el-tag type="warning">租借中</el-tag>
            </div>
            <div v-else>
              <el-tag type="success">已归还</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="returnDate" label="归还时间"></el-table-column>
        <el-table-column prop="depositAmount" label="租金"></el-table-column>
      </el-table-column>
      <el-table-column label="处理" align="center">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'OrderManage',
    components: {},
    data () {
      return {
        account: {name:''},
        test: [{state:'LEASING',android:10},{state:'adfa'}]
      }
    },
    props: [''],
    methods: {
      ...mapActions({
        search: 'searchOrder'
      }),
      handleEdit(){
        console.log(arguments)
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
