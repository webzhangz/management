import Mock  from 'mockjs'
// 把JSON数据格式引入进来[JSON数据格式根本没对外暴露，但可以引入]
// webpack默认对外暴露，图片,JSON数据格式
import home from './home.json'
import User from './user.json'

Mock.mock('/mock/user',{code:200,data:User})
// mock完整数据：第一个参数请求地址    第二个请求数据
Mock.mock('/mock/home/getdata',{code:200,data:home})