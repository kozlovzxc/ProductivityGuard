import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Elements from 'element-ui'
Vue.use(Elements)

import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  mounted: function () {
    this.$store.dispatch('fetchData')
  }
})
