import Vue from 'vue'
import VueRouter from 'vue-router'
import Elements from 'element-ui'

import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Elements)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
