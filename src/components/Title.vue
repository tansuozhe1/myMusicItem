<template>
    <h2 class="title"><slot></slot></h2>
</template>
<script>
export default {
    name:"Title",
}
</script>
<style lang="less" scoped>
    .title{
        color:#000;
        text-align:left;
        padding-left:10px;
        margin:10px 0px;
        border-left:2px solid red;
    }
</style>