import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import showToast from './tools/toast/index.js';//引入自定义的toast弹窗组件方法,原型上添加,所有Vue实例都具有该方法Vue.prototype.$toast = showToast
Vue.prototype.$toast = showToast

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
