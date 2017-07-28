import stateApi from '../../api/state'

const state = {
  today: [],
  month: [],
  accumulate: [],
  lease3Day: [],
  scanlogList: [],
  orderList: [],
  active: 'today',
  loading: false
};

const getters = {
  today: state => state.today,
  month: state => state.month,
  accumulate: state => state.accumulate,
  loading: state => state.loading,
  stateData (state) {return state[state.active].map((item) =>{
    return Object.assign({}, {leaseCount: 0, android: 0, iphone: 0, typeC: 0, leaseIncome:0, itemIncome:0}, item);
  })},
  lease3day: (state) => {
    let dateFilter = (value) => {
      if (!value) {
        return null;
      }
      return new Date(parseInt(value)).format("yyyy-MM-dd HH:mm")
    }
    let stateFilter = (value) => {
      switch(value){
        case 'leasing':{
          return '出租中'
        }
        case 'returned':{
          return '已归还'
        }
      }
    }
    return state['lease3Day'].map((item) =>{
      item = Object.assign({}, item);
      for(let i in item){
        if(i == 'date' || i == 'return_date'){
          item[i] = dateFilter(item[i])
        }else if(i == 'state'){
          item[i] = stateFilter(item[i])
        }
      }
      return item;
  })},

  scanlogList: state => state.scanlogList,
  orderStatement: state => state.orderList
};

const actions = {
  fetchData ({ commit, state }) {
    commit('toggleLoading');
    stateApi.fetchData(state.active).then(function ({data}) {
      commit('receivedData', {values: Array.from(data), kind: state.active});
      commit('toggleLoading')
    }).catch(function (e) {
      commit('toggleLoading');
      alert(e)
    })
  },
  fetchLease3DayData ({ commit, state }) {
    commit('toggleLoading');
    stateApi.fetchData('lease3Day').then(function ({data}) {
      commit('receivedData', {values: Array.from(data), kind: 'lease3Day'});
      commit('toggleLoading')
    }).catch(function (e) {
      commit('toggleLoading');
      alert(e)
    })
  },
  reflesh ({dispatch, commit}){
    dispatch('fetchData');
  },
  Lease3DayDataReflesh ({dispatch, commit}){
    dispatch('fetchLease3DayData');
  },
  //扫描统计
  fatchScanlog({commit}, {start, end}){
    stateApi.fatchScanlog({start, end}).then(function ({data}) {
      commit('receivedData', {values: data.list, kind: 'scanlogList'})
    }).catch(function (e) {
      alert(e);
    })
  },
  //订单统计
  fatchOrderStatement({commit}, {start, end}){
    stateApi.fatchOrderList({start, end}).then(function ({data}) {
      commit('receivedData', {values: data.list, kind: 'orderList'})
    }).catch(function (e) {
      alert(e);
    })
  }
};

const mutations = {
  receivedData (state, {values, kind}){
    state[kind] = values;
  },
  init (state, {kind}){
    state.active = kind
  },
  toggleLoading (state){
    state.loading = !state.loading
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
