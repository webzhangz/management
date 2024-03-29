<template>
	<div class="layout">
		<!-- 提示框 -->
		<el-dialog title="新增用户" :visible.sync="dialogFormVisible">
			<!-- 用户表单 -->
			<el-form :inline="true" :model="userForm" :label-width="formLabelWidth">
				<el-form-item label="姓名">
					<el-input v-model="userForm.name" placeholder="请选择姓名"></el-input>
				</el-form-item>
				<el-form-item label="年龄" >
					<el-input v-model="userForm.age" autocomplete="off" placeholder="请输入年龄"></el-input>
				</el-form-item>
				<el-form-item label="性别" >
					<el-select v-model="userForm.region" placeholder="请选择性别">
						<el-option label="男" value="1"></el-option>
						<el-option label="女" value="0"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="出生日期">
					<el-col>
						<el-date-picker type="date" placeholder="选择日期" v-model="userForm.date" style="width: 100%;"></el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item label="地址">
					<el-input v-model="userForm.address" autocomplete="off" placeholder="请输入地址"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="SubmitForm">确 定</el-button>
			</div>
		</el-dialog>

		<div>
			<el-button type="primary " @click="showDialog">新增+</el-button>
		</div>
		<div class="right-user">
			<el-input
				placeholder="请输入内容"
				v-model="input"
				clearable>
			</el-input>
			<el-button type="primary">搜索</el-button>
		</div>
	</div>	
</template>

<script>
	export default {
		name:'UserHeader',
		data(){
			return {
				input:'', //搜索信息
				dialogFormVisible:false,//是否展示表单
				formLabelWidth:"120px",//提示框宽度
				userForm:{		//表单信息
					name:"",
					age:"",
					date:"",
					region:"",
					address:"",

				}
			}
		},
		methods:{
			// 展示新增提示框
			showDialog(){
				this.dialogFormVisible = true
			},
			// 确定提示框
			SubmitForm(){
				console.log(this.userForm);
				this.dialogFormVisible = false
			}
		}
	}
</script>

<style lang="less" scoped>
	.layout{
		display: flex;
		justify-content: space-between;
		.right-user{
			display: flex;
		}
	}
</style>