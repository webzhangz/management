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
import Cookies from 'js-cookie';

// 注册使用ui
Vue.use(ElementUI)

router.beforeEach((to,from,next)=>{
	const token = Cookies.get('Token')
	if(to.name !== 'login' && !token ){
		next({name:'login'})
	}
	else if(to.name === 'login' && token){
		next({name:'home'})
	}else next()
})

Vue.config.productionTip = false

new Vue({
	router,
	store,
  render: h => h(App)
}).$mount('#app')
