// 使用router
import Vue from 'vue'
import VueRouter from 'vue-router';
import Main from '@/views/Main.vue'
import Login from '@/views/login.vue'
import Cookies from 'js-cookie';
// 重写vuerouter的push和replace方法
const rwPush = VueRouter.prototype.push 
const rwReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function(location,onComplete,onAbort){
	// console.log(location,onComplete,onAbort);
	// 判断如果没有指定回调函数, 通过call调用源函数并使用catch来处理错误
	if(onComplete === undefined && onAbort === undefined){
		// console.log(rwPush.call(this,location,onComplete,onAbort));
		return rwPush.call(this,location,onComplete,onAbort).catch(()=>{})
	}else{
		// 如果有指定任意回调函数, 通过call调用源push函数处理
		rwPush.call(this, location, onComplete, onAbort)
	}
}
VueRouter.prototype.replace = function (location, onComplete, onAbort) {
  if (onComplete===undefined && onAbort===undefined) {
    return rwReplace.call(this, location, onComplete, onAbort).catch(() => {})
  } else {
    rwReplace.call(this, location, onComplete, onAbort)
  }
}



Vue.use(VueRouter)
const 	routes  = [
	// 配置主路由
	{
		path:"/",
		component:Main,
		name:'Main',
		// 重定向
		redirect:'home',
		// 子路由
		children:[
			// {
			// 	path:'/home',
			// 	name:'home',
			// 	component:Home
			// },{
			// 	path:'/mall',
			// 	name:'mall',
			// 	component:Mall
			// },
			// {
			// 	path:'/user',
			// 	name:'user',
			// 	component:User
			// },
			// {
			// 	path:'/page1',
			// 	name:'page1',
			// 	component:pageOne
			// },
			// {
			// 	path:'/page2',
			// 	name:'page2',
			// 	component:pageTwo
			// },
		]

	},
	{
		path:'/login',
		name:'login',
		component:Login
	}
]

const router = new VueRouter({
	mode:'history',
	routes
})

router.beforeEach((to,from,next)=>{
	const token = Cookies.get('Token')
	if(to.name !== 'login' && !token ){
		next({name:'login'})
	}
	else if(to.name === 'login' && token){
		next({name:'home'})
	}else next()
})




export default router