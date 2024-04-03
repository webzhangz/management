import Vue from 'vue'
import App from './App.vue'
// 引入element-ui
import ElementUI from 'element-ui'
// 引入模拟数据
import './mock/mockSever';
// ui样式
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';

import store from './store';


// 注册使用ui
Vue.use(ElementUI)


Vue.config.productionTip = false

new Vue({
	router,
	store,
  render: h => h(App),
	// 防止登录后刷新页面获取不到router信息
	created(){
		store.commit('setRouterMenu',router)
	}
}).$mount('#app')
