<template>
	<div>
		<!-- :visible.sync="dialogVisible" -->
		<el-dialog :title="title" :visible.sync="dialogVisible" width="50%" label-width="100px" :before-close="handleClose">
			<el-form :inline="true" :rules='rules' :model="mallFrom" ref="mallForm">
				<el-form-item prop="mallName.name" label="商品名称">
					<el-input v-model="mallFrom.mallName.name" placeholder="商品名称"></el-input>
				</el-form-item>
				<el-form-item label="商品分类" prop="mallName.category">
					<el-input v-model="mallFrom.mallName.category" placeholder="商品分类"></el-input>
				</el-form-item>
				<el-form-item label="分销商" prop="salesPer">
					<el-input v-model="mallFrom.salesPer" placeholder="分销商"></el-input>
				</el-form-item>
				<el-form-item label="价格" prop="price">
					<el-input v-model.number="mallFrom.price" placeholder="价格"></el-input>
				</el-form-item>
				<el-form-item label="总库存" prop="stocks">
					<el-input v-model.number="mallFrom.stocks" placeholder="总库存"></el-input>
				</el-form-item>
				<el-form-item label="总销量" prop="salesVolume">
					<el-input v-model.number="mallFrom.salesVolume" placeholder="总销量"></el-input>
				</el-form-item>
				<el-form-item label="入库时间" prop="date">
					<el-col>
						<el-date-picker type="datetime" placeholder="选择时间" v-model="mallFrom.date" style="width: 100%;"
							value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm">立即创建</el-button>
					<el-button @click="cancelForm">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import { createMall, updateMall, } from "@/api";

export default {
	name: 'myMallDalog',
	data() {
		return {
			title: "新建商品",
			// 表单数据
			mallFrom: {
				mallName: {
					name: '',
					category: ''
				},
				stocks: '',
				salesVolume: '',
				price: '',
				salesPer: '',
				date: ''
			},
			rules: {
				salesPer: [{ required: true, message: '请填写经销商', trigger: 'blur' }],
				price: [{ required: true, message: '填写价格', trigger: 'blur' }, { type: 'number', message: '必须为数字值' }],
				stocks: [{ required: true, message: '请输入数量', trigger: 'blur' }, { type: 'number', message: '必须为数字值' }],
				salesVolume: [{ required: true, message: '请输入总销量', trigger: 'blur' }, { type: 'number', message: '必须为数字值' }],
				date: [{ required: true, message: '请选择日期' }],
			},
			dialogVisible: false,
			modelMall: 0
		}
	},
	methods: {
		// 添加
		addMall() {
			this.dialogVisible = true
			this.modelMall = 0
		},


		// 编辑
		handleEdit(item) {
			this.title = '修改商品'
			this.modelMall = 1
			this.dialogVisible = true
			// 深拷贝：对数据内部深处有效的复制
			this.mallFrom = JSON.parse(JSON.stringify(item))
		},
		// 关闭新建表单
		handleClose() {
			this.dialogVisible = false
			this.$refs.mallForm.resetFields()
		},
		// 取消表单
		cancelForm() {
			this.handleClose()
		},
		// 提交信息
		submitForm() {
			this.$refs.mallForm.validate((boolean) => {
				if (boolean) {
					console.log(this.modelMall);
					if (this.modelMall == 0) {
						createMall(this.mallFrom).then(() => {
							this.$emit("sendMall")
						})
					} else {
						updateMall(this.mallFrom).then(() => {
							this.$emit("sendMall")
						})
					}
					this.handleClose()
				}
			})
		},
	}
}
</script>

<style scoped lang="less">
.header-mall {
	display: flex;
	align-items: center;

	.el-input {
		width: 200px;
		margin: 0 15px;
	}
}

.context-mall {
	height: 80vh;

	.footer-page {
		text-align: right;

	}
}
</style>