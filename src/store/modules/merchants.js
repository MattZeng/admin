/**
 * Created by zxh on 2017/6/8.
 */
import  api from '@/api/merchants'

const state = {
  list: [],
  loading: false,
  filter: ''
};

const getters = {
  merchantsList: state => state.list.filter(merhant => merhant.name.indexOf(state.filter) >= 0),
  merchantsLoading: state => state.loading,
};

const actions = {
  searchMerchants ({commit}) {
    commit('toggleMerchantsLoading');
    api.fetchMerchantList().then(function ({data}) {
      commit('toggleMerchantsLoading');
      commit('receivedMerchants', data);
    }).catch(function (e) {
      commit('toggleMerchantsLoading');
      alert(e);
    })
  },
  //删除机器
  deleteMerchant({commit, state}, id){
    commit('toggleMerchantsLoading');
    api.deleteMerchant({id}).then(function () {
      commit('deleteFromList', {id});
      commit('toggleMerchantsLoading');
    }).catch(function (e) {
      commit('toggleMerchantsLoading');
      alert(e);
    })
  },
  //
  updateMerchant({commit, state}, {id, name, contactsName, merchantsPhone}) {
    commit('toggleMerchantsLoading');
    api.updateMerchant({id, name, contactsName, merchantsPhone}).then(function () {
      commit('toggleMerchantsLoading');
      commit('updateMerchantByIndex', {id, name, contactsName, merchantsPhone});
      alert('提交成功');
    }).catch(function (e) {
      commit('toggleMerchantsLoading');
      alert(e);
    });
  },

  //
  createMerchant({commit, state}, merchant) {
    commit('toggleMerchantsLoading');
    api.createMerchant(merchant).then(function (data) {
      commit('toggleMerchantsLoading');
      alert('添加成功');
    }).catch(function (e) {
      commit('toggleMerchantsLoading');
      alert(e);
    })
  },

  fetchMerchantTerminal({commit}, id) {
    return api.merchantTerminal({id})
  },

  deleteMerchantTerminal({commit}, data) {
    return api.deleteTerminal(data)
  },

  addMerchantTerminal({commit}, data) {
    return api.addTerminal(data)
  }
};

const mutations = {
  receivedMerchants(state, {list}){
    state.list = list;
  },
  deleteFromList(state, {id}) {
    let index = state.list.findIndex(function (merchant) {
      return merchant.id === id;
    });
    state.list.splice(index, 1);
  },
  updateMerchantByIndex(state, {id, name, contactsName, merchantsPhone}) {
    let index = state.list.findIndex(function (merchant) {
      return merchant.id === id;
    });
    state.list.splice(index, 1, {id, name, contactsName, merchantsPhone});
  },
  toggleMerchantsLoading(state) {
    state.loading = !state.loading;
  },
  setMerchantsNamefilter(state, value) {
    state.filter = value;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
