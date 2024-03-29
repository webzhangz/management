<template>
	<div >

		<el-row>
			<el-col :span="8">
					<el-card class="box-card" >
						<div  class="user">
							<img class="user-img" src="../assets/images/headphoto.png" alt="">
							<div class="user-info">
								<p class="name">Admin</p>
								<p class="access">超级管理员</p> 
							</div>
						</div>
						<div class="login">
							<p>上次登录的时间：<span>2024-03-21</span></p>
							<p>上次登录的地点：<span>广州</span></p>
						</div>
					</el-card>
					<el-card class="lab-card" style="height: 457px;">
						<el-table :data="tableData" style="width: 100%">
							<!-- 优化表格内部数据--由数据自动生成 -->
							<!-- <el-table-column 
								prop="name" 
								label="手机" >
							</el-table-column>
							<el-table-column 
								prop="todayBuy" 
								label="今日销量" >
							</el-table-column>
							<el-table-column 
								prop="monthBuy" 
								label="本月销量" >
							</el-table-column>
							<el-table-column 
								prop="totalBuy" 
								label="总计购买" >
							</el-table-column> -->
							<!-- 1value值，2key属性 -->
							<el-table-column v-for="(value,key) in tableTitle" :key="key" :prop="key" :label="value" >

							</el-table-column>

						</el-table>
					</el-card>
			</el-col>
			<el-col :span="16" >
				<div class="right-card">
					<el-card v-for="item in countData " :key="item.name" :body-style="{display:'flex', padding:0}">
						<i :class="`el-icon-${item.icon}`" class="right-icon" :style="{background:item.color}"></i>
						<div class="right-title">
							<p class="num">￥{{ item.value }}</p>
							<p class="title">{{ item.name }}</p>
						</div>
					</el-card>
				</div>
				<el-card style="height: 280px;margin-left: 20px;">
						<!-- 折线图 -->
						<div ref="lineEcharts" style="height: 250px;z-index: 9999;"></div>
					</el-card>
					<div class="right-charts">
						<el-card style="height: 280px">
							<!-- 柱状图 -->
							<div ref="barEcharts" style="height: 250px;z-index: 9999;"></div>
						</el-card >
						<el-card style="height: 280px">
							<div ref="pieEcharts" style="height: 250px;z-index: 9999;"></div>
								<!-- 饼图 -->
						</el-card>
					</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { getData } from '@/api';

	import * as echarts from 'echarts'
	import 'echarts/lib/component/grid'

	export default {
		name:'myHome',
		data(){
			return {
				tableData:[],
				tableTitle:{
					name:'品牌',
					todayBuy:'今日销量',
					monthBuy:'本月销量',
					totalBuy:'总计购买'
				},
				countData:[
					{
						name:'今日支付订单',
						value:1234,
						icon:'success',
						color:'#2ec7c9'
					},
					{
						name:'今日收藏订单',
						value:22222,
						icon:'star-on',
						color:'#f1881f'
					},					{
						name:'今日未支付订单',
						value:3333,
						icon:'circle-close',
						color:'#0a6fe2'
					},					{
						name:'本月支付订单',
						value:44444,
						icon:'success',
						color:'#2ec7c9'
					},					{
						name:'本月收藏订单',
						value:55555,
						icon:'star-on',
						color:'#f1881f'
					},					{
						name:'本月未支付订单',
						value:88888,
						icon:'circle-close',
						color:'#0a6fe2'
					}
				]
			}
		},
		mounted(){
			let res = getData()
			res.then((res) => {
				// console.log(res);
				if(res.code === 200){
					this.tableData =  res.data.tableData
				}
				// 获取折线图
				const lineEcharts = echarts.init(this.$refs.lineEcharts)
				const eoption = {}
				const {orderData} = res.data

				const xAxisData = {data:Object.keys(orderData.data[0])}
				// X轴
				eoption.xAxis = {data : orderData.date}
				// 提示框
				eoption.tooltip={},
				// 图例
				eoption.legend = xAxisData
				// Y轴
				eoption.yAxis = {}
				//获取数据集
				eoption.series = []
				xAxisData.data.forEach(key =>{
					// console.log(key);
					eoption.series.push({
						name:key,
						data:orderData.data.map(item => item[key]),
						type:'line'
					})
				})
				// console.log(eoption);
				// 使用刚指定的配置项和数据显示图表。
				lineEcharts.setOption(eoption);

				// 设置柱状图
				const barEcharts = echarts.init(this.$refs.barEcharts)
				const {userData} = res.data
				const barOption = {
					legend:{
						data:['活跃用户','新增用户'],
					},
					grid:{
						left:'20%'
					},
					xAxis : [
					{ 
						type: 'category',
						data:userData.map(item => item.date)
					}
					],
					yAxis : [
						{type:'value'}
					],
					tooltip : {
						trigger:'axis'
					},
					series:[
						{
							type:'bar',
							name:'活跃用户',
							data:userData.map(item => item.active)
						},
						{
							type:'bar',
							name:'新增用户',
							data:userData.map(item => item.new)
						}
					]
				}
				// console.log(barSeries);
				// console.log(barOption);
				barEcharts.setOption(barOption)

				// 饼图
				const pieEcharts = echarts.init(this.$refs.pieEcharts)
				const {videoData} = res.data
				const pieOption = {
					legend: {
						orient: 'vertical',
						left: 'left'
					},
					tooltip:{
						trigger: 'item'
					},
					series:[
						{
							type:'pie',
							data:videoData,
							radius: '60%'
						}
					]
				}
				// console.log(videoData);
				pieEcharts.setOption(pieOption)

			}).catch((err) => {
				console.log(err);
			});
		}
	}
</script> 

<style lang="less">  
.user{
	display: flex;
	align-items: center;
	padding-bottom: 20px;
	margin-bottom: 20px;
	border-bottom: 1px solid #ced1d4;
	.user-img{
		margin-right: 40px;
		vertical-align: middle;
		width: 150px;
		height: 150px;
		border-radius: 50%;
	}
	.user-info{
		.name {
			font-size: 30px;
			margin-bottom: 10px;
		}
		.access {
			color: #979797;
		}
	}

}
.login{
	p{
		line-height: 28px;
		font-size: 14px;
		color: #979797;
		span {
			color: #676363;
			margin-left: 30px;
		}
	}

}
.lab-card{
	margin-top: 20px;
	height: auto;
}
.right-card{
	/* 并称两排 */
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-left: 20px;
	.el-card{
		margin-bottom: 10px;
		width: 32%;
		.right-icon{
			width: 80px;
			height: 80px;
			font-size: 30px;
			text-align: center;
			line-height: 80px;
			color: rgb(255, 255, 255);
		}
		.right-title{		
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 15px;
			padding: 10px 0;
			.num{
				font-size: 30px;
				line-height: 30px;
				height: 30px;
				margin-bottom: 10px;
			}
			.title{
				font-size: 14px;
				color: #aaa7a7;
				text-align: center;
			}
		}
	}
}
.right-charts{
	display: flex;
	justify-content: space-between;
	margin: 20px 0 0 20px;
	.el-card{
		width:48%;
	}
}
</style>