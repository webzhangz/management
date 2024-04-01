<template>
	<div class="userManage">
		<div class="layout">
			<!-- 提示框 -->
			<el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="handdleVisible">
				<!-- 用户表单 -->
				<el-form :model="userForm" ref="userForm" :inline="true" :rules="rules" :label-width="formLabelWidth">
					<el-form-item label="姓名" prop="name">
						<el-input v-model="userForm.name" placeholder="请选择姓名"></el-input>
					</el-form-item>
					<el-form-item label="年龄" prop="age">
						<el-input v-model.number="userForm.age" autocomplete="off" placeholder="请输入年龄"></el-input>
					</el-form-item>
					<el-form-item label="性别" prop="sex">
						<el-select v-model="userForm.sex" placeholder="请选择性别">
							<el-option label="男" :value="1"></el-option>
							<el-option label="女" :value="0"></el-option>
						</el-select>

					</el-form-item>
					<el-form-item label="出生日期" prop="date">
						<el-date-picker type="date" placeholder="选择日期" v-model="userForm.date" value-format="yyyy-MM-dd"
							style="width: 100%;">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="地址" prop="address">
						<el-input v-model="userForm.address" autocomplete="off" placeholder="请输入地址"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="cancelForm">取 消</el-button>
					<el-button type="primary" @click="SubmitForm">确 定</el-button>
				</div>
			</el-dialog>

			<div>
				<el-button type="primary " @click="showDialog">新增+</el-button>
			</div>
			<div class="right-user">
				<el-input placeholder="请输入内容" v-model="input.name" clearable>
				</el-input>
				<el-button type="primary" @click="searchList">搜索</el-button>
			</div>
		</div>
		<div class="list">
			<el-table height="90%" style="width: 100%" :data="UserLists">
				{{ UserLists }}
				<el-table-column prop="name" label="姓名" width="150">
				</el-table-column>
				<el-table-column prop="age" label="年龄" width="150">
				</el-table-column>
				<el-table-column label="性别" width="150" prop="sexLabel">
				</el-table-column>
				<el-table-column prop="date" label="出生日期" width="150">
				</el-table-column>
				<el-table-column prop="address" label="地址" width="auto">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope" >
						<el-button @click="handleEdit(scope.row)" size="small">编辑</el-button>
						<el-button type="danger" @click="handleDelete(scope.row)" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		<el-pagination @current-change="changPage" layout="prev, pager, next" :total="pagecount">
		</el-pagination>
		</div>
	</div>
</template>

<script>
import { getUserList, updateUser, createUser, deleteUser } from '@/api';

export default {
	name: 'UserHeader',
	data() {
		return {
			title:'新增用户',
			input: {
				name:""
			}, //搜索信息
			dialogFormVisible: false,//是否展示表单
			formLabelWidth: "100px",//提示框宽度
			userForm: {		//表单信息
				name: "",
				age: "",
				date: "",
				address: "",
			},
			UserList: [],
			pagecount: 1,//当前的总条数
			pageData:{
				page:1,
				limit:15
			},
			rules: {
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' },
				],
				age: [
					{ required: true, message: '请输入年龄' },
					{ type: 'number', message: '年龄必须为数字值' }
				],
				date: [
					{ required: true, message: '请选择日期' }
				],
				region: [
					{ required: true, message: '请至少选择一个性别', trigger: 'blur' }
				],
				address: [
					{ message: '请输入地址' }
				]
			},
			modalType: 0 //0表示新增的弹窗   1表示编辑
		}
	},
	mounted() {
		// 获取数据
		this.getUser()
		this.modalType = 0
	},
	computed: {
		// 筛选出sex == 0 和 sex== 1情况
		UserLists() {
			return this.UserList.filter(item => {
				return item['sexLabel'] = item.sex == 0 ? '女' : '男'
			})
		}
	},
	methods: {
		// 展示新增提示框
		showDialog() {
			this.modalType = 0
			this.dialogFormVisible = true
		},
		// 提交提示框信息
		SubmitForm() {
			this.$refs.userForm.validate((boolean) => {
				if (boolean) {
					if (this.modalType === 0) {
						createUser(this.userForm).then(() => {
							this.getUser()
						})
					} else {
						updateUser(this.userForm).then(() => {
							this.getUser()
							this.modalType === 1
							// console.log('updateUser',result);
						})
					}
					this.handdleVisible()
				}

			})
		},
		// 关闭弹窗时
		handdleVisible() {
			this.dialogFormVisible = false
			this.$refs.userForm.resetFields()
		},
		// 取消提示框按钮
		cancelForm() {
			this.handdleVisible()
		},
		// 编辑个人
		handleEdit(form) {
			this.title = '编辑用户'
			console.log('handleEdit', form);
			this.modalType = 1
			this.dialogFormVisible = true
			// 深拷贝：对数据内部深处有效的复制
			this.userForm = JSON.parse(JSON.stringify(form))
		},
		// 改变页码
		changPage(v) {
			// console.log(v);
			this.pageData.page = v
			this.getUser()
		},
		// 删除个人
		handleDelete(value) {
			// elementui组件
			this.$confirm('是否确定关闭').then(() => {
				console.log('handleDelete', value);
				deleteUser({ id: value.id }).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功'
					})
					this.getUser()
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				})
			});
		},
		//封装 请求获取用户数据
		getUser() {
			return getUserList({params:{...this.input,...this.pageData},}).then((result) => {
				if (result.code == 200) {
					// console.log(result);
					this.UserList = result.data
					this.pagecount = result.count
				}
			})
		},
		searchList(){
			this.getUser()
		}
	},
	watch:{
		'input.name':function(newinput){
			if(newinput==''){
				this.getUser()
			}
		}
	}
}
</script>

<style scoped lang="less">
.userManage {
	height: 100%;

	.layout {
		display: flex;
		justify-content: space-between;
		.right-user {
			display: flex;
		}
	}
	.list{
		height: calc(100% - 60px);
		position: relative;;
		margin-top: 10px;
		.el-pagination{
			position: absolute;
			right: 0;
			margin: 10px 0
		}
	}
}
</style>