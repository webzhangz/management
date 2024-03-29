<template>
	<div class="tags">
			<!-- 用三元运算符判断属性是否显示 -->
				<el-tag
					v-for="(item) in tags"
					:key="item.name"
					:effect="$route.name === item.name ? 'dark' : 'plain'" 
					:closable="item.name !== 'home'"
					@click="clickTags(item)"
					@close="closeTags(item)"
					>
						{{item.label}}
				</el-tag>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name:'CommonTags',
	data(){
		return {
			
		}
	},
	methods:{
		// 点击跳转到目标页
		clickTags(item){
			// 第一种方式：path
			// this.$router.push(item.path)
			// 第二种方式：name
			this.$router.push({name:item.name})
			// console.log(item);
		},
		// 点击关闭tags,删除功能
		closeTags(item){
			this.$store.commit('handleClose',item)
			// 读取点击删除的是第几个按钮
			const leg = this.tags.length - 1
			// console.log(leg);
			// 如果删除的不是当前的，直接删除
			if(item.name !== this.$route.name ){
				return
			}else{
				this.$router.push({
					name:this.tags[leg].name
				})
				// console.log(leg , index);
			}
		}
	},
	computed:{
		...mapState({
			tags:(state)=>{		
				// console.log(state.header.breadCrumb);
				return state.header.breadCrumb
			}
		})
	}
}
</script>
<style scoped lang="less">
.tags{
	padding:10px 15px 0 15px;
	.el-tag{cursor: pointer;}
	.el-tag:not(:first-child){
		margin-left: 20px;
	}
}
</style>