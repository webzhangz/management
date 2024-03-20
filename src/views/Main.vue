<template>
	<div>
		<el-container>
			<el-aside width="300px">
				<Common></Common>
			</el-aside>
			<el-container>
				<el-header>
				header
				</el-header>
				<el-main>
					home
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
		
	</div>
	</template>
	
	<script>
	import Common from '@/components/CommonNav.vue';
		export default {
			name:'myHome',
			components:{
				Common
			}
		}
	</script>
	
	<style scoped>
	.el-header, .el-footer {
    background-color: #B3C0D1;
		width: 100vh;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
	</style>