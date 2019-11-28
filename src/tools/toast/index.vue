<template>
    <div class="notify" :class="{fadeIn: showNotify,fadeOut: !showNotify}" v-if="exit">
        <div v-if="type == 'success'" style="background:lime;color:#fff">√{{ msg }}</div>
        <div v-else-if="type == 'fail'" style="background:red;color:#fff">×{{ msg }}</div>
        <div v-else-if="type == 'info'" style="background:yellow;color:#fff">⚠{{ msg }}</div>
        <div v-else>📍未知请求</div>
    </div>
</template>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .notify{
        width: 200px;
        height: 40px;
        background-color: lime;
        color: #fff;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
        border-radius: 3px;
        position: fixed;
        top: 10%;
        left: calc(50% - 100px);
    }
    .fadeIn{
        animation: fade_in 0.7s;
    }
    .fadeOut{
        animation: fade_out 0.7s;
    }
    /* 展示弹框动画 */
    @keyframes fade_in{
        0%{
            top:0;
            opacity:0;
        }
        100%{
            top:10%;
            opacity:1;
        }
    }
    /* 隐藏弹窗动画 */
    @keyframes fade_out{
        0%{
            top: 10%;
            opacity: 1;
        }
        100%{
            top: 0;
            opacity: 0;
        }
    }
</style>