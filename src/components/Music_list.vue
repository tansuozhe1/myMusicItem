<template>
  <li @click="submitId" ref="li" :data-nums="v.id">
    <slot></slot>
    <div class="left">
      <div>{{ v.name }}</div>
      <p>
        <span class="icon" v-if="v.song.privilege.maxbr >320000"></span
        ><span class="first">{{ v.song.artists[0].name }}</span
        ><span v-if="v.song.artists.length == 2" class="second">{{
          "/" + " " + v.song.artists[1].name
        }}</span
        >-<span class="last">{{ v.song.album.name }}</span>
      </p>
    </div>
    <div class="right">
      <span></span>
    </div>
  </li>
</template>
<script>
export default {
  name: "MusicList",
  props: ["v",'index'],
  methods:{
    submitId(){
      this.$root.globalData.musicId = this.v.id;
      this.$root.globalData.musicInfo = this.v;
      this.$root.globalData.currentMusicIndex = this.index ;
      // console.log(this.$root.globalData.currentMusicIndex);
      this.$emit('transmitIndex')
    }
  }
};
</script>
<style lang="less" scoped>
li {
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
</style>