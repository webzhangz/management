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
		// 更新面包屑数据
		changeCrumb(state,value){
			// console.log(state,value);
			const index = state.breadCrumb.findIndex(item => item.name === value.name)
			if(index === -1){
				state.breadCrumb.push(value)
			}
		},
		// 删除tags
		handleClose(state,value){
			// 判断传递进来的数据是否与breadCrumb的数据一致
			const index = state.breadCrumb.findIndex(item => item.name === value.name )
			state.breadCrumb.splice(index,1)
		}
	},
	// 用于加工
	getters : {}
}
export default header