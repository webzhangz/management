<template>
	<el-menu class="el-menu-vertical-demo" 
		:collapse="isCollapse"  
		background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
		:default-active="isColor"
		>

		<h3>{{ isCollapse ? '主页' : '通用后台管理系统'}}</h3>
		<!-- 遍历导航无子菜单 -->
		<el-menu-item @click="clickMenu(item)" v-for="(item) in noMenuren"  :key="item.name" :index="item.name">
			<i :class="`el-icon-${item.icon}`"></i>
			<span slot="title">{{item.label}}</span>
		</el-menu-item>
		<!-- 遍历导航有子菜单 -->
		<el-submenu v-for="item in hasMenuren" :key="item.label"  :index="item.label">
			<template slot="title">
				<i :class="`el-icon-${item.icon}`"></i>
				<span slot="title">{{item.label}}</span>
			</template>
			<el-menu-item-group   v-for="subItem in item.children " :key="subItem.name">
				<el-menu-item @click="clickTwoMenu(subItem)" :index="subItem.name">{{subItem.label}}</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
	</el-menu>
</template>

<script>
import Cookies from 'js-cookie';

// import { mapState } from 'vuex';
export default {
	data() {
		return {
			// menuData:[
			// 	{
			// 		path:"/",
			// 		name: "home",
			// 		label:"首页",
			// 		icon: "s-home",
			// 		url:"Home/Home"
			// 	},
			// 	{
			// 		path:"/mall",
			// 		name: "mall",
			// 		label:"商品管理",
			// 		icon: "video-play",
			// 		url:"MallManage/MallManage"
			// 	},
			// 	{
			// 		path:"/user",
			// 		name: "user",
			// 		label:"用户管理",
			// 		icon: "user",
			// 		url:"UserManage/UserManage"
			// 	},
			// 	{
			// 		label:"其他",
			// 		icon:"location",
			// 		children: [{
			// 			path: "/page1",
			// 			name: "page1",
			// 			label:"页面1",
			// 			icon:"setting",
			// 			url: "other/Pageone"
			// 		},
			// 		{
			// 			path: "/page2",
			// 			name: "page2",
			// 			label:"页面2",
			// 			icon:"setting",
			// 			url: "other/Pagetwo"
			// 		}]
			// 	}
			// ],
		};
	},
	methods:{
		clickMenu(target){
			console.log('clickMenu',target);
			// 若是觉得这种比较麻烦可以使用router.js的重写vueRouterpush和replace方法
			this.$router.push({path:target.path})
			// if(this.$route.path !== target.path && !(this.$route.path === '/home' && (target.path === '/'))){
			// 	this.$router.push({path:target.path})
			// }
			this.$store.commit('changeCrumb',target)
		},
		
		clickTwoMenu(target){
			console.log('clickTwoMenu',target);
			// if(this.$route.path !== target.path && !(this.$route.path === '/home' && (target.path === '/'))){
			this.$router.push({name:target.name})
				
			// }
		}
	},
	computed:{
		// 没有子菜单
		noMenuren(){
			return this.menuData.filter(item => !item.children)
		},
		// 有子菜单
		hasMenuren(){
			return this.menuData.filter(item => item.children)
		},
		isCollapse(){
			return this.$store.state.navtab.isCollapse
		},
		isColor(){		
			return this.$route.name
		},
		menuData(){
			// console.log(this.$store.state.navtab.menuData);
			// 判断当前数据，如果缓存中没有，则从store中获取
			return JSON.parse(Cookies.get('menu')) || this.$store.state.navtab.menuData
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
		border-right: none;
		h3 {
			color: #ffffff;
			font-size: 16px;
			font-weight: 400;
			margin: 10px 0;
			text-align: center;
		}
	}
</style>