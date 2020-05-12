import Vue from 'vue'
import App from './App.vue'
import http from './api/request'
import router from './router'
import store from './store/index'
import echarts from 'echarts'
import dyContainer from '@/components/dyContainer' 
import dyBody from '@/components/dyBody'
import dyHeader from '@/components/dyHeader'
Vue.config.productionTip = false
Vue.prototype.$http  = http
Vue.prototype.$echarts = echarts
Vue.component("dy-container", dyContainer);
Vue.component("dy-header", dyHeader);
Vue.component("dy-body", dyBody);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
