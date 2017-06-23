<template>
  <div>
    <h3>机器电池</h3>
    <el-form :inline="true" class="">
      <el-form-item label="状 态">
        <el-select v-model="state_filter" placeholder="机器状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="在线" value="ONLINE"></el-option>
          <el-option label="离线" value="OFFLINE"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地 区">
        <el-cascader
          :options="regionOptions"
          @change="handleRegionChange"
          :debounce="500"
          filterable
          change-on-select
        ></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search" :loading="loading">查 询</el-button>
      </el-form-item>
    </el-form>

    <!------------------机器列表------------------------>
    <el-table
      :data="terminalList"
      v-loading.fullscreen.lock="loading"
      border
      stripe
      fit
      style="width: 100%"
      :default-sort="{prop: 'deviceId', order: 'ascending'}">
      <el-table-column prop="deviceId" label="编号" sortable width="180"></el-table-column>
      <el-table-column prop="buildingName" label="网点"></el-table-column>
      <el-table-column label="状态" width="100">
        <template scope="scope">
          <div v-if="scope.row.state =='ONLINE'">
            <el-tag type="success">在线</el-tag>
          </div>
          <div v-else-if="scope.row.state =='OFFLINE'">
            <el-tag type="warning">离线</el-tag>
          </div>
          <div v-else-if="scope.row.state =='OUT_OF_SERVICE'">
            <el-tag>已撤走</el-tag>
          </div>
          <div v-else-if="scope.row.state =='INSTALLING'">
            <el-tag type="danger">未初始化</el-tag>
          </div>
          <div v-else>-</div>
        </template>
      </el-table-column>
      <el-table-column prop="availableBattery" label="可借" width="80"></el-table-column>
      <el-table-column prop="availableReturn" label="可还" width="80"></el-table-column>
      <el-table-column prop="" label="操作" align="center" width="180">
        <template scope="scope">
          <el-button
            size="small"
            @click="detailHandle(scope.$index, scope.row)">详情
          </el-button>
          <el-button
            size="small"
            @click="batteryHandle(scope.$index, scope.row)">电池
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!------------------分页------------------------->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageable.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageable.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageable.totalElements">
    </el-pagination>

    <!------------------电池管理------------------------->
    <el-dialog
      title="电池详情"
      v-loading.body.lock="handleBattery.loading"
      v-model="handleBattery.visible"
      :size="'large'"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <el-table
        :data="handleBattery.batterys"
        border
        stripe
        fit
        :default-sort="{prop: 'index'}">
        <el-table-column prop="index" label="模组" width="80"></el-table-column>
        <el-table-column prop="device_id" label="电池编号" align="'center'"></el-table-column>
        <el-table-column prop="power" label="电量" width="80"></el-table-column>
        <el-table-column prop="state" label="状态" ></el-table-column>
        <el-table-column prop="date" label="最后更新时间" :formatter="formatterDate"></el-table-column>
        <el-table-column label="操作" >
          <template scope="scope">
            <el-button
              size="small"
              :disabled="handleBattery.terminal.state !== 'ONLINE' || scope.row.state ==='LEASE'"
              @click="injectBatteryHandle(scope.$index, scope.row)">弹出
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleBattery.visible = false">取 消</el-button>
      </div>
    </el-dialog>

    <!------------------机器信息管理---------------------->
    <el-dialog
      title="机器详情"
      v-loading.body.lock="handleDetail.loading"
      v-model="handleDetail.visible" :size="'full'"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false">
      <h3>编号：{{handleDetail.terminal.deviceId}}，模组数：{{handleDetail.terminal.capacity}}</h3>
      <el-form
        :model="handleDetail.terminal"
        :rules="handleDetail.rules"
        ref="handelDetailFrom"
        :label-position="'right'"
        class="terminal-form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="网点名称" :label-width="'1rem'" prop="buildingName">
              <el-input v-model.trim="handleDetail.terminal.buildingName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="网点地址" :label-width="'1rem'" prop="address">
              <el-input v-model.trim="handleDetail.terminal.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="摆放位置" :label-width="'1rem'" prop="name">
              <el-input v-model.trim="handleDetail.terminal.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属区域" :label-width="'1rem'" prop="regions">
              <el-cascader
                :options="regionOptions"
                v-model="handleDetail.terminal.regions"
                :debounce="500"
                filterable>
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="longitude" :label-width="'1rem'">
              <el-input v-model.number="handleDetail.terminal.longitude" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="latitude" :label-width="'1rem'">
              <el-input v-model.number="handleDetail.terminal.latitude" type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="开关机时间" :label-width="'1rem'">
              <el-time-select
                placeholder="开机时间"
                v-model="handleDetail.terminal.servingFrom"
                :disabled="handleDetail.terminal.server24H"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '23:59'
                }">
              </el-time-select>
              <el-time-select
                placeholder="关机时间"
                v-model="handleDetail.terminal.servingTo"
                :disabled="handleDetail.terminal.server24H"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '23:59'
                }">
              </el-time-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="24小时开机" :label-width="'1rem'">
            <el-switch v-model="handleDetail.terminal.server24H" on-text="是" off-text="否"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客服电话" :label-width="'1rem'">
              <el-input v-model="handleDetail.terminal.servicePhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合作电话" :label-width="'1rem'">
              <el-input v-model="handleDetail.terminal.businessPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="商户电话" :label-width="'1rem'">
              <el-input v-model="handleDetail.terminal.merchantsPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDetailHandle">取 消</el-button>
        <el-button type="primary" @click="updateDetail">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'Terminal',
    components: {},
    data () {
      return {
        handleBattery: {
          visible: false,
          loading: false,
          terminal: {},
          batterys: []
        },
        handleDetail: {
          visible: false,
          loading: false,
          terminal: {},
          rules: {
            buildingName: [
              { required: true, message: '请输入网点名称', trigger: 'blur' },
              { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
            ],
            address: [
              { required: true, message: '请输入网点地址', trigger: 'blur' },
              { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
            ],
            name: [
              { required: true, message: '请输入摆放位置', trigger: 'blur' },
              { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
            ],
            regions: [
              { type: 'array', required: true, message: '请选择所属区域', trigger: 'change' }
            ],
            longitude: [
              { type: 'number', required: true, message: '请输入经度', trigger: 'blur' }
            ],
            latitude: [
              { type: 'number', required: true, message: '请输入纬度', trigger: 'blur' }
            ],

          }
        }
      };

    },
    computed: {
      ...mapGetters({
        pageable: 'terminalPageable',
        terminalList: 'terminalList',
        filter: 'terminalFilter',
        regionOptions: 'regionOptions',
        loading: 'terminalLoading'
      }),
      state_filter: {
        get () {
          return this.$store.state.terminalBattery.filter.state
        },
        set (state_filter) {
          this.$store.commit('updateFilter', {state_filter})
        }
      },
    },
    methods: {
      ...mapActions({
        pageableChange: 'pageableChange',
        search: 'searchTerminal',
        getBattery: 'getBattery',
        injectBattery : 'injectBattery',
        updateTerminal: 'updateTerminal'
      }),
      //格式化日期
      formatterDate(row, column) {
        return row[column.property] ? new Date(row[column.property]).format('yyyy-MM-dd HH:mm:ss') : '-'
      },

      handleSizeChange (pageSize){
        this.pageableChange({pageSize});
      },
      handleCurrentChange (page){
        this.pageableChange({page});
      },
      handleRegionChange(region_filter){
        //TODO:这里不知道组件里哪里改了state
        this.$store.commit('updateFilter', {region_filter})
      },
      //打开机器详情
      detailHandle(index, terminal){
        let vmD = this.handleDetail;
        let server24H = !(terminal.servingTo && terminal.servingFrom);
        let regions = [terminal.provinceId, terminal.cityId, terminal.regionId];
        vmD.visible = true;
        vmD.terminal = {...terminal, regions, server24H};
        vmD.terminal.servingTo = terminal.servingTo && (typeof terminal.servingTo === 'string' ? terminal.servingTo: new Date(terminal.servingTo).format('HH:mm'));
        vmD.terminal.servingFrom = terminal.servingFrom && (typeof terminal.servingFrom === 'string' ? terminal.servingFrom: new Date(terminal.servingFrom).format('HH:mm'));
      },

      //关闭机器详情
      cancelDetailHandle(){
        this.handleDetail.visible = false;
        this.$refs.handelDetailFrom.resetFields();
      },

      //提交机器详情
      updateDetail(){
        let vm = this;
        this.$refs.handelDetailFrom.validate((valid) => {
          if (valid) {
            vm.$store.commit('toggleTerminalLoading');
            let newTerminal = {...this.handleDetail.terminal};
            this.updateTerminal(newTerminal).then(function (data) {
              vm.$store.commit('toggleTerminalLoading');

              //TODO:为什么这里传的和前面的this.handleDetail.terminal不一样-this.handleDetail.terminal
              vm.$store.commit('updateTerminalSuccess', newTerminal);
              vm.cancelDetailHandle();
              alert('提交成功');
            }).catch(function (e) {
              alert(e);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      //打开电池详情
      batteryHandle(index, terminal){
        let vmHB = this.handleBattery;
        vmHB.visible = true;
        vmHB.loading = true;
        vmHB.terminal = {...terminal};
        vmHB.batterys = [];
        console.log(terminal.uuid)
        this.getBattery(terminal.uuid).then(function ({data}) {
          vmHB.loading = false;
          vmHB.batterys = data.batterys;
        }).catch(function (e) {
          alert(e)
        })
      },
      //点击弹出电池
      injectBatteryHandle(index, battery){
        let vmHB = this.handleBattery;
        vmHB.loading = true;
        this.injectBattery({uuid: vmHB.terminal.uuid, device_id: battery.device_id}).then(function (data) {
          vmHB.loading = false;
          alert('弹出成功');
        }).catch(function (e) {
          alert(e);
          vmHB.loading = false;
        })
      }
    },
    created () {
      this.$store.dispatch('initRegionOptions');
//      this.$store.dispatch('searchTerminal');
    }
  }
</script>

<style lang="less" scoped>
  .terminal-form{
    .el-cascader{
      width: 100%;
    }
  }
</style>
