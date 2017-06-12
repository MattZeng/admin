/**
 * Created by zxh on 2017/6/8.
 */
import  api from '@/api/order'

const state = {
  orderList: []
};

const getters = {
  orderList : state => state.orderList
};

const actions = {
  searchOrder ({commit, dispacth, state}, {name}){
    api.findByAccount(name).then(function ({data}) {
      console.log(data);
      commit('receivedOrderList', data)
    }).catch(function (e) {
      alert(e)
    })
  },
  returnBattery ({commit, dispacth, state}, {rent, returnDate, uuid}){
    return api.returnBattery({rent: rent*100, returnDate:returnDate.getTime(), uuid});
  },
  returnLine ({commit, dispacth, state}, {rent, returnDate, uuid}){
    api.returnLine(uuid)
  }
};

const mutations = {
  receivedOrderList (state, list) {
    state.orderList = list;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
