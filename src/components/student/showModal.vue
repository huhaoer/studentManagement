<template>
  <div class="modal" id="modal">
    <div class="mask" @click="hideModal"></div>
    <div class="modal-content">
      <h2>编辑信息</h2>
    <form action>
      <div>
        <label for="stuName">姓名</label>
        <!-- 
            :value是回填信息,将state里面保存的当前点击编辑按钮的数据渲染出来,写到modal里面 
            @input是信息改变时提交回去的当前key和value值
        -->
        <input type="text" id="stuName" name="name" :value="editList.name"  @input="edit('name',$event.target.value)" ref="name"/>
      </div>
      <div class="sex">
        <label for="stuSex">性别</label>
        <input type="radio" name="sex" id="stuSex" :checked="editList.sex == 0" value="0" @input="edit('sex',$event.target.value)" ref="sex">
        <span>男</span>    
        <input type="radio" name="sex" id="stuSex" :checked="editList.sex == 1" value="1" @input="edit('sex',$event.target.value)"/>
        <span>女</span>    
      </div>
      <div>
        <label for="stuNum">学号</label>
        <input type="text" id="stuNum" name="sNo" :value="editList.sNo"  readonly @input="edit('sNo',$event.target.value)" ref="sNo"/>
      </div>
      <div>
        <label for="stuEmail">邮箱</label>
        <input type="text" id="stuEmail" name="email" :value="editList.email" @input="edit('email',$event.target.value)" ref="email"/>
      </div>
      <div>
        <label for="stuBirth">出生年</label>
        <input type="text" id="stuBirth" name="birth" :value="editList.birth" @input="edit('birth',$event.target.value)" ref="birth"/>
      </div>
      <div>
        <label for="stuPhone">手机号</label>
        <input type="text" id="stuPhone" name="phone" :value="editList.phone" @input="edit('phone',$event.target.value)" ref="phone"/>
      </div>
      <div>
        <label for="stuHome">住址</label>
        <input type="text" id="stuHome" name="address" :value="editList.address" @input="edit('address',$event.target.value)" ref="address"/>
      </div>
      <div>
          <label for=""></label>
          <input type="button" value="提交" @click="handSubmit">
          <input type="button" value="重置" @click="handReset">
      </div>
    </form>
    </div>
  </div>
</template>

<script>
import {mapMutations,mapState,mapActions} from 'vuex';
export default {
    computed:{
        ...mapState(['editList']),//引入当前编辑按钮对应的数据
    },
    methods:{
        ...mapMutations(['setModalStatus']),//使用改变Modal显示隐藏函数
        hideModal() {
            // this.setModalStatus(false);//点击mask蒙层的话就改变modalStatus状态为false,通过v-show判断显示隐藏
            // this.$store.commit('setModalStatus',false);
            this.setModalStatus(false);
        },

        // edit输入框改变当前的信息
        edit(key,value) {
            this.stu[key] = value//赋值,将修改后的modal数据保存到stu里面,用于api请求会写的参数options
        },

        // 点击提交按钮进行api数据请求,保存改变后的信息
        ...mapActions(['updateStudent']),//使用更新学生信息函数
        handSubmit() {
            const stud = Object.assign({},this.editList,this.stu)//合并原来保存的当前点击按钮数据和后来改变的数据,作为参数传递给api请求
            this.updateStudent(stud)
            .then(msg => this.$toast({type:'success',msg:msg}))
            .catch(err => this.$toast({type:'fail',msg:err}))
        },

        // 重置  使用每个input标签身上的ref引用记录当前的值,然后点击重置时可以拿到他们身上的值并赋值为空,同时要改变编辑后的data数据里面的stu,当前展示为空
        handReset() {
          // this.$refs是一个引用对象,包含了上面添加了ref的每一个input标签 通过设置value值改变每一个的值
          for(let prop in this.$refs){
            // 要同时将data里面的stu值同时置空,不然点击提交时好还是会有editList的值,虽然为空却可以提交
              this.stu[prop] = this.$refs[prop].value = '';
          }
          // 性别单独默认设置为男(0)
          this.stu.sex = 0;//data数据里面保存为男(0)
          this.$refs['sex'].checked = true;//ref引用里面默认设置男为checked
        },
    },
    data() {
        return {
            stu:{},//stu对象,用于保存点击modal修改后的信息
        }
    }
};
</script>

<style scoped>
html,body{
    position: relative;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* display: none; */
}
.modal.show {
  display: block;
}
.modal .mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal .modal-content {
  background-color: #fff;
  position: absolute;
  width: 500px;
  height: 450px;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  margin-top: -225px;
  padding: 20px;
}
.modal .modal-content h2 {
  font-size: 16px;
}   form{
        width: 400px;
        /* height: 260px; */
        /* background-color: red; */
        margin: 0 auto;
        margin-top: 50px;
    }
    form div{
        margin: 10px 0px;
    }
    form div label{
        display: inline-block;
        text-align: right;
        width: 80px;
        height: 20px;
        /* background-color: blue; */
        padding: 3px 0px;
        line-height: 20px;
        margin-right: 10px;
    }
    form div:not(.sex) input{
        width: 200px;
        height: 20px;
        background-color: #fff;
        background-origin: none;
        padding: 1px 0px;
        color: #354457;
    }
    form div.sex input{
        font-size: 14px;
    }
    form div.sex span:nth-of-type(1){
        margin-right: 30px;
    }
    form div:last-of-type input{
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
    form div:last-of-type input:nth-of-type(1){
        margin-right: 10px;
    }
</style>