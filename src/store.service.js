import Vue from 'vue'
import Vuex from 'vuex'

import blacklist from './services/blacklist.service'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    blacklist
  }
})

export default store

