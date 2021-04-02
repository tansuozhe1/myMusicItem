<template>
    <div class="artistDetail">
        <div class="info">热门歌曲</div>
    </div>
</template>
<script>
export default {
    name:"ArtistDetail",
    data(){
        return {
            id:0,
        }
    },
    beforeRouteEnter(to,from,next){
        next(vm=>{
            vm.id = vm.$route.query.id;
            console.log(vm.id);
        })
    }
}
</script>