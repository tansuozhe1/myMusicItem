<template>
  <div class="Hot">
    <div class="bg">
      <div class="box">
        <div></div>
        <div>更新日期： {{ +updateTime | formatDate }}</div>
      </div>
    </div>
    <Loading v-if="musicData.length <= 0"></Loading>
    <ul class="hotMusicList">
      <MusicList v-for="(v, i) in musicData" :key="v.id" :v="v" :index='i' @transmitIndex='getIndex'>
        <div class="rank">{{ (i + 1) | formatNum }}</div>
      </MusicList>
    </ul>
    <span @click="loadMore">~加载更多~</span>
  </div>
</template>
<script>
import MusicList from "../components/Music_list";
import Loading from "../components/Loading";
export default {
  name: "Hot",
  data() {
    return {
      updateTime: "",
      musicData: [],
      num: 0,
    };
  },
  components: {
    MusicList,
    Loading,
  },
  methods: {
    getHotMusic(vm) {
      vm.num++;
      let musicId = [];
      vm.$axios
        .get("/top/list?idx=1")
        .then((data) => {
          this.updateTime = data.data.playlist.updateTime;
          musicId = data.data.playlist.trackIds.slice(
            20 * (vm.num - 1),
            20 * vm.num
          );
        })
        .then(() => {
          for (let v of musicId) {
            vm.$axios.get("song/detail?ids=" + v.id).then((data) => {
              vm.musicData.push({
                name: data.data.songs[0].name,
                id: data.data.songs[0].id,
                song: {
                  artists: data.data.songs[0].ar,
                  album: data.data.songs[0].al,
                  privilege:{
                    maxbr:data.data.privileges[0].maxbr
                  }
                },
              });
            });
          }
        })

    },

    // 存储整个数组到全局变量中
    getIndex(){
      this.$root.globalData.musicData = this.musicData;
    },
    loadMore(){
      this.getHotMusic(this);
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.musicData = [];
      vm.getHotMusic(vm);
    });
  },
  filters: {
    formatDate(v) {
      let now = new Date(v);
      let month = now.getMonth() + 1;
      let date = now.getDate();
      let Mstr = month < 10 ? "0" + month : month;
      let Dstr = date < 10 ? "0" + date : date;
      return Mstr + "月" + Dstr + "天";
    },
    formatNum(v) {
      return v < 10 ? "0" + v : v;
    },
  },
};
</script>
<style lang="less" scoped>
.Hot {
  margin-bottom:80px;
  .bg {
    width: 100%;
    height: 146px;
    background: url(../assets/hot.jpg) no-repeat 0px 0px/100% 146px;
    div.box {
      padding-left: 20px;
      padding-top: 20px;
      div {
        &:first-of-type {
          width: 145px;
          height: 70px;
          background: url(../assets/icon.png) no-repeat -22px -30px/166px 97px;
        }
        &:last-of-type {
          text-align: left;
          padding-top: 10px;
          color: white;
          font-size: 12px;
        }
      }
    }
  }
  ul {
    margin-bottom:10px;
    li {
      div.rank {
        width: 20px;
        line-height: 20px;
        text-align: center;
        margin-right: 5px;
      }
      &:first-of-type,
      &:nth-of-type(2),
      &:nth-of-type(3) {
        div.rank {
          color: red;
        }
      }
    }
  }
  span{
    padding-bottom:10px;
  }
}
</style>