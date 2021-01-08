import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Recommend',
    component: ()=>import("../views/Recommend")
  }
]

const router = new VueRouter({
  routes,
  mode:"hash"
})

export default router
