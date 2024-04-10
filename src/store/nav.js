import Cookies from "js-cookie";
// 导航
const navtab = {
	// 用于存储数据
	state : {
		isCollapse: false, //控制菜单的展开还是收起
		menuData:[]
	},
	// 操作数据
	mutations : {
		isShowCollapse(state){
			// console.log(state);
			state.isCollapse = !state.isCollapse
		},
		// 设置menu数据
		addMenu(state,value){
			state.menuData = value
			// 存入menu缓存
			Cookies.set("menu",JSON.stringify(value),{expires:1})
			// console.log(state.menuData,value);
		},


		// 动态注册路由
		setRouterMenu(state,router){
			// 1判断缓存中是否有数据,有则取
			if(!Cookies.get('menu')){
				return
			}
			const menu = JSON.parse(Cookies.get('menu'))
			state.menuData = menu

			//2 组装动态路由的数据
			const menuArr =  []
			menu.forEach(item => {	
				// 有子菜单情况
				if(item.children){
					item.children = item.children.map(val => {
						// 动态添加子路由 
						val.component = ()=> import(`../views/${val.url}`)
						return val
					})
					
					menuArr.push(...item.children)
					// console.log(menuArr);
				// 没有子菜单情况	
				}else {
					item.component = ()=> import(`../views/${item.url}`)
					menuArr.push(item)
				}
			});
			menuArr.forEach(index => {
				router.addRoute('Main',index)
			})
		}
	},
	// 用于响应组件的动作
	actions : {
	},
	// 用于加工
	getters : {}
}

export default navtab