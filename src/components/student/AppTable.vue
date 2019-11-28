<template>
  <!-- 学生展示 -->
  <div class="showStu">
    <table border="0">
      <thead>
        <tr>
          <th>学号</th>
          <th>姓名</th>
          <th>性别</th>
          <th>邮箱</th>
          <th>年龄</th>
          <th>手机号</th>
          <th>住址</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in stuList" :key="index">
          <td>{{item.sNo}}</td>
          <td>{{item.name}}</td>
          <td>{{item.sex == 0 ? '男' : '女'}}</td>
          <td>{{item.email}}</td>
          <td>{{new Date().getFullYear() - item.birth}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.address}}</td>
          <td>
            <button class="edit" @click="edit(item)">编辑</button>
            <button class="remove" @click="del(item.sNo)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.showStu {
  width: 100%;
}
.showStu table {
  width: 100%;
  text-align: center;
  line-height: 40px;
}
.showStu table thead tr {
  height: 40px;
  padding: 10px 0;
  background-color: #e3e8ee;
}
.showStu table thead tr th {
  min-width: 150px;
}
.showStu table tbody tr {
  height: 40px;
  padding: 10px 0;
  background-color: #fff;
  color: #354457;
  font-size: 14px;
}
.showStu table tbody tr td {
  min-width: 150px;
}
.showStu table tbody tr td button.edit {
  width: 48px;
  height: 28px;
  border: none;
  outline: none;
  background-color: #5cb85c;
  color: #fff;
  margin-right: 10px;
}
.showStu table tbody tr td button.edit:hover {
  background-color: #398439;
  cursor: pointer;
}
.showStu table tbody tr td button.remove {
  width: 48px;
  height: 28px;
  border: none;
  outline: none;
  background-color: #d9534f;
  color: #fff;
}
.showStu table tbody tr td button.remove:hover {
  background-color: #c9302c;
  cursor: pointer;
}
</style>

<script>
import {mapState,mapMutations,mapActions} from 'vuex';//引入mapState和mapMutations
export default {
  computed:{
    ...mapState(['stuList']),//引入store里面的state的数据
  },

  methods:{
    ...mapMutations(['setEditStu','setModalStatus']),//使用mutations的函数
    ...mapActions(['delBySno']),//获取删除学生信息的函数
    // ...mapActions(['getStuList']),//引入异步执行的getStuList方法,commit一个mutations方法setStuList,从而改变state里面的数据
    edit(item) {
      this.setEditStu(item)//将点击编辑的对象传递给state
      this.setModalStatus(true)//点击之后设置为true,将modal显示出来
    },

    del(data){
      this.delBySno(data)
          .then(res => {
              this.$toast({type:'success',msg:res})
          })
    }
  },

}
</script>