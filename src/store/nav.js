// 导航
const navtab = {
	// 用于存储数据
	state : {
		isCollapse: false //控制菜单的展开还是收起
	},
	// 操作数据
	mutations : {
		isShowCollapse(state){
			// console.log(state);
			state.isCollapse = !state.isCollapse
		}
	},
	// 用于响应组件的动作
	actions : {
	},
	// 用于加工
	getters : {}
}

export default navtab