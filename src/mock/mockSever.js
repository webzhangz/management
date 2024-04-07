import Mock  from 'mockjs'
// 把JSON数据格式引入进来[JSON数据格式根本没对外暴露，但可以引入]
// webpack默认对外暴露，图片,JSON数据格式
import home from './home.json'
import User from './user.js'
import licence from './licence'
import mall from './mall'
// mock完整数据：第一个参数请求地址    第二个请求数据
Mock.mock('/mock/home/getdata',{code:200,data:home})
// 请求用户
Mock.mock('/mock/user/add','post',User.createUser)
Mock.mock('/mock/user/update','post',User.updateUser)
Mock.mock('/mock/user/del','post',User.deleteUser)
Mock.mock(/mock\/user\/get/,User.getUserList)
//请求登录
Mock.mock('/mock/login','post',licence.getLogin)


//请求mall数据
Mock.mock('/mock/mall/add','post',mall.createMall)
Mock.mock('/mock/mall/update','post',mall.updateMall)
Mock.mock('/mock/mall/del','post',mall.deleteMall)
Mock.mock(/mock\/mall\/get/,mall.getMallList)