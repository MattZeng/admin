<template>
  <div>
    <el-form :inline="true" :model="account" class="" @keyup.enter.native="search(account)" v-loading.fullscreen.lock="loading">
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
      <h3>{{`${orderList[0]&&orderList[0].name||''}-${orderList[0]&&orderList[0].account||''}`}}</h3>
    </el-form>
    <el-table :data="orderList" border stripe style="width: 100%" :default-sort="{prop: ''}" >
      <el-table-column prop="uuid" label="订单编号"></el-table-column>
      <el-table-column prop="date" label="日期" :formatter="formatterDate" width="160" ></el-table-column>
      <el-table-column prop="terminal" label="网点"></el-table-column>
      <el-table-column prop="android" label="安卓" :formatter="formatter" width="80"></el-table-column>
      <el-table-column prop="iphone" label="苹果" :formatter="formatter" width="80"></el-table-column>
      <el-table-column prop="typeC" label="type-c" :formatter="formatter" width="80"></el-table-column>
      <el-table-column label="电池租借" align="center">
        <el-table-column label="状态" align="center" width="80">
          <template scope="scope">
            <div v-if="scope.row.leaseState==='LEASING'">
              <el-tag type="warning">租借中</el-tag>
            </div>
            <div v-else-if="scope.row.leaseState==='RETURNED'">
              <el-tag type="success">已归还</el-tag>
            </div>
            <div v-else>-</div>
          </template>
        </el-table-column>
        <el-table-column prop="returnDate" label="归还时间" :formatter="formatterDate" width="160"></el-table-column>
        <el-table-column prop="battery" label="租金" :formatter="formatter" width="80"></el-table-column>
      </el-table-column>
      <el-table-column label="处理" align="center" width="80">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="处理订单" v-model="handleOrder.visible" :size="'tiny'">
      <el-form :model="handleOrder">
        <div v-if="handleOrder.order.leaseState">
          <el-form-item label="租借时间" :label-width="'.8rem'">
            <el-date-picker
              v-model="handleLeaseDate"
              type="datetime"
              readonly>
            </el-date-picker>
          </el-form-item>
          <el-form-item label="归还时间" :label-width="'.8rem'">
            <el-date-picker
              v-model="handleOrder.orderToPost.returnDate"
              type="datetime"
              placeholder="选择日期时间"
              :picker-options="{minTime: handleLeaseDate}"
              v-on:change="changeReturnDate">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="租金" :label-width="'.8rem'">
            <el-input v-model="handleOrder.orderToPost.rent" placeholder="" style="width:193px"></el-input>
            <el-button type="primary" @click.prevent="returnBattery(handleOrder.orderToPost)">归还</el-button>
          </el-form-item>
        </div>
        <div v-if="handleOrder.order.iphone !== null || handleOrder.order.android !== null || handleOrder.order.typeC !== null">
          <el-form-item label="数据线" :label-width="'.6rem'">
            <el-input v-model="handleLineStr" placeholder="" style="width:193px" :disabled="true"></el-input>
            <el-button
              type="primary"
              @click.prevent="returnLine(handleOrder.orderToPost)"
              :disabled="disableReturnLine">退款</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleOrder.visible = false">取 消</el-button>
        <!--<el-button type="primary" @click="handleOrder.visible = false">确 定</el-button>-->
      </div>
    </el-dialog>
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
        handleOrder: {
          visible: false,
          order: {},
          orderToPost: {
            uuid: '',
            rent: 0,
            returnDate: {}
          },

        }
      }
    },
    computed: {
      ...mapGetters({
        orderList: 'orderList',
        loading: 'orderManageLoading'
      }),
      handleLeaseDate(){
        return new Date(this.handleOrder.order.leaseDate)
      },
      handleLineStr(){
        const order = this.handleOrder.order;
        if (order.iphone !== null) {
          return `Iphone线${order.iphone}元`
        } else if (order.android !== null) {
          return `Android线${order.android}元`
        } else if (order.typeC !== null) {
          return `TypeC线${order.typeC}元`
        }
        return '无';
      },
      disableReturnLine () {
        //el-button组件prop disable 强匹配
        return (this.handleOrder.order.iphone || this.handleOrder.order.android || this.handleOrder.order.typeC) ? false : true;
      }
    },
    props: [''],
    methods: {
      ...mapActions({
        search: 'searchOrder',
        returnBattery: 'returnBattery',
        returnLine: 'returnLine'
      }),

      //点击编辑
      handleEdit(index, row){
        this.handleOrder.order = row;
        this.handleOrder.orderToPost.returnDate = row.returnDate ? new Date(row.returnDate) : null;
        //TODO:这里页触发了修改归还日期的时间，逻辑要优化
        setTimeout(()=>this.handleOrder.orderToPost.rent = row.battery, 10);
        this.handleOrder.orderToPost.uuid = row.uuid;
        this.handleOrder.visible = true;
      },

      //
      formatter (row, column) {
        return row[column.property] === null ? '-' : row[column.property]
      },

      //格式化日期
      formatterDate(row, column) {
        return row[column.property] ? new Date(row[column.property]).format('yyyy-MM-dd HH:mm') : '-'
      },

      //更改日期
      changeReturnDate(dateStr) {
        console.log(dateStr);
        if(!dateStr){
          this.handleOrder.orderToPost.rent = 0;
          return;
        }
        let returnDate = this.handleOrder.orderToPost.returnDate.getTime();
//        let returnDate = new Date(dateStr).getTime();
        let diff = returnDate - this.handleLeaseDate.getTime();
        if(diff < 0){
          this.handleOrder.orderToPost.returnDate = this.handleLeaseDate;
          diff = 0;
        }
        // 总租借时长
        let leaseHours = Math.ceil(diff / 3600000.0);
        if(leaseHours <= 1) {
          this.handleOrder.orderToPost.rent = 0;
          return;
        }else{
          //第一小时免费
          leaseHours--;
        }
        // 总租借天数
        let leaseDays = Math.floor(leaseHours / 24);
        // 剩余不足一天的小时数
        let leftHours = leaseHours % 24;

        // 一天封顶租金
        let oneDayRentCeil = 12;

        let leftHoursRent = leftHours * 1;

        let rent = oneDayRentCeil * leaseDays
          + (leftHoursRent > oneDayRentCeil ? oneDayRentCeil : leftHoursRent);
        this.handleOrder.orderToPost.rent = rent > 100 ? 100 : rent;
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
