import Vue from 'vue'
import App from './App'
import Elements from 'element-ui'

Vue.config.productionTip = false

Vue.use(Elements)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
