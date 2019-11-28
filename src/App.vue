<template>
  <div id="app">
      <!-- 头部组件 -->
      <header-content></header-content>

      <!-- 左侧组件 -->
      <left-content></left-content>

      <!-- 右侧组件,以路由跳转形式出现 -->
      <div class="right-content">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
import headerContent from './components/headerContent.vue'//引入header组件
import leftContent from './components/leftContent.vue'//引入left部分组件

export default {
  components:{
    headerContent,
    leftContent
  }
}
</script>

<style>
  *{
    margin: 0;;
    padding: 0;
    list-style: none;
    text-decoration: none;
  }
  html,body{
    height: 100%;
    width: 100%;
  }
  #app{
    width:100%;
    height: 100%;
  }
</style>

