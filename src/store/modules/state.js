import stateApi from '../../api/state'

const state = {
  today: [],
  month: [],
  accumulate: [],
  active: '',
  loading: false
};

const getters = {
  today: state => state.today,
  month: state => state.month,
  accumulate: state => state.accumulate,
  stateDate (state) {return state[state.active]}
};

const actions = {
  fetchData ({ commit, state }) {
    stateApi.fetchData(state.active).then(function ({data}) {
      commit('receivedData', {values: Array.from(data), kind: state.active});
    }).catch(function (e) {
      alert(e)
    })
  },
  reflesh ({dispatch, commit}){
    commit('toggleLoading');
    dispatch('fetchData').then(function () {
      commit('toggleLoading')
    });
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
