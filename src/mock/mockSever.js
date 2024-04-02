import Mock  from 'mockjs'
// 把JSON数据格式引入进来[JSON数据格式根本没对外暴露，但可以引入]
// webpack默认对外暴露，图片,JSON数据格式
import home from './home.json'
import User from './user.js'
import licence from './licence'

Mock.mock('/mock/user/add','post',User.createUser)
Mock.mock('/mock/user/update','post',User.updateUser)
Mock.mock('/mock/user/del','post',User.deleteUser)
Mock.mock(/mock\/user\/get/,User.getUserList)

Mock.mock('/mock/login','post',licence.getLogin)
// mock完整数据：第一个参数请求地址    第二个请求数据
Mock.mock('/mock/home/getdata',{code:200,data:home})