<template>
    <ul class="topnav">
        <li>
            <router-link to="/">推荐音乐</router-link>
        </li>
        <li>
            <router-link to="/hot">热歌榜</router-link>
        </li>
        <li>
            <router-link to="/search">搜索</router-link>
        </li>
    </ul>
</template>
<script>
export default {
    name:"Topnav"
}
</script>
<style lang="less" scoped>
    .topnav{
        display:flex;
        border-bottom:1px solid #ddd;
        li{
            flex:1 1 auto;
            line-height: 40px;
            a{
                display: inline-block;
                font-size: 15px;
                text-decoration: none;
                color:#000;
                &.router-link-exact-active{
                    border-bottom:2px solid red;
                    color:red;
                }
            }
        }
    }
</style>