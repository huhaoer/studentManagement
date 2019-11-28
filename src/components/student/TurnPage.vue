<template>
  <!-- 页码 -->
  <div class="turn-page">
      <ul>
        <li class="prev-page" @click="turnPage(-1)" :class="{'not-allow': nowPage == 1}">&lt;</li>
        <!-- 页数小于7 -->
        <template v-if="totalPage <= 7">
          <li v-for="item in totalPage" 
              :key="item"
              :class="{'showCurPage': item == nowPage}"
              @click="turnPage(item)"
          >
              {{item}}
          </li>
        </template>
        <!-- 页数大于7 -->
        <template v-else>
          <!-- 当前展示页小于4 就显示6条消息 -->
            <template v-if="nowPage <= 4">
                <li v-for="i in 6" :key="i" @click="turnPage(i)" :class="{showCurPage: nowPage == i}">{{i}}</li>
            </template>

            <!-- 当前页数大于4 前面展示第一页和...  后面展示剩余页数 -->
            <template v-if="nowPage > 4">
                <li @click="turnPage(1)">1</li>
                <li>...</li>
            </template>

            <template v-if="nowPage > 4 && nowPage + 4 <= totalPage">
                <li v-for="i in 5" :key="i" :class="{showCurPage: i == 3}" @click="turnPage(nowPage -3 + i)">{{nowPage -3 + i}}</li>
            </template>

            <!-- 当前页数加4小于等于总页数,而总页数又是大于7的,说明当前页数一定小于等于4,所以后面就显示...和最后一页消息 -->
            <template v-if="nowPage + 4 <= totalPage">
                <li>...</li>
                <li @click="turnPage(totalPage)">{{totalPage}}</li>
            </template>

            <!-- 当前页数加上4大于总页数  就显示后面的页数,说明前面一定是nowPage大于4,显示的1和...页面 -->
            <template v-if="nowPage + 4 > totalPage">
                <!-- 去掉前面的1和...两页,从2+i开始显示页面 -->
                <li v-for="i in 6" :key="i" @click="turnPage(totalPage - 6 + i)" :class="{showCurPage: nowPage == totalPage - 6 + i}">{{totalPage - 6 + i}}</li>
            </template>
        </template>
        <li class="next-page" @click="turnPage(0)" :class="{'not-allow': nowPage == totalPage}">&gt;</li>
      </ul>
  </div>
</template>

<script>
import {mapActions,mapGetters,mapState} from 'vuex';
export default {
  // data() {
  //   return {
  //     totalPage: 10,//默认显示7页的下标
  //     nowPage: 1,//默认显示第一页
  //   }
  // },
  
  methods:{
    ...mapActions(['getStuList']),
    // 翻页 传递参数为第几页
    turnPage(n) {
      // 做一层判断,当前页数第一页不能向上,最后一页不能向下,当前页数等于点击的页数不能请求
      if ((this.nowPage == 1 && n == -1) || (this.nowPage == this.totalPage && n == 0) || (this.nowPage == n)) {
        return;
      }else{
       this.getStuList(n);//调用请求学生数据的异步函数,传入参数是当前页数
      }
    }
  },

  computed:{
    ...mapState(['nowPage','totalPage']),
  },
  // mounted() {
  //   console.log(this.nowPage,this.totalPage)
  // }
}
</script>

<style scoped>
.turn-page ul{
  float: right;
  margin-top: 10px;
}
ul,li{
  list-style: none;
}
ul{
  display: flex;
}
ul li{
  width: 30px;
  height: 30px;
  background-color: #f4f4f5;
  counter-reset: #606266;
  text-align: center;
  line-height: 30px;
  border: 1px solid #ddd;
  color:#b3bcc5;
  margin: 0 3px;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
}
ul li.showCurPage{
    background-color: #409eff;
}
.not-allow{
  cursor: not-allowed!important;
}
</style>