/**
 * Created by zxh on 2017/6/8.
 */
import  api from '@/api/order'

const state = {
  orderList: [],
  loading: false
};

const getters = {
  orderList : state => state.orderList,
  orderManageLoading: state => state.loading
};

const actions = {
  searchOrder ({commit, dispacth, state}, {name}){
    commit('toggleOrderLoading');
    api.findByAccount(name).then(function ({data}) {
      console.log(data);
      commit('receivedOrderList', data);
      commit('toggleOrderLoading');
    }).catch(function (e) {
      alert(e)
      commit('toggleOrderLoading');
    })
  },
  returnBattery ({commit, dispacth, state}, {rent, returnDate, uuid}){
    commit('toggleOrderLoading');
    api.returnBattery({rent: rent*100, returnDate:returnDate.getTime(), uuid}).then(function (data) {
      alert('归还成功');
      commit('toggleOrderLoading');
    }).catch(function (e) {
      alert('归还失败');
      commit('toggleOrderLoading');
    });
  },
  returnLine ({commit, dispacth, state}, {rent, returnDate, uuid}){
    commit('toggleOrderLoading');
    api.returnLine(uuid).then(function (data) {
      alert('归还成功');
      commit('toggleOrderLoading');
    }).catch(function (e) {
      alert('归还失败');
      commit('toggleOrderLoading');
    })
  }
};

const mutations = {
  receivedOrderList (state, list) {
    state.orderList = list;
  },
  toggleOrderLoading (){
    state.loading = !state.loading;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
