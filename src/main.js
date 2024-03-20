import Vue from 'vue'
import App from './App.vue'
// 引入element-ui
import ElementUI from 'element-ui'
// ui样式
import 'element-ui/lib/theme-chalk/index.css';
// 注册使用ui
Vue.use(ElementUI)

import router from './router';

Vue.config.productionTip = false

new Vue({
	router,
  render: h => h(App)
}).$mount('#app')
