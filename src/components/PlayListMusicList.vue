<template>
    <div class="playListMusicList">
        <div class="singList" v-for="(val,i) in musicList" :key="i" @click="submitId(i)">
            <div class="itemLeft">{{i+1}}</div>
            <div class="itemRight">
                <div class="leftBox">
                    <div class="top">{{val.singName}}</div>
                    <div class="bottom">{{val.singAuthor.join('/')}}</div>
                </div>
                <div class="rightBox">
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'PlayListMusicList',
        props:{
            musicList:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        methods:{
            submitId(i){
                this.$root.globalData.musicId = this.musicList[i].singId;
            }
        }
    }
</script>

<style lang="less" scoped>
.playListMusicList{
    .singList{
        display: flex;
        .itemLeft{
            width: 40px;
            height: 60px;
            text-align: center;
            line-height: 60px;
        }
        .itemRight{
            flex:1;
            border-bottom:1px solid #ccc;
            display: flex;
            .leftBox{
                flex:1;
                .top{
                    height: 35px;
                    line-height: 35px;
                    width: 100%;
                    text-align: left;
                    color:black;
                    font-size: 16px;
                }
                .bottom{
                    width: 100%;
                    height:25px;
                    line-height:25px;
                    text-align: left;
                    color:#535353e8;
                    font-size: 12px;
                }
            }
            .rightBox{
                width: 40px;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                span {
                    display: inline-block;
                    width: 22px;
                    height: 22px;
                    background: url(../assets/icon.png) no-repeat -24px 0px/166px 97px;
                }
            }

        }

        &:last-of-type{
            margin-bottom:82px;
        }
    }
}
</style>