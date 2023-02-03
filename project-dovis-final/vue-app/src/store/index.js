import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    htmlChartData: null,
    vuePlanetsData: null,
  },
  mutations: {
    htmlChartData(state, payload) {
      state.htmlChartData = payload;
    },
    vuePlanetsData(state, payload) {
      state.vuePlanetsData = payload;
    },
  },
  actions: {
  },
  modules: {
  }
})
