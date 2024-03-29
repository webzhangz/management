<template>
	<div>
		<el-container>
			<el-aside width="auto">
				<CommonNav></CommonNav>
			</el-aside>
			<el-container>
				<el-header>
					<CommonHeader></CommonHeader>
				</el-header>
				<!-- tags -->
				<CommonTags></CommonTags>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
		
	</div>
	</template>
	
	<script>
	import CommonNav from '@/components/CommonNav.vue';
	import CommonHeader from '@/components/CommonHeader.vue';
	import CommonTags from '@/components/CommonTags.vue';
		export default {
			name:'myHome',
			components:{
				CommonNav,
				CommonHeader,
				CommonTags
			}
		}
	</script>
	
	<style scoped>
	.el-header {
		padding: 0;
  }

	</style>