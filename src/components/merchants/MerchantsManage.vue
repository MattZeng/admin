<template>
  <div id="">
    <h3>商户列表</h3>
    <el-form :inline="true" class="">
      <el-form-item label="名 称">
        <el-input v-model="name_filter" placeholder="输入名称筛选">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createHandle" >新建商户</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="merchantsList"
      v-loading.fullscreen.lock="loading"
      border
      stripe
      fit
      style="width: 100%"
      :default-sort="{prop: 'id'}">
      <el-table-column prop="name" label="商户名"></el-table-column>
      <el-table-column prop="contactsName" label="联系人" width="280"></el-table-column>
      <el-table-column prop="merchantsPhone" label="联系电话" width="280"></el-table-column>
      <el-table-column prop="" label="操作" width="280" align="center">
        <template scope="scope">
          <el-button
            size="small"
            @click="detailHandle(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="small"
            @click="openTerminalDialo(scope.$index, scope.row)">机器
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="deleteHandle(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-------------------商户信息---------------------------->
    <el-dialog
      title="商户信息"
      v-model="handleDetail.visible" :size="'small'"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false">

      <el-form
        :model="handleDetail.merchant"

        ref="handelDetailFrom"
        :label-position="'right'"
        class="terminal-form">
        <!--:rules="handleDetail.rules"-->
        <el-form-item label="商户名称" :label-width="'1rem'">
          <el-input v-model.tirm="handleDetail.merchant.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人" :label-width="'1rem'">
          <el-input v-model.tirm="handleDetail.merchant.contactsName" ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="'1rem'">
          <el-input v-model.tirm="handleDetail.merchant.merchantsPhone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDetailHandle">取 消</el-button>
        <el-button type="primary" @click="updateDetail">{{handleDetail.create?"新 建":"编 辑"}}</el-button>
      </div>
    </el-dialog>
    <!-------------------机器关联---------------------------->
    <el-dialog
      title=""
      v-model="terminalDetail.visible" :size="'large'"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false">
      <h3>{{terminalDetail.merchant.name}}</h3>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-table
            :data="terminalDetail.terminalList"
            border
            stripe
            fit
            style="width: 100%">
            <el-table-column prop="device_id" label="编号" width="100"></el-table-column>
            <el-table-column prop="building_name" label="网点名" ></el-table-column>
            <el-table-column prop="" label="操作" width="100">
              <template scope="scope">
                <el-button
                  size="small"
                  type="danger"
                  @click="deleteConnect(scope.$index, scope.row)">删除关联
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <h3>添加机器</h3>
          <p>输入机器编号，机器编号间用回车分割</p>
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="terminalDetail.terminalsTemp">
          </el-input>
          <el-button type="primary" @click="addConnect" class="right_btn">添 加</el-button>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeTerminalDialo">取 消</el-button>
        <!--<el-button type="primary" @click="">{{handleDetail.create?"新 建":"编 辑"}}</el-button>-->
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    name: 'MerchantsManage',
    components: {ElRow},
    data () {
      return {
        handleDetail: {
          merchant: {
            name: '',
            contactsName: '',
            merchantsPhone: ''
          },
          create: false,
          visible: false
        },
        terminalDetail: {
          terminalList: [],
          terminalsTemp: '',
          merchant: {},
          visible: false
        }
      }
    },
    computed: {
      ...mapGetters({
        merchantsList: 'merchantsList',
        loading: 'merchantsLoading'
      }),
      name_filter: {
        get (){
          return this.$store.state.merchants.filter
        },
        set (value){
          //todo: 加个throttling函数
          this.$store.commit('setMerchantsNamefilter', value)
        }
      }
    },
    methods: {
      ...mapActions({
        fetchMerchant: 'searchMerchants',
        deleteMerchant: 'deleteMerchant',
        createMerchant: 'createMerchant',
        updateMerchant: 'updateMerchant',
        getTerminals: 'fetchMerchantTerminal',
        deleteTerminal: 'deleteMerchantTerminal',
        addTerminal: 'addMerchantTerminal'
      }),

      //打开编辑
      detailHandle (index, merchant) {
        let vm = this;
        vm.handleDetail.visible = true;
        vm.handleDetail.create = false;
        vm.handleDetail.merchant = {...merchant};
      },

      //打开新建
      createHandle(){
        let vm = this;
        vm.handleDetail.merchant = {
          name: '',
          contactsName: '',
          merchantsPhone: ''
        };
        vm.handleDetail.create = true;
        vm.handleDetail.visible = true;
      },

      //关闭编辑
      cancelDetailHandle(){
        this.handleDetail.visible = false;
        this.$refs.handelDetailFrom.resetFields();
      },

      //更新或者新增
      updateDetail(){
        let data = {...this.handleDetail.merchant};
        if(data.name == '') return;
        if(this.handleDetail.create) {
          this.createMerchant(data);
        } else {
          this.updateMerchant(data);
        }
      },

      //删除商户
      deleteHandle (index, merchant) {
        if(confirm("确认删除？")){
          console.log(merchant);
          this.deleteMerchant(merchant.id);
        }
      },

      //打开机器列表
      openTerminalDialo(index, merchant) {
        let detail = this.terminalDetail;
        let $store = this.$store;
        detail.visible = true;
        detail.merchant = {...merchant};
        $store.commit('toggleMerchantsLoading');
        this.getTerminals(merchant.id).then(function ({data}) {
          $store.commit('toggleMerchantsLoading');
          detail.terminalList = data.list
          console.log(data)
        }).catch(function (e) {
          $store.commit('toggleMerchantsLoading');
          alert(e);
        })
      },

      //关闭机器列表
      closeTerminalDialo() {
        this.terminalDetail.visible = false;
      },

      //删除某个关联
      deleteConnect(index, {uuid}) {
        if(confirm("确认删除关联?")){
          let vm = this;
          vm.$store.commit('toggleMerchantsLoading');
          vm.deleteTerminal({uuid, merchantId: vm.terminalDetail.merchant.id}).then(function () {
            vm.$store.commit('toggleMerchantsLoading');
            let index = vm.terminalDetail.terminalList.findIndex(function (terminal) {
              return terminal.uuid == uuid;
            });
            vm.terminalDetail.terminalList.splice(index, 1);
          }).catch(function (e) {
            vm.$store.commit('toggleMerchantsLoading');
            alert(e);
          })
        }
      },

      //添加机器关联
      addConnect(){
        let vm = this;
        let deviceIds = vm.terminalDetail.terminalsTemp.trim().split('\n');
        vm.$store.commit('toggleMerchantsLoading');
        console.log('add')
        vm.addTerminal({deviceIds, merchantId: vm.terminalDetail.merchant.id}).then(function () {
          vm.$store.commit('toggleMerchantsLoading');
          alert('添加成功');
        }).catch(function (e) {
          console.log(arguments);
          vm.$store.commit('toggleMerchantsLoading');
          alert(e);
        });
        console.log(deviceIds)
      }
    },
    created (){
      this.fetchMerchant();
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route' () {
        this.merchantsList.length || this.fetchMerchant();
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
