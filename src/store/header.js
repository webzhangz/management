// 头部
const header= {
	// 用于存储数据
	state : {
		// 面包屑
		breadCrumb:[
			{
				path:"/",
				name: "home",
				label:"首页",
				icon: "s-home",
				url:"Home/Home"
			}
		]
	},
	actions : {
	},
	// 操作数据
	mutations : {
		changeCrumb(state,value){
			// 更新数据
			const index = state.breadCrumb.findIndex(item => item.name === value.name)
			if(index === -1){
				state.breadCrumb.push(value)
			}
		}
	},
	// 用于加工
	getters : {}
}
export default header