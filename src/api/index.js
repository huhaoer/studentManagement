import Axios from 'axios';//导入axios
import URLS from './urls.js'//导入请求接口url

const appkey = {
    appkey: 'Layoung_1548596076612'//appkey
}
const size = 5;//每页的数量
const myAjax = Axios.create({//创建一个原型函数,确保每次请求时都带有appkey等基本信息
    baseURL: URLS.baseURL,//基础url
    method: 'get',//请求方式
    params: {//携带参数
        ...appkey//...运算符扩展对象
    }
})

export default {
    // 1.按页查找5条信息
    findByPage(page = 1) {
        return myAjax.get(URLS.findByPage,{
            params:{
                page,//请求默认从第一页
                size//每页5条信息
            }
        })
    },
    // 2.修改学生信息
    updateStudent(options) {//options是当前修改按钮对应的完整信息
        return myAjax.get(URLS.updateStudent,{
            params:{
                ...options
            }
        })
    },
    // 3.按照关键字查询学生信息
    searchStudent(search,page) {
        return myAjax.get(URLS.searchStudent,{
            params:{
                sex: -1,//sex为-1时男女同时查询
                search: search,//查询的关键字,从参数获取
                page: page,//查询的页数,从参数获取
                size: size//每一页的数量,前面默认5条
            }
        })
    },
    // 4.根据学号删除学生
    delBySno(sNo) {
        return myAjax.get(URLS.delBySno,{
            params:{
                sNo:sNo
            }
        })
    },

    // 5.添加新的学生信息
    addStudent(data) {
        return myAjax.get(URLS.addStudent,{
            params:{
                ...data
            }
        })
    }

}
