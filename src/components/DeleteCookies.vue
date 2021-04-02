<template>
  <div class="deleteCookies">
    <div class="text">搜索历史：</div>
    <van-cell :title="val" icon="search" v-for='(val,i) in searchHistory' :key="i">
      <template #right-icon>
        <van-icon name="cross" class="cross-icon" @click='deleteSearchHistory(i)'/>
      </template>
    </van-cell>

    
  </div>
</template>

<script>
export default {
  name: "DeleteCookies",
  props:{
      searchHistory:{
          type:Array,
          default(){
              return [];
          }
      }
  },
  methods:{
      deleteSearchHistory(i){
          this.searchHistory.splice(i,1);
      }
  }
  
};
</script>

<style lang="less" scoped>
.deleteCookies{
    .text{
        text-align: left;
        color:#aaa;
        margin-top:20px;
        margin-left:10px;
    }
    /deep/ .van-cell{
        border-bottom:1px solid #ccc;
    }
    /deep/ .van-cell__title, .van-cell__value{
        text-align: left;
        margin-left:5px;
        font-size: 16px;
    }
    /deep/ .van-cell__left-icon, .van-cell__right-icon{
        font-size: 20px;
    }
    /deep/ .van-icon{
        font-size: 20px;
    }
}
</style>