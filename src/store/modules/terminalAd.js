/**
 * Created by zxh on 2017/6/26.
 */
import api from '@/api/terminalAd'

const state = {
  adList: [],
  loading: false
};

const getters = {
  adList: state => state.adList,
  terminalAdLoading: state => state.loading
};

const actions = {
  fetchAdList({commit}, deviceId){
    api.fetchAdList(deviceId).then(function ({data}) {
      commit('receivedAdList', data)
    }).catch(function (e) {
      alert(e)
    });
  },
  deleteAd({commit}, {terminal, terminalAd}){
    console.log(terminal, terminalAd);
    api.deleteAd({terminal, terminalAd}).then(function ({data}) {
      commit('deleteAdresult', terminalAd);
    }).catch(function (e) {
      alert(e)
    });
  },
  addAd({commit}, {deviceIds, ads}){
    console.log(deviceIds, ads);
    return api.addAd({deviceIds, ads});
  },
};

const mutations = {
  receivedAdList(state, data){
    state.adList = data.list;
  },
  deleteAdresult(state, terminalAdId){
    let index = state.adList.findIndex(function (item) {
      return item.ta_id === terminalAdId
    });
    state.adList.splice(index, 1);
    alert('删除成功!');
  },
  toggleTerminalAdLoading(state) {
    state.loading = !state.loading;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
}
