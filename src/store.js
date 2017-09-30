import Vue from 'vue'
import Vuex from 'vuex'

import blacklist from './stores/blacklist.store'
import status from './stores/status.store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    blacklist,
    status
  },
  actions: {
    fetchData: function (context) {
      context.dispatch('blacklist/fetchData')
      context.dispatch('status/fetchData')
    }
  }
})

export default store

