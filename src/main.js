import Vue from 'vue'
import App from './App.vue'
import http from './api/request'
import router from './router'
import store from './store/index'
import echarts from 'echarts'

Vue.config.productionTip = false
Vue.prototype.$http  = http
Vue.prototype.$echarts = echarts

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
