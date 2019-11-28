import Vue from 'vue'//引入Vue文件,将使用extend方法创建一个有模板的vue实例
import toastConstructor from './index.vue'//引入index.vue文件,把它作为一个构造模板,使用extend方法,创建出来的vue实例对象就是按照index.vue文件

const Toast = Vue.extend(toastConstructor);//让toast实例为一个Vue实例,和其他实例一样,但是特殊具有的是toastConstructor里面的模板

//构造函数,创建加工后的vue实例对象,放在Vue原型上,所有vue实例都具有该方法 参数默认type为成功,信息为成功,弹窗延迟事件默认2s
function showToast(options={type:'success',msg:'success'},duration=2000) {
    const toast = new Toast({
        el:document.createElement('div'),
        data:{
            showNotify: true,//判断弹框是否显示,默认初始显示fadeIn弹窗进入动画,点击之后切换动画
            exit: true,//判断弹框展示完毕然后消失,默认展示弹窗,点击之后v-if为false隐藏弹窗
            type: options.type,//展示请求类型,成功或者其他
            msg: options.msg,//展示请求携带的信息
        }
    })

    document.body.appendChild(toast.$el);//将渲染的节点添加到body中
    // 箭头函数没有参数的话,用下划线_可以代表无参数
    setInterval( _ => {
        toast.showNotify = false;
    }, duration - 200);

    setInterval( _ => {
        toast.exit = false;
    }, duration);
}

export default showToast;//导出该方法模块,再main.js的全局VUe实例上使用