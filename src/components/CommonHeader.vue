<template>
<div class="header-css">
	<div class="l-content">
		<el-button @click="isShowNav" icon='el-icon-menu' size="small"></el-button>
		<!-- 面包屑 -->
		<span class="text">首页</span>
	</div> 
	<!-- 右侧 -->
	<div class="r-content">
		<el-dropdown>
			<span class="el-dropdown-link">
				<img class="user-img" src="@/assets/images/headphoto.png" alt="客户">
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item>修改用户</el-dropdown-item>
				<el-dropdown-item>退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div> 
</div>
</template>

<script>
export default {
	data() {
		return {
		};
	},
	methods:{
		isShowNav(){
			// 调用store中nav的mutations
			this.$store.commit('isShowCollapse')
		}
	}
}
</script>

<style scoped lang="less">
	.header-css {
    background-color: #333;
    color: #333;
    line-height: 60px;
		display: flex;
		justify-content:space-between;//子元素在X轴上的对齐方式
		align-items: center;//子元素y轴对齐
		padding: 0 20px;
		.text{
			color: #ffffff;
			margin-left: 20px;
			font-size: 14px;
		}
		.r-content{
			.user-img{

				vertical-align: middle;
				width: 40px;
				height: 40px;
				border-radius: 50%;

			}
		}
  }

</style>