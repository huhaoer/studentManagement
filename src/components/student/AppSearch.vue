<template>
  <!-- 搜索学生 -->
  <div class="searchStu">
    <span>关键字搜索:</span>
    <input type="text" v-model="keyWord"/>
    <button @click="search">搜索</button>
  </div>
</template>

// 按照搜索的关键字进行查询并分页
<script>
export default {
  data() {
    return {
      keyWord: '',//保存搜索框传递的搜索关键字
    }
  },

  methods:{
    search() {
      this.$store.dispatch('getStuList',1);
    }
  },

  // 监听关键字的改变,并保存到state里面
  watch:{
    keyWord() {
      this.$store.commit('setKeyWord',this.keyWord)
    }
  }
}
</script>

<style scoped>
.searchStu {
  height: 60px;
  line-height: 60px;
  padding-left: 30px;
}
.searchStu span {
  color: #646987;
  font-size: 16px;
  font-weight: bold;
}
.searchStu input {
  width: 200px;
  height: 30px;
  border: none;
  outline: none;
  color: #ccc;
  margin-left: 5px;
}
.searchStu button {
  width: 50px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border: none;
  outline: none;
  color: #fff;
  background-color: #354457;
  font-size: 16px;
  cursor: pointer;
  margin-left: 5px;
}
</style>