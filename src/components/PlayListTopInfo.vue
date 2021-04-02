<template>
  <div class="playListTopInfo">
    <div class="bgBox" v-if="isShowBgBox">
      <div class="bgImg">
        <img :src="playListData.bgImg" alt="" />
      </div>
      <div class="img">
        <img :src="playListData.bgImg" alt="" />
        <span class="bb">{{ playListData.playCount | format }}</span>
      </div>
      <div class="desc">
        <div class="text">{{ playListData.title }}</div>
        <div class="author">
          <div class="authorImg">
            <img :src="playListData.authorImg" alt="" />
          </div>
          <span>{{ playListData.authorName }}</span>
        </div>
      </div>
    </div>
    <Loading v-if="isShowLoading"></Loading>
  </div>
</template>

<script>
import Loading from "../components/Loading";

export default {
  name: "PlayListTopInfo",
  data() {
    return {
      isShowLoading:true,
      isShowBgBox:false,
    };
  },
  props: {
    playListData: {
      type: Object,
      default(){
          return {
            bgImg: "",
            authorImg: "",
            playCount: 0,
            authorName: "",
            title: "",
            musicList:[]
        }
      }
    },
  },
  created(){
    this.isShowLoading = false;
    this.isShowBgBox = true;
  },
//   activated(){
//       console.log(this.playListData);
//     this.getPlayListData();
//   },
  
  components:{
      Loading
  },
  filters: {
    format(v) {
      return (v / 10000).toFixed(1) + "万";
    },
  },
};
</script>

<style lang="less" scoped>
.playListTopInfo {
  .bgBox{
      width: 100%;
      height: 200px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: relative;
    
      .bgImg {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: -1;
        img {
          filter: blur(20px);
          transform: scale(2);
        }
      }
      .img {
        width: 150px;
        height: 150px;
        position: relative;
        border: 1px solid #666;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
        span.bb {
          font-size: 12px;
          position: absolute;
          top: 2px;
          right: 3px;
          color: rgb(250, 248, 248);
          text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
          display: flex;
          &::before {
            content: "";
            display: inline-block;
            width: 20px;
            height: 20px;
            vertical-align: middle;
            margin-right: -6px;
            background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+)
              no-repeat 0px 0px/12px 12px;
          }
        }
      }
      .desc {
        width: 50%;
        height: 150px;
        .text {
          width: 100%;
          color: white;
          font-size: 20px;
        }
        .author {
          margin-top: 30px;
          display: flex;
          align-items: center;
          .authorImg {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            img {
              display: block;
              width: 40px;
              height: 40px;
            }
          }
          span {
            font-size: 16px;
            color: white;
            margin-left: 10px;
          }
        }
      }

  }
}
</style>