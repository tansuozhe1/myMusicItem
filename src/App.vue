<template>
  <div id="app">
    <Topnav></Topnav>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <Play :musicId = "this.$root.globalData.musicId" 
    :musicData = "this.$root.globalData.musicData"
    :currentMusicIndex = "this.$root.globalData.currentMusicIndex"
    ></Play>
  </div>
</template>
<script>
import Topnav from "./components/Topnav"
import Play from "./components/Play"

export default {
  name:"App",
  // data(){
  //   return {
  //     musicId:0
  //   }
  // },
  // methods:{
  //   playNextMusic(){

  //   }
  // },
  components:{
    Topnav,
    Play
  }
}
</script>
<style style="less" >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
