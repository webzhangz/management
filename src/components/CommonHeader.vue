<template>
<div class="header-css">
	<div class="l-content">
		<el-button @click="isShowNav" icon='el-icon-menu' size="small"></el-button>
		<!-- 面包屑 -->
		<el-breadcrumb  separator="/">
			<el-breadcrumb-item v-for="item in crumb" :key="item.name" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
		</el-breadcrumb>
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
import { mapState } from 'vuex';
export default {
	data() {
		return {
		};
	},

	methods:{
		isShowNav(){
			// 调用store中nav的mutations
			this.$store.commit('isShowCollapse')
		},
	},
	computed:{
		...mapState({
			crumb:state => state.header.breadCrumb
		})
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
		.l-content{
			display: flex;
			justify-content: center;
			align-items: center;
			.el-breadcrumb{
				margin-left: 20px;
				// deep样式穿透
				:deep(.el-breadcrumb__item) {
					.el-breadcrumb__inner {
						// &是作为并且
						&.is-link{
							color:#6c6a6a
						}
					}
					// 选择最后一个样式
					&:last-child{
						.el-breadcrumb__inner{
							color: #ffffff;
							cursor:pointer
						}
					}
				}

			}
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