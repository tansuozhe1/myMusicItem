<template>
    <div class="Search">
        <!-- 搜索栏 -->
        <div class="top">
            <!-- 搜索框 -->
            <div class="box">
                <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model="iptData" @input="changes" ref="ipt" @focus = "getFocus">
                <span class="find"></span>
                <div class="dele" @click.stop="deleteData">x</div>
            </div>
        </div>

        <!-- 十大热门搜索 -->
        <div class="seek" ref="hotsearch" v-show="hotSearchShow">
            <div class="title">热门搜索</div>
            <ul class="hotSeek">
                <li v-for="(v,i) in hotSeekList" :key="i+1" @click="searchHotMusic">{{v.first}}</li>
            </ul>
        </div>
        <!-- 搜索到的歌曲、歌手、专辑 -->
        <Searchlist v-show="searchClassify" :classifyData="classifyData" :iptData="iptData" @findreturn="findreturn" @click.native='triggerAddHistory'></Searchlist>
        <!-- 加载动画 -->
        <Loading v-show="loading"></Loading>
        <!-- 查找到的具体的歌曲、专辑、歌手信息 -->
        <FindSongslist v-show="songsList" v-for="(v,i) in search_music_list" :key="i+1" :item="v"></FindSongslist>

        <!-- 删除历史记录 -->
        <DeleteCookies :searchHistory='searchHistory' v-show="searchHistoryShow"></DeleteCookies>
    </div>
