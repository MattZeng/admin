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
  loading: state => state.loading,
  stateDate (state) {return state[state.active].map((item) =>{
    return Object.assign({}, {leaseCount: 0, android: 0, iphone: 0, typeC: 0, leaseIncome:0, itemIncome:0}, item);
  })}
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
  reflesh ({dispatch, commit}){
    dispatch('fetchData');
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
