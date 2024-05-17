<template>
	<div class="Mall">
		<div class="header-mall">
			<el-dialog :title="title" :visible.sync="dialogVisible" width="50%" label-width="100px"
				:before-close="handleClose">
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

			<span style="font-size: 16px">搜索：</span>
			<el-input placeholder="请输入商品名称" v-model="input" clearable>
			</el-input>
			<el-button type="primary" @click="searchMall">搜索</el-button>
			<el-button type="primary " @click="addMall">添加+</el-button>
			<el-button type="primary " @click="exportMall">导出Excel</el-button>
		</div>
		<div class="context-mall">
			<el-table ref="table" style="width: 100%" :data="mallList">
				<el-table-column prop="mallName.name" label="商品名称" width="auto">
				</el-table-column>
				<el-table-column prop="mallName.category" label="商品分类" width="auto">
				</el-table-column>
				<el-table-column prop="salesPer" label="分销商" width="auto">
				</el-table-column>
				<el-table-column prop="price" label="价格" width="100">
				</el-table-column>
				<el-table-column prop="stocks" label="总库存" width="100">
				</el-table-column>
				<el-table-column prop="salesVolume" label="总销量" width="100">
				</el-table-column>
				<el-table-column prop="date" label="时间日期" width="auto">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button @click="handleEdit(scope.row)" size="small">编辑</el-button>
						<el-button type="danger" @click="handleDelete(scope.row)" size="small">下架</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination class="footer-page" @current-change="changPage" layout="prev, pager, next" :total="pagecount">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import { createMall, updateMall, getMallList, deleteMall } from '@/api';
import * as XLSX from 'xlsx';

export default {
	name: 'myMall',
	data() {
		return {
			title: "新建商品",
			dialogVisible: false,
			input: '',
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
			mallList: [
			],
			pagecount: 1,
			pageData: {
				page: 1,
				limit: 10,
			},
			modelMall: 0
		}
	},
	mounted() {
		this.getMall()
	},
	methods: {
		// 导出excel
		exportExcelByTable(el, fileName = 'MAll.xlsx') {
			if (!el) {
				throw new Error('没有获取到表格的根 dom 元素');
			}
			const options = { raw: true };
			const workbook = XLSX.utils.table_to_book(el, options);

			return XLSX.writeFile(workbook, fileName, { type: 'binary' });
		},
		// 导出excel
		exportMall() {
			console.log(this.$refs.table.$el);
			this.exportExcelByTable(this.$refs.table.$el)
			/**
			 *
			 * @param {Array} workSheetData 二维数组
			 * @param {String} fileName 下载时文件名称
			 */
			// const exportExcelByDoubleDimensArray = (workSheetData, fileName = 'example.xlsx') => {
			// 	const ws = XLSX.utils.aoa_to_sheet(workSheetData);
			// 	const workSheetName = 'MySheet';
			// 	const workbook = XLSX.utils.book_new();

			// 	XLSX.utils.book_append_sheet(workbook, ws, workSheetName);
			// 	return XLSX.writeFile(workbook, fileName, { type: 'binary' });
			// };
		},

		// 封装mall请求函数
		getMall() {
			getMallList({ params: { mallName: this.input, ...this.pageData } }).then((res) => {
				// 渲染到页面上
				if (res.code === 200) {
					this.mallList = res.data
					this.pagecount = res.count
					console.log('getMallList', res);
				}
			})
		},
		// 切换页码
		changPage(item) {
			this.pageData.page = item
			this.getMall()
		},
		// 搜索
		searchMall() {
			if (this.input == '') {
				this.$message({
					message: '警告哦，内容不为空',
					type: 'warning'
				});
			}
			this.getMall()
		},
		// 添加
		addMall() {
			this.dialogVisible = true
			this.modelMall = 0
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
							this.getMall()
						})
					} else {
						updateMall(this.mallFrom).then(() => {
							this.getMall()
						})
					}
					this.handleClose()
				}
			})
		},
		// 编辑
		handleEdit(item) {
			this.title = '修改商品'
			this.modelMall = 1
			this.dialogVisible = true
			// 深拷贝：对数据内部深处有效的复制
			this.mallFrom = JSON.parse(JSON.stringify(item))
		},
		// 删除
		handleDelete(value) {
			this.$confirm('是否确定关闭').then(() => {
				deleteMall({ id: value.id }).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功'
					})
					this.getMall()
				})
			}).catch(() => { })
		}

	},
	watch: {
		'input': function (newinput) {
			if (newinput == '') {
				this.getMall()
			}
		}
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
		padding: 10px
	}
}
</style>