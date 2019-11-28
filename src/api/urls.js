export default {
    baseURL: 'http://api.duyiedu.com',//每次求情都需要的基础URL
    findAll: '/api/student/findAll',//查询所有学生
    findByPage: '/api/student/findByPage',//按页查找学生
    delBySno: '/api/student/delBySno',//按照学号删除一个学生
    addStudent: '/api/student/addStudent',//添加一个学生
    updateStudent: '/api/student/updateStudent',//修改学生信息
    searchStudent: '/api/student/searchStudent',//按照关键字查找学生
}