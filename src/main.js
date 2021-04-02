import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import {
  Cell,
  CellGroup,
  Icon,
} from 'vant'

Vue
  .use(Cell)
  .use(CellGroup)
  .use(Icon)

let globalData={
  musicId:1,
  currentMusicIndex:0,
  musicData:[],
  playStatus:true,
  musicInfo:{
    name:null,
    song:{
      artists:[
        {
          name:null

        },
        {
          name:null

        }
      ]
    }
  }
}
new Vue({
  router,
  data:{
    globalData
  },
  render: h => h(App)
}).$mount('#app')
