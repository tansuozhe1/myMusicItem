<template>
  <div class="recommendMusicList">
    <PlayListTopInfo :playListData="playListData"></PlayListTopInfo>
    <div class="musicListBox">歌曲列表</div>
    <PlayListMusicList :musicList='playListData.musicList'>
    </PlayListMusicList>
  </div>
</template>

<script>
import PlayListTopInfo from "../components/PlayListTopInfo";
import PlayListMusicList from "../components/PlayListMusicList";


export default {
  name: "RecommendMusicList",
  data() {
    return {
      playListData: {
        bgImg: "",
        authorImg: "",
        playCount: 0,
        authorName: "",
        title: "",
        musicList:[]
      },
    };
  },
  methods: {
    getPlayListData(id) {
      this.$axios
        .get("/playlist/detail?id=" + id)
        .then((res) => {
          let data = res.data;
        //   console.log(data);
          let formatData = {
            bgImg: data.playlist.coverImgUrl,
            authorImg: data.playlist.creator.avatarUrl,
            playCount: data.playlist.playCount,
            authorName: data.playlist.creator.nickname,
            title: data.playlist.name,
            
          };
          
          let musicList = data.playlist.tracks.reduce((pre,cur)=>{
              let singAuthor = [];
              cur.ar.forEach(v=>{
                  singAuthor.push(v.name);
              })
              return pre.concat({
                  singName:cur.name,
                  singId:cur.id,
                  singPicUrl:cur.al.picUrl,
                  singAuthor,
              })
          },[])
          formatData.musicList = musicList;
          this.playListData = formatData;
        //   console.log(this.playListData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    PlayListTopInfo,
    PlayListMusicList,
  },
  activated() {
    let id = this.$route.query.rem.id;
    this.getPlayListData(id);
  },
};
</script>

<style lang="less" scoped>
.recommendMusicList{
    .musicListBox{
        font-size: 14px;
        color:black;
        background-color:#ccc;
        width: 100%;
        height: 30px;
        line-height:30px;
        text-align: left;
        box-sizing: border-box;
        padding-left: 10px;
    }
}
</style>