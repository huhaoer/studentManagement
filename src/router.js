import Vue from 'vue'
import Router from 'vue-router'
import studentList from '@/views/studentList.vue';//引入学生信息页组件,用作路由
import addStudent from '@/views/addStudent.vue';//引入添加学生页组件,用作路由
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
      {
        path: '/studentList',
        name: 'studentList',
        component: studentList
      },
      {
        path: '/addStudent',
        name: 'addStudent',
        component: addStudent
      },
      {
        path: '*',//匹配剩余的,默认显示到学生信息页
        redirect: '/studentList'
      }
  ]
})
