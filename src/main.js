import Vue from 'vue'
import App from './App.vue'

// 引入模拟数据
import './mock/mockSever';
// ui样式
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';

import store from './store';


// 完整引入 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// 注册使用ui
Vue.use(ElementUI)

// 按需引入
// import {
//   Pagination,
//   Dialog,
//   Autocomplete,
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   Menu,
//   Submenu,
//   MenuItem,
//   MenuItemGroup,
//   Input,
//   InputNumber,
// } from 'element-ui';

// Vue.use(Pagination);
// Vue.use(Dialog);
// Vue.use(Autocomplete);
// Vue.use(Dropdown);
// Vue.use(DropdownMenu);
// Vue.use(DropdownItem);
// Vue.use(Menu);
// Vue.use(Submenu);
// Vue.use(MenuItem);
// Vue.use(MenuItemGroup);
// Vue.use(Input);
// Vue.use(InputNumber);



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
