import VueRouter from 'vue-router'
import Popup from './components/Popup'
import Nope from './components/Nope'

const routes = [
  { path: '/', component: Popup },
  { path: '/nope/:url', component: Nope }
]

const router = new VueRouter({
  routes
})

export default router
