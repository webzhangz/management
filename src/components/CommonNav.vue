<template>
	<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
		:collapse="isCollapse"  
		background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
		<h3>通用后台管理系统</h3>
		<!-- 遍历导航无子菜单 -->
		<el-menu-item v-for="(item) in noMenuren"  :key="item.name" :index="item.name">
			<i :class="`el-icon-${item.icon}`"></i>
			<span slot="title">{{item.label}}</span>
		</el-menu-item>
		<!-- 遍历导航有子菜单 -->
		<el-submenu v-for="item in hasMenuren" :key="item.label"  :index="item.label">
			<template slot="title">
				<i :class="`el-icon-${item.icon}`"></i>
				<span slot="title">{{item.label}}</span>
			</template>
			<el-menu-item-group v-for="subItem in item.children " :key="subItem.name">
				<el-menu-item :index="subItem.path">{{subItem.label}}</el-menu-item>
			</el-menu-item-group>
		</el-submenu>

	</el-menu>
</template>

<script>
export default {
	name: 'CommonNav',
	data() {
		return {
			menuData:[
				{
					path:"/",
					name: "home",
					label:"首页",
					icon: "s-home",
					url:"Home/Home"
				},
				{
					path:"/mail",
					name: "mail",
					label:"商品管理",
					icon: "video-play",
					url:"MailManage/MailManage"
				},
				{
					path:"/user",
					name: "user",
					label:"用户管理",
					icon: "user",
					url:"UserManage/UserManage"
				},
				{
					label:"其他",
					icon:"location",
					children: [{
						path: "/page1",
						name: "page1",
						label:"页面1",
						icon:"setting",
						url: "other/Pageone"
					},
					{
						path: "/page2",
						name: "page2",
						label:"页面2",
						icon:"setting",
						url: "other/Pagetwo"
					}]
				}
			],
			isCollapse: false
		};
	},
	computed:{
		// 没有子菜单
		noMenuren(){
			return this.menuData.filter(item => !item.children)
		},
		// 有子菜单
		hasMenuren(){
			return this.menuData.filter(item => item.children)
		}
	}
}
</script>

<style scoped lang="less">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
	.el-menu{
		height: 100vh;
		h3 {
			color: #ffffff;
			font-size: 20px;
			margin: 20px;
		}
	}
</style>