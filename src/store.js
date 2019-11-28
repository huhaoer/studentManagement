import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import api from './api/index.js'// 导入api接口,进行数据请求
export default new Vuex.Store({
  state: {
      stuList: [],//用vuex储存获取回来的学生信息
      editList: {},//点击编辑按钮时保存的点击那个item整条信息
      modalStatus: false,//设置modal显示和隐藏,默认是隐藏
      nowPage: 1,//当前展示页数,默认第一页
      totalPage: 1,//总页数,默认是1
      keyWord: '',//保存搜索关键字
  },
  getters: {
      nowPage(state) {
        return state.nowPage;
      },

      totalPage(state) {
        return state.totalPage
      }
  },
  mutations: {//根据请求结果,改变state里面的数据
      setStuList(state,list) {//1.获取请求回来的5条学生信息
        state.stuList = list;//将获取回来的数据改变赋值给state里面的stuList
      },

      setEditStu(state, editList) {//2.获取的是当前点击编辑按钮的整条信息
        state.editList = editList;//将传递的数据保存到state里面
      },

      setModalStatus(state,flag){//3.获取设置modal的显示和隐藏,通过点击事件改变它的状态
        state.modalStatus = flag;
      },

      setNowPage(state,page) {//4.设置当前页数,用于findByPage()请求当前页的数据
        if (page == -1) {//向上翻页
          if (state.nowPage > 1) {
            state.nowPage --
          }
        }else if(page == 0) {//向下翻页
          if (state.nowPage < state.totalPage) {
            state.nowPage ++;
          }
          // if(state.nowPage == 1){
          //   state.nowPage = 0;
          //   state.stuList = [];
          // }
        }else{
          state.nowPage = page;
        }
      },

      setTotalPage(state,cont){//5.设置总页数
        state.totalPage = Math.ceil(cont / 5);
      },

      setKeyWord(state,word) {//6.设置搜索框传递的关键字,保存到状态中
        state.keyWord = word;
      }
  },
  actions: {
      // 1.按页获取5条消息
      getStuList({ commit, state},npage) {
        if (typeof npage == 'number') {
          commit('setNowPage',npage);//通过传入参数page为当前页数,改变state里面的当前页数,用于下面根据当前页数请求数据
        }
        // 判断是否是正常请求还是关键字请求,都需要发送findByPage()函数获取数据
        if (state.keyWord) {//***通过关键字请求并翻页
          api.searchStudent(state.keyWord, state.nowPage)
            .then(res => {
              if (res.data.status == 'success') {
                commit('setStuList', res.data.data.searchList);//按照关键字查找出学生数据数组,复制给state里面的studentList
                commit('setTotalPage', res.data.data.cont)//按照查询出来的数据条数,划分出总页数,setTotalPage做处理判断
              }
              // console.log(res)
            })
            .catch(err => {
              console.log(err)
            })
        }else{//***正常翻页请求
          api.findByPage(state.nowPage)//通过state里面获取当前页面,进行数据请求
            .then(res => {
              commit('setTotalPage', res.data.data.cont);//通过请求回来的数据条数为参数,向state里面设置总页数,在mutations里面的totalPage函数中做页数判断
              commit('setStuList', res.data.data.findByPage);//请求成功之后,commit一个mutations,将获取的数据传递给mutations
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
      // 2.更新学生信息
      updateStudent({ commit,dispatch }, options) {
        // 返回promise对象,在外面进行成功或者失败的执行
        return api.updateStudent(options).then(data => {
          if (data.data.status == 'fail') {
            // 返回失败后的primise对象,携带失败信息
            return Promise.reject(data.data.msg)
          } else {
            commit('setModalStatus', false)

            // 调用一次获取学生信息,更新数据
            dispatch('getStuList')

            // 返回成功后的primise对象,携带成功信息
            return Promise.resolve(data.data.msg)
          }
        })
      },

      // 3.根据关键字查询学生信息
      // searchStudent({commit,state},npage) {
      //   return api.searchStudent(state.keyWord, npage)
      //       .then(res => {
      //         if (res.data.status == 'success') {
      //           commit('setStuList', res.data.data.searchList);//按照关键字查找出学生数据数组,复制给state里面的studentList
      //           commit('setTotalPage',res.data.data.cont)//按照查询出来的数据条数,划分出总页数,setTotalPage做处理判断
      //         }
      //         console.log(res)
      //       })
      // }

      // 4.根据学号删除学生信息
    delBySno({dispatch,state},sNo) {
      return api.delBySno(sNo)
                    .then(res => {
                      // 如果当前页显示的数据只有一条的话,删除之后让当前页减一,回到上一页
                      if (state.stuList.length == 1) {
                        // 调用获取学生数据的异步函数,传入参数是上一页的页数
                        dispatch('getStuList',state.nowPage - 1)
                      }
                      // 删除成功之后,再次触发以下请求学生列表信息,更新页面
                      dispatch('getStuList')
                      return '删除成功'
                    })
      }
  }
})
