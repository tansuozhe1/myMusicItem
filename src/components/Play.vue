<template>
  <div class="playInterface" v-show="isShow">
    <!-- 播放区 -->
    <div class="play">
      <audio
        ref="player"
        @timeupdate="progress"
        autoplay
        :src="`https://music.163.com/song/media/outer/url?id=${currentMusicId}.mp3`"
      ></audio>

      <!-- 自定义播放器 -->
      <div class="controls">
        <!-- 歌曲信息--头像歌名、歌手、专辑 -->
        <div class="info" @click="allScreen">
          <div class="img">
            <img :src="song.picUrl" alt="" ref="img" />
          </div>
          <div class="artistData">
            <div class="right">
              <div class="names">{{ song.name }}</div>
              <span class="artist" v-for="(v, i) in song.artists" :key="v.id"
                >{{ v.name
                }}<span v-if="i == song.artists.length - 1 ? false : true">
                  /
                </span></span
              >
            </div>
          </div>
        </div>

        <!-- 按钮区--开始、暂停 -->
        <div class="button">
          <div class="btn">
            <span @click="playPreMusic"></span>
            <span>
              <img
                :src="stopImgSrc"
                alt=""
                @click.stop="status"
                ref="beginPic"
              />
            </span>
            <span @click='playNextMusic'></span>
          </div>

          <!-- 播放条 -->
          <div class="playbar">
            <div class="father" ref="father">
              <div class="mask" @click.stop="changeWidth" ref="mask"></div>
              <div ref="son" class="son"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 全屏显示 -->
    <div class="fullScreen" v-show="isFull">
      <!-- 背景图模糊化 -->
      <div class="bgImg">
        <img :src="song.picUrl" alt="" />
      </div>
      <!-- 歌曲信息 -->
      <div class="info">
        <div class="names">
          {{ song.name }}
        </div>
        <span class="artist">歌手：</span>
        <span class="first">{{ song.artists[0].name }}</span>
        <span class="second" v-if="song.artists.length == 2">{{
          "/" + " " + song.artists[1].name
        }}</span>
      </div>
      <!-- 缩小按钮 -->
      <div class="shrink" @click="isFull = false">
        <img src="../assets/back2.png" alt="" />
      </div>
      <!-- 图片 -->
      <div class="picture">
        <div class="wrap">
          <img :src="song.picUrl" ref="fullShowImg" alt="" />
        </div>
      </div>
      <!-- 歌词 -->
      <div class="lyric">
        <ul ref="lyrUl">
          <li
            v-for="(v, i) in lyricList"
            :key="i + 1"
            :class="{ active: num == i }"
          >
            {{ v.lyric }}
          </li>
        </ul>
      </div>

      <!-- 播放控件 -->
      <div class="playControls">
        <!-- 进度条 -->
        <div class="playBarBox">
            <div class="curTime">{{formatCurTime}}</div>
            <div class="playBar" ref='anotherFather'>
                <div class="process" ref='process'></div>
                <div class="masks" @click.stop="changeInnerWidth" ref="masks"></div>
            </div>
            <div class="allTime">{{formatTotalTime}}</div>
        </div>

        <!-- 随机按钮、播放按钮 -->
        <div class="playButtons">
          <div class="playType">
            <div class="playOrder" v-show="playType == 0" @click.stop='switchPlayType(2)'>
              <img src="../assets/playOrder.png" alt="">
            </div>
            <div class="onePlay" v-show="playType == 1" @click.stop='switchPlayType(0)'>
              <img src="../assets/onePlay.png" alt="">
            </div>
            <div class="listPlay" v-show="playType == 2" @click.stop='switchPlayType(3)'>
              <img src="../assets/listPlay.png" alt="">
            </div>
            <div class="randomPlay" v-show="playType == 3" @click.stop='switchPlayType(1)'>
              <img src="../assets/randomPlay.png" alt="">
            </div>
          </div>
          <div class="preMusic" @click.stop="playPreMusic">
            <img src="../assets/preMusic.png" alt="">
          </div>
          <div class="beginStop" @click.stop='switchPlayStatus'>
            <img class="bigImg" src="../assets/beginPlay.png" v-show='!isPlaying' alt="">
            <img class="bigImg" src="../assets/stopPlay.png" v-show='isPlaying' alt="">
          </div>
          <div class="nextMusic" @click.stop="playNextMusic">
            <img src="../assets/nextMusic.png" alt="">
          </div>
          <div class="playList">
            <img src="../assets/playList.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import testLyric from "../../public/testLyric.json";

