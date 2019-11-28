<template>
  <div class="add-student">
    <form action>
      <div>
        <label for="stuName">姓名</label>
        <input type="text" id="stuName" v-model="stu.name"/>
      </div>
      <div class="sex">
        <label for="stuSex">性别</label>
        <input type="radio" name="sex" id="stuSex" v-model="stu.sex" value="0" checked/>
        <span>男</span>    
        <input type="radio" name="sex" id="stuSex" v-model="stu.sex" value="1"/>
        <span>女</span>    
      </div>
      <div>
        <label for="stuNum">学号</label>
        <input type="text" id="stuNum" v-model="stu.sNo"/>
      </div>
      <div>
        <label for="stuEmail">邮箱</label>
        <input type="text" id="stuEmail" v-model="stu.email"/>
      </div>
      <div>
        <label for="stuBirth">出生年</label>
        <input type="text" id="stuBirth" v-model="stu.birth"/>
      </div>
      <div>
        <label for="stuPhone">手机号</label>
        <input type="text" id="stuPhone" v-model="stu.phone"/>
      </div>
      <div>
        <label for="stuHome">住址</label>
        <input type="text" id="stuHome" v-model="stu.address"/>
      </div>
      <div>
          <label for=""></label>
          <input type="button" value="提交" @click="submit">
          <input type="button" value="重置" @click="reset">
      </div>
    </form>
  </div>
</template>

<script>
// 引入请求接口api
import api from '../api/index.js';
export default {
  data() {
    return {
      stu: {
        sNo: '',
        name: '',
        sex: 0,//0默认代表 男
        birth: '',
        phone: '',
        address: '',
        email: ''
      },
    }
  },
  methods:{
    // 提交
    submit() {
      api.addStudent(this.stu)
          .then(res => {
            // 添加学生成功
            if(res.data.status == 'success'){
              // 1.调用$toast方法弹出框,展示消息
              this.$toast({type:'success',msg: res.data.msg})
              // 2.重新从第一页获取学生数据
              this.$store.dispatch('getStuList',1)
                      .then( _ => {
                        // 3.路由跳转到学生列表页
                        this.$router.push('/studentList')
                        // 4.提交表单置空
                        this.reset();
                      })
              
            }else{
              this.$toast({type: 'fail',msg: res.data.msg})
            }
          })
    },

    // 重置
    reset() {
      // 重置时,所有数据清空
      this.stu = {
        sNo: '',
        name: '',
        sex: 0,//0默认代表 男
        birth: '',
        phone: '',
        address: '',
        email: ''
      }
    }
  }
}
</script>

<style scoped>
    body {
    position: relative;
    }
    .add-student {
    width: calc(100% - 200px);
    height: calc(100% - 70px);
    background-color: #eee;
    position: absolute;
    top: 70px;
    left: 200px;
    }
    .add-student form{
        width: 400px;
        /* height: 260px; */
        /* background-color: red; */
        margin: 0 auto;
        margin-top: 50px;
    }
    .add-student form div{
        margin: 10px 0px;
    }
    .add-student form div label{
        display: inline-block;
        text-align: right;
        width: 80px;
        height: 20px;
        /* background-color: blue; */
        padding: 3px 0px;
        line-height: 20px;
        margin-right: 10px;
    }
    .add-student form div:not(.sex) input{
        width: 200px;
        height: 20px;
        background-color: #fff;
        background-origin: none;
        padding: 1px 0px;
        color: #354457;
    }
    .add-student form div.sex input{
        font-size: 14px;
    }
    .add-student form div.sex span:nth-of-type(1){
        margin-right: 30px;
    }
    .add-student form div:last-of-type input{
        width: 97px;
        height: 30px;
        border: 1px solid #ccc;
        outline: none;
        background-color: #ddd;
        color: #354457;
        font-size: 16px;
        padding: 10px 0px;
        line-height: 10px;
        cursor: pointer;
    }
    .add-student form div:last-of-type input:nth-of-type(1){
        margin-right: 10px;
    }

</style>
        