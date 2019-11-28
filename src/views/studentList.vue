<template>
  <div class="student">
      <app-search></app-search>
      <app-table></app-table>
      <turn-page></turn-page>
      <!-- 
        使用vue里面的过度动画 transition标签 
        v-enter v-enter-to v-enter-active
        v-leave v-leave-to v-leave-active
        给transition标签加上name属性,v-enter等换成对应的name值 modal-enter
        给transition加上mode in-out out-in先进先出等效果
      -->
      <transition name="modal">
        <show-modal v-if="modalStatus"></show-modal>
      </transition>
      
  </div>
</template>

<script>
// 引入组件
import appSearch from '../components/student/AppSearch.vue';
import appTable from '../components/student/AppTable.vue';
import turnPage from '../components/student/TurnPage.vue';
import showModal from '../components/student/showModal.vue';
// 使用map形式导入store
import {mapActions,mapState} from 'vuex';
export default {
    components:{
        appSearch,
        appTable,
        turnPage,
        showModal
    },
    methods:{
      ...mapActions(['getStuList']),//引入异步执行的getStuList方法,commit一个mutations方法setStuList,从而改变state里面的数据
    },
    computed:{
      ...mapState(['modalStatus']),//使用state的modal状态,在过渡动画中判断显示还是隐藏
    },
    created() {
      this.getStuList(1)//调用异步方法,传递参数page = 1
    }
}
</script>

<style scoped>
/* 过度动画 */
/* 进入之前 */
.modal-enter{
  height: 0;
  top:-100%;
}
/* 进入完毕,离开之前 */
.modal-enter-to{
  height: 100%;
  top: 0;
}
/* 离开之前 */
.modal-leave{
  height: 100%;
  top: 0;
}
/* 离开完毕,展现为进入之前状态 */
.modal-leave-to{
  height: 0;
  top: -100%;
}
/* 过度动画 */
.modal-enter-active,.modal-leave-active{
  transition: all 0.7s;
}
body {
  position: relative;
}
.student {
  width: calc(100% - 200px);
  height: calc(100% - 70px);
  background-color: #eee;
  position: absolute;
  top: 70px;
  left: 200px;
}
</style>