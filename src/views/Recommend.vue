<template>
    <div class="recommend">
        <Title>推荐歌单</Title>
        <Loading v-if="recommendMusicList.length<=0"></Loading>
        <ul>
            <li v-for="rem in recommendMusicList" :key="rem.id" @click='getInto(rem)'>
                <div>
                    <img :src="rem.picUrl">
                    <span class="bb"><span class="aa"></span>{{rem.playCount | format}}</span>
                </div>
                <p>{{rem.name}}</p>
            </li>
        </ul>
        <Title>最新音乐</Title>
        <Loading v-if="newMusicData.length<=0"></Loading>
        <NewMusicList :newMusicData="newMusicData"></NewMusicList>
    </div>
</template>
<script>
import Title from "../components/Title";
import NewMusicList from "../components/NewMusicList"
import Loading from "../components/Loading"
export default {
    name:"Recommend",
    data(){
        return {
            recommendMusicList:[],
            newMusicData:[],
        }
    },
    components:{
        Title,
        NewMusicList,
        Loading
    },
    methods:{
        getInto(rem){
            this.$router.push({path:'/recommendMusicList',query:{rem}});
        }
    },
    beforeRouteEnter(to,from,next){
        next(vm=>{
            vm.$axios.get("/personalized?limit=6").then(data=>{
                vm.recommendMusicList = data.data.result;
            }).catch(()=>{})
            vm.$axios.get("/personalized/newsong").then(data=>{
                vm.newMusicData = data.data.result;
                // console.log(vm.newMusicData);
            }).catch(()=>{})
        })
    },
    filters:{
        format(v){
            return (v/10000).toFixed(1)+"万"
        }
    },
}
</script>
<style lang="less" scoped>
    .recommend{
        margin-bottom: 79px;
        box-sizing: border-box;
        ul{
            display:flex;
            flex-wrap: wrap;
            justify-content: space-between;
            li{
                width: 32%;
                margin-bottom:20px;
                div{
                    position:relative;
                    img{
                        width: 100%;
                        display:block;
                        height:auto;
                    }
                    span.bb{
                        font-size: 12px;
                        position:absolute;
                        top:2px;
                        right:3px;
                        color:rgb(250, 248, 248);
                        text-shadow:1px 1px 5px rgba(0,0,0,.5);
                        display:flex;
                        &::before{
                            content:"";
                            display:inline-block;
                            width: 20px;
                            height: 20px;
                            vertical-align: middle;
                            margin-right:-6px;
                            background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+) no-repeat 0px 0px/12px 12px;
                        }
                    }
                    
                }
                p{
                    width: 100%;
                    font-size: 13px;
                    padding:6px 2px 0px 6px;
                    word-break:break-all;
                    display:-webkit-box;
                    -webkit-line-clamp:2;
                    -webkit-box-orient:vertical;
                    overflow:hidden;
                    text-align:left;
                }
            }
        }
    }
</style>