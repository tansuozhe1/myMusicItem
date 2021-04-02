<template>
    <div class="loading">
        <ul>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
</template>
<script>
export default {
    name:"Loading"
}
</script>
<style lang="less" scoped>
    .loading{
        height:20vh;
        display:flex;
        justify-content: center;
        align-items:center;
        ul{
            display:flex;
            width: 30px;
            height: 30px;
            justify-content: space-between;
            li{
                width: 6px;
                height: 30px;
                background:red;
                transform-origin: center bottom;
                animation:loading 0.5s linear -0.3s infinite alternate-reverse;
                &:first-of-type{
                    animation-delay: -.5s;
                }
                &:last-of-type{
                    animation-delay: -.1s;
                }
            }
        }
    }
    @keyframes loading{
        0%{
            transform:scaleY(0.2);
        }
        100%{
            transform:scaleY(1);
        }
    }
</style>