// 使用router
import Vue from 'vue'
import VueRouter from 'vue-router';
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'


Vue.use(VueRouter)

const router = new VueRouter({
	// mode:'history',
	
	routes:[
		// 配置主路由
		{
			path:"/",
			component:Main,
			// 子路由
			children:[
				{
					path:'/home',
					component:Home
				},
				{
					path:'/user',
					component:User
				}
			]
		},



	]
})

export default router