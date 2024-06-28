<template>
	<div class="Mall">
		<div class="header-mall">
			<Malldalog ref="dalog" v-on:sendMall="sendMall"></Malldalog>
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
						<el-button @click="$refs.dalog.handleEdit(scope.row)" size="small">编辑</el-button>
						<el-button type="danger" @click="handleDelete(scope.row)" size="small">下架</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination style="" class="footer-page" @current-change="changPage" layout="prev, pager, next" :total="pagecount">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import Malldalog from '../views/Malldalog.vue'
import {  getMallList, deleteMall } from '@/api';
import * as XLSX from 'xlsx';

export default {
	name: 'myMall',
	data() {
		return {
			input: '',
			mallList: [
			],
			pagecount: 1,
			pageData: {
				page: 1,
				limit: 10,
			},

		}
	},
	components:{
		Malldalog
	},
	mounted() {
		this.getMall()
		console.log(this.mallList);
	},
	methods: {
		addMall(){
			this.$refs.dalog.addMall()
		},
		sendMall(){
			this.getMall()
		},

		// 导出excel回调
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

		// 删除
		handleDelete(value) {
			this.$confirm('是否确定下架').then(() => {
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

	}
}
</style>