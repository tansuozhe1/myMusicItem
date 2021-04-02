<template>
  <div class="SearchList">
    <div class="seek">搜索"{{ iptData }}"</div>
    <ul>
      <li v-for="v in classifyData" :key="v.id" @click="clicks($event,v.name)">
        <div class="fdj"></div>
        <div class="content">
            {{v|formatType}}{{v.name}}
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "SearchList",
  props: {
    classifyData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    iptData: String,
  },
  data(){
      return {
          num:0
      }
  },
  methods:{
      clicks(e,names){
          let text = e.target.parentNode.children[1].textContent;
          if(text.includes("歌手")){
              this.num = 100;
          }else if(text.includes("歌曲")){
              this.num = 1;
          }else if(text.includes("专辑")){
              this.num = 10;
          }
          this.$emit("findreturn",names+"&type="+this.num)
      }
  },
  filters: {
    formatType(v) {
      if (typeof v.artists != "undefined") {
        return "歌曲:";
      } else if (typeof v.artist != "undefined") {
        return "专辑:";
      } else {
        return "歌手:";
      }
    },
  },
};
</script>
<style lang="less" scoped>
.SearchList {
    .seek {
    line-height: 50px;
    border-bottom: 1px solid #eee;
    text-align: left;
    padding-left: 10px;
    color: rgb(7, 113, 235);
    }
    ul{
        li{
            display: flex;
            padding-left:5px;
            height:50px;
            align-items:center;
            div.fdj{
                width: 20px;
                height: 20px;
                background:url(../assets/fdj.svg) no-repeat 0px 0px/20px 20px;
            }
            div.content{
                display:flex;
                align-items: center;
                flex:1;
                border-bottom:1px solid #eee;
                text-align:left;
                padding-left:5px;
                height:100%;
            }
        }
    }
}
</style>