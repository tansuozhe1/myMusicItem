import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from "../views/Recommend"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Recommend',
    component:Recommend
  },
  {
    path:"/hot",
    name:"Hot",
    props:true,
    component:()=>import("../views/Hot_music")
  },
  {
    path:"/search",
    name:"Search",
    component:()=>import("../views/Search")
  },
  {
    path:"/recommendMusicList",
    name:"RecommendMusicList",
    component:()=>import("../views/RecommendMusicList")
  },
  
]

const router = new VueRouter({
  routes,
  mode:"hash"
})

export default router
