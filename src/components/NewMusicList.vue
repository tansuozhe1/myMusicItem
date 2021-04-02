<template>
    <div class="newMusicList">
        <ul>
          <MusicList v-for="(v,i) in newMusicData" :key="i+1" :v="v" :index='i' @transmitIndex='getIndex'></MusicList>  
        </ul>
    </div>
</template>
<script>
import MusicList from "./Music_list"
export default {
    name:"NewMusicList",
    props:["newMusicData"],
    components:{
        MusicList
    },
    methods:{
        // 存储整个数组到全局变量中
        getIndex(){
        this.$root.globalData.musicData = this.newMusicData;
        },
    }
}
</script>
<style lang="less" scoped>
    .newMusicList{
        ul{
            
        }
    }
</style>