export default {
  name: "Play",
  props: ["musicId", "currentMusicIndex",'musicData'],
  data() {
    return {
      song: {
        name: null,
        id: "",
        artists: [
          {
            id: "7424",
            name: "程响",
          },
          {
            id: "7425",
            name: "程小响",
          },
        ],
        picUrl: "",
      },
      currentMusicId:0,
      nowTime: 0,
      allTime: 0,
      stopImgSrc: require("../assets/stop.png"),
      beginImgSrc: require("../assets/begin.png"),
      isFull: false,
      isShow: false,
      isPlayCurrentMusic:1,
      nextMusicIndex:0,
      lyricList: [],
      num: 0,
      lastTime:0,
      playType:0,
      isPlaying:true,
    };
  },
  components:{
  },
  methods: {
    progress() {
      let audio = this.$refs.player;
      let fatherWidth = this.$refs.father.offsetWidth;
      let anotherFatherWidth = this.$refs.anotherFather.offsetWidth;
      let son = this.$refs.son;
      let process = this.$refs.process;
      let curTime = audio.currentTime;
      let duraTime = audio.duration;
      this.nowTime = curTime;
      this.allTime = duraTime;
      let progress = (curTime / duraTime) * fatherWidth;
      let anotherProgress = (curTime / duraTime) * anotherFatherWidth;
      son.style.width = progress + "px";
      process.style.width = anotherProgress + "px";
    },
    changeWidth(e) {
      this.$refs.son.style.width = e.offsetX + "px";
      let fatherWidth = e.target.offsetWidth;
      let audio = this.$refs.player;
      audio.currentTime = audio.duration * (e.offsetX / fatherWidth);
    },
    //改变全屏的那个进度条的宽度
    changeInnerWidth(e){
      this.$refs.process.style.width = e.offsetX + "px";
      // console.log(this.$refs.process.style.width);
      let fatherWidth = e.target.offsetWidth;
      let audio = this.$refs.player;
      audio.currentTime = audio.duration * (e.offsetX / fatherWidth);
    },
    status(e) {
      // console.log(this.$root.globalData.playStatus);
      if (this.$root.globalData.playStatus) {
        this.$root.globalData.playStatus = false;
        e.target.src = this.beginImgSrc;
        this.$refs.player.pause();
        this.$refs.img.style.animationPlayState = "paused";
        this.$refs.fullShowImg.style.animationPlayState = "paused";
      } else {
        this.$root.globalData.playStatus = true;
        e.target.src = this.stopImgSrc;
        this.$refs.player.play();
        this.$refs.img.style.animationPlayState = "running";
        this.$refs.fullShowImg.style.animationPlayState = "running";

        this.formatLyric();
      }
    },
    allScreen() {
      this.isFull = true;
    },
    formatLyric() {
      this.$http.defaults.baseURL = "http://music.kele8.cn/";
      this.$axios
        .get("/lyric?id=" + this.currentMusicId)
        .then((data) => {
          let lyric = data.data.lrc.lyric;
          // console.log(lyric);
          let arr = lyric.split("\n");
          let mapLyric = arr.map((val) => {
            let reg = /\[(\d+):(\d+\.\d+)\](.*)/;
            reg.test(val);
            return {
              time: parseInt(RegExp.$1) * 60 + parseFloat(RegExp.$2),
              lyric: RegExp.$3,
            };
          });
          mapLyric.pop();
          this.lyricList = mapLyric;
          // console.log(this.lyricList);
        })
        .catch((err) => {
          console.log(err);
          let lyric = testLyric.lrc.lyric;
          let arr = lyric.split("\n");
          let mapLyric = arr.map((val) => {
            let reg = /\[(\d+):(\d+\.\d+)\](.*)/;
            reg.test(val);
            return {
              time: parseInt(RegExp.$1) * 60 + parseFloat(RegExp.$2),
              lyric: RegExp.$3,
            };
          });
          mapLyric.pop();
          this.lyricList = mapLyric;
        });
      this.$http.defaults.baseURL = "http://musicapi.leanapp.cn/";
      // this.$http.defaults.baseURL="http://168.192.90.2:3000/";
    },
    
    // 播放下一首歌
    playNextMusic(){
      let nowTime = Date.now();
      if(this.lastTime != 0){
        if(nowTime - this.lastTime < 500){
          return false;
        }
      }
      this.lastTime = nowTime;
      this.isPlayCurrentMusic = 2;
      this.judgePlayWhatMusic();
    },

    // 播放上一首歌
    playPreMusic(){
      let nowTime = Date.now();
      if(this.lastTime != 0){
        if(nowTime - this.lastTime < 500){
          return false;
        }
      }
      this.lastTime = nowTime;
      this.isPlayCurrentMusic = 0;
      this.judgePlayWhatMusic();
    },
    // 请求数据播放歌曲
    getDataAndPlay(val){
      this.$http.get("/song/detail?ids=" + val).then((data) => {
        this.$root.globalData.playStatus = true;
        this.$refs.beginPic.src = this.stopImgSrc;
        this.isPlaying = true;
        this.$refs.img.style.animationPlayState = "running";
        this.$refs.fullShowImg.style.animationPlayState = "running";
        this.$refs.player.play();

        this.song = {
          picUrl: data.data.songs[0].al.picUrl,
          id: data.data.songs[0].id,
          name: data.data.songs[0].name,
          artists: data.data.songs[0].ar,
        };
      });

      this.formatLyric();
    },

    // 判断播放那首歌
    judgePlayWhatMusic(){
      if(this.isPlayCurrentMusic == 1){
        this.currentMusicId = this.musicId;
        this.getDataAndPlay(this.currentMusicId);
      }else if(this.isPlayCurrentMusic == 2){
        if(this.nextMusicIndex == this.musicData.length - 1){
          this.nextMusicIndex = 0;
        }else{
          this.nextMusicIndex++;
        }
        this.$root.globalData.currentMusicIndex = this.nextMusicIndex;
        this.currentMusicId = this.musicData[this.nextMusicIndex].id;
        this.getDataAndPlay(this.currentMusicId);
      }else if(this.isPlayCurrentMusic == 0){
        if(this.nextMusicIndex == 0){
          this.nextMusicIndex = this.musicData.length - 1;
        }else{
          this.nextMusicIndex--;
        }
        this.$root.globalData.currentMusicIndex = this.nextMusicIndex;
        this.currentMusicId = this.musicData[this.nextMusicIndex].id;
        this.getDataAndPlay(this.currentMusicId);
      }
    },

    // 全屏下的切换开始/暂停播放
    switchPlayStatus(){
      if (this.$root.globalData.playStatus) {
        this.$root.globalData.playStatus = false;
        this.isPlaying = false;
        this.$refs.beginPic.src = this.beginImgSrc;
        this.$refs.player.pause();
        this.$refs.img.style.animationPlayState = "paused";
        this.$refs.fullShowImg.style.animationPlayState = "paused";
      } else {
        this.$root.globalData.playStatus = true;
        this.isPlaying = true;
        this.$refs.beginPic.src = this.stopImgSrc;
        this.$refs.player.play();
        this.$refs.img.style.animationPlayState = "running";
        this.$refs.fullShowImg.style.animationPlayState = "running";
        this.formatLyric();
      }
    },

    // 全屏下切换播放类型
    switchPlayType(num){
      this.playType = num;
    },

    // 播放完毕隔两秒重新播放
    autoPlay(){
      setTimeout(()=>{
        this.$root.globalData.playStatus = true;
        this.isPlaying = true;
        this.$refs.beginPic.src = this.stopImgSrc;
        this.$refs.player.play();
        this.$refs.img.style.animationPlayState = "running";
        this.$refs.fullShowImg.style.animationPlayState = "running";
        this.formatLyric();
      },2000)
    }
  },
  watch: {
    musicId() {
      this.isShow = true;
      this.isPlayCurrentMusic = 1;
      this.nextMusicIndex = this.currentMusicIndex;
      this.judgePlayWhatMusic();
    },
    nowTime(val) {
      if (val == this.allTime) {
        let mask = this.$refs.mask;
        let audio = this.$refs.player;
        mask.addEventListener("click", function () {
          audio.play();
        });


        this.$root.globalData.playStatus = false;
        this.$refs.beginPic.src = this.beginImgSrc;
        this.isPlaying = false;
        this.$refs.player.pause();
        this.$refs.img.style.animationPlayState = "paused";
        this.$refs.fullShowImg.style.animationPlayState = "paused";

        // 当前歌曲播放完毕后判断是哪种播放类型然后执行相应操作
        if(this.playType == 0){
          if(this.currentMusicIndex < this.musicData.length - 1){
            this.isPlayCurrentMusic = 2;
            this.nextMusicIndex = this.currentMusicIndex;
            setTimeout(()=>{
              this.judgePlayWhatMusic();
            },2000)
          }else{
            return false;
          }
        }else if(this.playType == 1){
          this.$root.globalData.musicId = this.musicId;
          this.autoPlay();
        }else if(this.playType == 2){
          this.isPlayCurrentMusic = 2;
          this.nextMusicIndex = this.currentMusicIndex;
          setTimeout(()=>{
            this.judgePlayWhatMusic();
          },2000)
        }else if(this.playType === 3){
          let random = parseInt(Math.random()*this.musicData.length);
          this.currentMusicId = this.musicData[random].id;
          setTimeout(()=>{
            this.getDataAndPlay(this.currentMusicId);
          },2000)
        }
      }
      for (var i = 0; i < this.lyricList.length; i++) {
        if (i == this.lyricList.length - 1) {
          this.num = i;
          break;
        }

        let prevTime = this.lyricList[i].time;
        let nextTime = this.lyricList[i + 1].time;
        if (val >= prevTime && val < nextTime) {
          this.num = i;
          break;
        }
      }
    },
    num(val) {
      if (val == 0) {
        this.$refs.lyrUl.style.marginTop = "0px";
      } else if (val > 4) {
        this.$refs.lyrUl.style.marginTop = -(val - 4) * 30 + "px";
      }
    },
  },
  created() {
    this.currentMusicId = this.musicId;
  },
  computed:{
    formatCurTime() {
      let minutes = parseInt(this.nowTime / 60);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      let seconds = parseInt(this.nowTime % 60);
      seconds = seconds < 10 ? "0" + seconds : seconds;
      return minutes + ":" + seconds;
    },
    formatTotalTime() {
      let minutes = parseInt(this.allTime / 60);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      let seconds = parseInt(this.allTime % 60);
      seconds = seconds < 10 ? "0" + seconds : seconds;
      return minutes + ":" + seconds;
    },
  },
};
</script>
<style lang="less" scoped>
div.playInterface {
  position: fixed;
  left: 0px;
  bottom: 0px;
  // 播放区样式
  .play {
    width: 100%;
    height: 80px;
    div.controls {
      width: 100%;
      height: 100%;
      background: #ddd;
      align-items: center;
      display: flex;
      justify-content: start;
      padding-left: 5px;
      box-sizing: border-box;
      div.info {
        align-items: center;
        display: flex;
        height: 100%;
        div.img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 50px;
            height: 50px;
            animation: rotation 10s linear infinite;
          }
        }
        div.artistData {
          width: 150px;
          height: 100%;
          margin-left: 10px;
          div.right {
            height: 100%;
            text-align: left;
            div.names {
              height: 50%;
              font-size: 14px;
              margin-top: 10px;
            }
            span.artist {
              text-align: left;
              font-size: 14px;
            }
          }
        }
      }
      div.button {
        flex: 1;
        height: 100%;
        margin-right: 20px;
        margin-top: 8px;
        div.btn {
          display: flex;
          justify-content: space-around;
          span {
            display: inline-block;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-top: 5px;
            &:first-of-type {
              background: url(../assets/prev.png) no-repeat 4px 3px/20px 20px;
            }
            &:nth-of-type(2) {
              text-align: center;
              img {
                width: 20px;
                height: 20px;
                margin-top: 3px;
              }
            }
            &:last-of-type {
              background: url(../assets/next.png) no-repeat 4px 3px/20px 20px;
            }
          }
        }
        div.playbar {
          margin-top: 10px;
          div.father {
            margin: 0px auto;
            width: 150px;
            height: 10px;
            border-radius: 5px;
            position: relative;
            background: grey;
            div.son {
              border-radius: 5px;
              height: 100%;
              position: absolute;
              left: 0px;
              top: 0px;
              background: red !important;
            }
            div.mask {
              width: 150px;
              height: 10px;
              border-radius: 5px;
              background: transparent;
              z-index: 99;
              position: absolute;
              left: 0px;
              top: 0px;
            }
          }
        }
      }
    }
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  // 全屏样式
  .fullScreen {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: fixed;
    left: 0px;
    top: 0px;
    
    // 背景图模糊处理
    .bgImg {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: -1;
        img {
          filter: blur(5px);
          transform: scale(3);
        }
    }

    div.picture {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background: url(../assets/border.png) no-repeat 0px 0px/200px 200px;
      overflow: hidden;
      position: absolute;
      left: 50%;
      top: 70px;
      transform: translateX(-50%);
      div.wrap {
        width: 126px;
        height: 126px;
        border-radius: 50%;
        position: absolute;
        left: 37px;
        top: 37px;
        overflow: hidden;
        img {
          width: 126px;
          height: 126px;
          animation: rotation 10s linear infinite;
        }
      }
    }
    div.shrink {
      position: absolute;
      right: 10px;
      top: 10px;
      box-sizing: border-box;
      img {
        display: block;
        width: auto;
        height: 40px;
      }
    }
    div.info {
      width: 70vw;
      margin-top: 10px;
      margin-left: 50px;
      div.names {
        font-size: 16px;
        margin-bottom: 5px;
        color:#fafafa;
      }
      span {
        font-size: 14px;
        color: #fdfcfc;
        &.artist {
          color: rgb(27, 26, 26);
        }
        &.second {
          margin-left: 3px;
        }
      }
    }
    div.lyric {
      color:#080808;
      width: 95%;
      height: 40vh;
      position: absolute;
      left: 50%;
      bottom: 120px;
      transform: translateX(-50%);
      overflow: hidden;
      // border: 1px solid red;
      overflow-y: scroll;
      ul {
        li {
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          // margin-bottom:5px;
        }
      }
    }
    // 全屏下的播放控件
    .playControls{
        position:absolute;
        left:0px;
        right:0px;
        bottom:20px;
        width: 94%;
        margin:0px auto;
        overflow: hidden;
        // 播放进度
        .playBarBox{
            display: flex;
            width: 100%;
            height: 20px;
            line-height:20px;
            color:#fff;
            justify-content: space-between;
            align-items:center;
            font-size: 14px;
            margin-bottom:10px;
            .curTime{
                width: 42px;
                text-align: left;
            }
            .allTime{
                width: 42px;
                text-align: right;
            }
            .playBar{
                width: 266px;
                height:10px;
                border-radius:10px;
                background:#ccc;
                position:relative;
                .process{
                  height: 100%;
                  background:red;
                  border-radius:10px 0px 0px 10px;
                  position:absolute;
                  left:0px;
                  top:0px;
                }
                .masks{
                   width: 266px;
                    height: 100%;
                    background:transparent;
                    border-radius:10px;
                    position:absolute;
                    left:0px;
                    top:0px;
                }
            }
        }

        // 播放按钮
        .playButtons{
          width: 90%;
          height: 50px;
          margin:0px auto 0px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          img{
            display: block;
            width: 30px;
            height: 30px;
            &.bigImg{
              display: block;
              width: 50px;
              height: 50px;
            }
          }
          
        }
    }
  }
}
.active {
  // background: rgba(0, 0, 0, 0.2);
  color:white;
  font-size: 20px !important;
}
</style>