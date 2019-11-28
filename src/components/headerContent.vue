<template>
  <div class="header">
    <div class="box">
      <img src="../assets/logo.png" alt />
      <span>管理系统</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
  width: 100%;
  height: 70px;
  background-color: #354457;
  color: #b3bcc5;
}
.box{
    width: 200px;
    height: 100%;
    /* background-color: red; */
    margin-left: 20px;
    /* text-align: center; */
    line-height: 70px;
}
.box img {
  width: 30px;
  height: 30px;
  vertical-align: middle;
  margin-right: 10px;
}
.box span {
  font-size: 14px;
}
</style>

