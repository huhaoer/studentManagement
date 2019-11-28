<template>
  <div class="left-content">
    <dl>
      <dt>学生管理</dt>
      <router-link tag="dd" to="/studentList">学生列表</router-link>
      <router-link tag="dd" to="/addStudent">新增学生</router-link>
    </dl>
  </div>
</template>

<style scoped>
    .left-content {
    width: 200px;
    height: calc(100% - 70px);
    background-color: #4d5e70;
    }
    .left-content dl{
        width: 100%;
    }
    .left-content dl dt{
        width: 100%;
        height: 40px;
        color: #b3bcc5;
        font-size: 14px;
        font-weight: bold;
        line-height: 40px;
        padding: 0 0 0 8px;
    }
    .left-content dl dd{
        width: 100%;
        height: 40px;
        color: #b3bcc5;
        font-size: 14px;
        line-height: 40px;
        padding: 0 0 0 30px;
        box-sizing: border-box;
        cursor: pointer;
    }
    .left-content dl dd:hover{
        background-color: rgba(255, 255, 255, 0.5);
        color: #354457;
    }
    .left-content dl dd.active{
        width: 100%;
        height: 40px;
        color: #354457;
        background-color: #ddd;
    }
</style>