</template>
<script>
import Searchlist from "../components/Search_list"
import Loading from "../components/Loading"
import FindSongslist from "../components/FindSongsList"
import DeleteCookies from '../components/DeleteCookies'
export default {
    name:"Search",
    data(){
        return {
            iptData:"",
            cookiesNum:0,
            searchHistory:[],
            classifyData:[],
            search_music_list:[],
            hotSearchShow:true,
            searchHistoryShow:true,
            loading:false,
            searchClassify:false,
            songsList:false,
            hotSeekList:[]
        }
    },
    components:{
        Searchlist,
        Loading,
        FindSongslist,
        DeleteCookies
    },
    methods:{
        triggerAddHistory(){
            this.setSearchHistory();
        },
        deleteData(){
            this.searchClassify = false;
            this.songsList = false;
            this.hotSearchShow = true;
            this.searchHistoryShow = true;
            this.iptData = '';
        },
        // 设置历史记录
        setSearchHistory(){
            let iptData = this.iptData;
            if(iptData){
                let index = this.searchHistory.indexOf(iptData);
                if(index > -1){
                    this.searchHistory.splice(index,1)
                }
                this.searchHistory.push(iptData);
                this.searchHistory.reverse();
            }
        },

        changes(){
            this.searchHistoryShow = false;
            this.hotSearchShow=false;
        },
        getFocus(e){
            let iptValue = e.target.value;

            if(iptValue){
                this.loading=true;
                this.searchHistoryShow = true;
                this.hotSearchShow = false;
                this.songsList=false;
                this.$axios.get('/search/suggest?keywords='+iptValue).then(data=>{
                    console.log(data);
                    let res = data.data.result;
                    if(data.data.code==200 && res.order){
                        let formatData=res.order.reduce((prev,cur)=>{
                            if(cur != "playlists"){
                                return prev.concat(res[cur]);
                            }else{
                                return prev
                            }
                        },[])
                        this.classifyData = formatData;
                        // console.log(this.classifyData);
                    }else{
                        this.classifyData=[];
                    }

                    this.loading=false;
                    this.searchClassify = true;

                    if(this.iptData == ""){
                        this.searchHistoryShow = true;
                        this.hotSearchShow=true;
                        this.searchClassify = false;
                    }
                })
            }
            
        },
        findreturn(musicName){
            this.loading = true;
            this.searchClassify = false;
            // console.log(musicName);
            this.$axios.get("/search?keywords="+musicName).then(data=>{
                this.loading = false;
                this.songsList=true;
                // console.log(data);
                if(data.data.code == 200){
                    let numbers = musicName.split("=")[1];
                    if(numbers<10){
                        let dataType = "songs";
                        this.search_music_list = data.data.result[dataType].map(value=>{
                            return {
                                name:value.name,
                                id:value.id,
                                artists:value.artists,
                                album:value.album.name,
                                num:1
                            }
                        })
                    }else if(numbers<100){
                        let dataType = "albums";
                        this.search_music_list = data.data.result[dataType].map(value=>{
                            return {
                                name:value.name,
                                id:value.id,
                                picUrl:value.picUrl,
                                artists:value.artists,
                                num:2
                            }
                        })
                    }else{
                        let dataType = "artists";
                        this.search_music_list = data.data.result[dataType].map(value=>{
                            return {
                                name:value.name,
                                id:value.id,
                                picUrl:value.picUrl,
                                num:3
                            }
                        })
                    }
                    // console.log(this.search_music_list)
                }
            })
        },
        searchHotMusic(e){
            let v = e.target.textContent;
            this.iptData = v;
            this.loading=true;
            this.searchHistoryShow = false;
            this.hotSearchShow = false;
            this.songsList=false;

            this.$axios.get('/search/suggest?keywords='+v).then(data=>{
                let res = data.data.result;
                if(data.data.code==200 && res.order){
                    let formatData=res.order.reduce((prev,cur)=>{
                        if(cur != "playlists"){
                            return prev.concat(res[cur]);
                        }else{
                            return prev
                        }
                    },[])
                    this.classifyData = formatData;
                }else{
                    this.classifyData=[];
                }

                this.loading=false;
                this.searchClassify = true;
            })
        }
    },
    watch:{
        iptData(v){
            this.loading=true;
            this.hotSearchShow = false;
            this.searchHistoryShow = false;
            this.songsList=false;
            this.$axios.get('/search/suggest?keywords='+v).then(data=>{
                // console.log(data);
                let res = data.data.result;
                if(data.data.code==200 && res.order){
                    let formatData=res.order.reduce((prev,cur)=>{
                        if(cur != "playlists"){
                            return prev.concat(res[cur]);
                        }else{
                            return prev
                        }
                    },[])
                    this.classifyData = formatData;
                    // console.log(this.classifyData);
                }else{
                    this.classifyData=[];
                }

                this.loading=false;
                this.searchClassify = true;

                if(this.iptData == ""){
                    this.hotSearchShow=true;
                    this.searchHistoryShow = true;
                    this.searchClassify = false;
                }
            })
        }
    },
    created(){
        this.$axios.get("/search/hot").then(data=>{
            this.hotSeekList = data.data.result.hots;
        })
    },
    beforeRouteEnter(to,from,next){
        next(vm=>{
            vm.loading=false;
            vm.hotSearchShow = true;
            vm.songsList=false;
            vm.searchClassify = false;
            vm.$refs.ipt.value = "";
            if(typeof vm.$refs.ipt.value != "undefined"){
                vm.$refs.ipt.value = "";
            }
        });
    }
}
</script>
<style lang="less" scoped>
    .Search{
        .top{
            width: 100%;
            height: 60px;
            display:flex;
            align-items:center;
            justify-content: center;
            border-bottom:1px solid #ccc;
            .box{
                width: 340px;
                height: 30px;
                position:relative;
                input{
                    width: 300px;
                    line-height: 28px;
                    border-radius:20px;
                    border:0px;
                    padding:0px;
                    outline:none;
                    padding-left:30px;
                    background:rgba(0,0,0,.1);
                    &::-webkit-input-placeholder{
                        color:#bbb;
                    }
                }
                span.find{
                    width: 20px;
                    height: 20px;
                    position: absolute;
                    left:14px;
                    top:6px;
                    background:url(../assets/fdj.svg) no-repeat 0px 0px/16px 16px;
                }
                div.dele{
                    width: 15px;
                    line-height: 15px;
                    text-align:center;
                    background:#bbb;
                    border-radius:50%;
                    font-size: 10px;
                    color:white;
                    position:absolute;
                    padding-left:2px;
                    box-sizing: border-box;
                    right:14px;
                    top:6px;
                }
            }
        }
        div.seek{
            width: 100%;
            // height: 180px;
            padding-bottom:20px;
            text-align:left;
            box-sizing: border-box;
            border-bottom:1px solid #ccc;
            .title{
                padding-left:10px;
                margin:10px 0px 10px 0px;
                font-size: 14px;
                color:rgba(0,0,0,.7);
            }
            ul.hotSeek{
                padding-left:20px;
                display:flex;
                flex-wrap: wrap;
                justify-content: space-around;
                li{
                    border:1px solid rgba(0,0,0,.3);
                    margin:10px 10px 0px 0px;
                    padding:10px;
                    border-radius:10px;
                    font-size: 16px;
                }
            }
        }
    }
</style>