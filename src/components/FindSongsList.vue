<template>
    <div class="findsongslist">
        <li v-if="item.num==1" class="songs" @click="submitMusicId">
            <div class="left">
                <div>{{ item.name }}</div>
                <p>
                    <span class="first">{{ item.artists[0].name }}</span
                    ><span v-if="item.artists.length == 2" class="second">{{
                    "/" + " " + item.artists[1].name
                    }}</span>
                    -<span class="last">{{ item.album }}</span>
                </p>
            </div>
            <div class="right">
                <span></span>
            </div>
        </li>
        <router-link tag="li" to="/" class="album" v-if="item.num==2">
            <div class="left">
                <img :src="item.picUrl" alt="">
            </div>
            <div class="right">
                <div class="names">{{item.name}}</div>
                <div class="singer">
                    <span class="first">{{ item.artists[0].name }}</span
                    ><span v-if="item.artists.length == 2" class="second">{{
                    "/" + " " + item.artists[1].name
                    }}</span>
                </div>
            </div>
            <div class="icon"></div>
        </router-link>
        <li class="artists" v-if="item.num==3" @click="showMask">
            <div class="pic">
                <img :src="item.picUrl" alt="">
            </div>
            <div class="names">{{item.name}}</div>
            <div class="icon"></div>
        </li>
        <div class="mask" v-show="isMaskShow" >
            <div class="back" @click="back"></div>
            <div class="info">热门50首</div>
            <ul>
                <li v-for="(v,i) in formatData" :key="i+1" @click="submitId(v.id)">
                    <div class="rank">{{(i+1)|formatNum}}</div>
                    <div class="picture">
                        <img :src="v.picUrl" alt="">
                    </div>
                    <div class="tone" v-show="v.sq > 320000"></div>
                    <div class="names">{{v.name}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  name: "Findsongslist",
  props: ["item"],
  data(){
      return {
          isMaskShow:false,
          formatData:[
              {
                  name:"",
                  picUrl:"",
                  sq:0
              }
          ]
      }
  },
  methods:{
      submitId(id){
          this.$root.globalData.musicId = id;
      },
      submitMusicId(){
          this.$root.globalData.musicId = this.item.id;
          this.$root.globalData.musicInfo = this.item;
      },
      showMask(){
          this.isMaskShow = true;
          this.$axios.get("/artists?id="+this.item.id).then(data=>{
              if(data.request.status == 200){
                  let formatArr = data.data.hotSongs;
                //   console.log(formatArr);
                  this.formatData = formatArr.map(val=>{
                      return {
                          picUrl:val.al.picUrl,
                          name:val.name,
                          sq:val.privilege.playMaxbr,
                          id:val.id
                      }
                  })

              }
          })
      },
      back(){
          this.isMaskShow = false;
      }
  },
  filters:{
      formatNum(v){
          return v < 10 ? "0"+v : v;
      }
  },
  created() {
    
  },
};
</script>
<style lang="less" scoped>
.findsongslist{
     &:last-of-type{
        margin-bottom:79px;
    }
    li.songs {
      display: flex;
      height: 55px;
      text-align: left;
      align-items: center;
      padding-left: 10px;
      border-bottom: 1px solid #ccc;
      .left {
        flex: 1;
        div {
          font-size: 17px;
        }
        p {
          font-size: 12px;
          display: flex;
          align-items: center;
          margin-top: 5px;
          color: rgba(0, 0, 0, 0.5);
          .icon {
            display: inline-block;
            margin-right: 5px;
            width: 18px;
            height: 12px;
            background: url(../assets/icon.png) no-repeat -3px -2px;
          }
          .first {
            margin-right: 3px;
          }
          .second {
            margin-right: 3px;
          }
          .last {
            margin-left: 3px;
          }
        }
      }
      .right {
        width: 40px;
        height: 55px;
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
    li.album{
        display: flex;
        height: 55px;
        text-align: left;
        align-items: center;
        padding-left: 10px;
        border-bottom: 1px solid #ccc;
        div.left{
            width: 40px;
            height: 40px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        div.right{
            flex:1;
            padding-left:10px;
            div.names{
                height: 50%;
                font-size: 18px;
                color:rgb(27, 250, 7);
                margin-bottom:10px;
            }
            div.singer{
                font-size: 14px;
                color:#aaa;
            }
        }
        div.icon{
            width: 20px;
            height: 100%;
            margin-right:10px;
            background:url(../assets/fdj.svg) no-repeat 0px 18px/20px 20px;
        }
       
    }
    li.artists{
        display: flex;
        height: 55px;
        text-align: left;
        align-items: center;
        padding-left: 10px;
        border-bottom: 1px solid #ccc;
        div.pic{
            width: 40px;
            height: 40px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        div.names{
            padding-left:10px;
            flex:1;
        }
        div.icon{
            width: 40px;
            height: 100%;
            background:url(../assets/fdj.svg) no-repeat 10px 18px/20px 20px;
        }
    }
    div.mask{
        width:100vw;
        height:100vh;
        box-sizing: border-box;
        background:rgb(197, 194, 194);
        position:fixed;
        left:0px;
        top:0px;
        div.back{
            margin-left:10px;
            margin-top:10px;
            width: 30px;
            height: 30px;
            background:url(../assets/back.png) no-repeat 0px 0px/30px 30px;
        }
        div.info{
            margin-top:10px;
            margin-bottom:10px;
            margin-left:10px;
            font-size: 24px;
            font-weight: bold;
        }
        ul{
            height:80vh;
            margin-left:20px;
            overflow-y:scroll;
            li{
                display:flex;
                justify-content: flex-start;
                align-items: center;
                height: 50px;
                color:rgba(0,0,0,.7);
                div.rank{
                    width: 20px;
                    height: 20px;
                    font-size: 18px;
                    margin-right:10px;
                    color:rgba(0, 0, 0, 0.3);
                }
                div.picture{
                    width: 30px;
                    height: 30px;
                    margin-right:10px;
                    img{
                        display:block;
                        width: 30px;
                        height:auto;
                    }
                }
                div.tone{
                    display: inline-block;
                    width: 18px;
                    height: 12px;
                    background: url(../assets/icon.png) no-repeat -3px -2px;
                    margin-right:5px;
                }
                div.names{
                    font-size: 18px;
                }

            }
        }
    }
}
</style>