// import requests from "./requests";



// 请求首页数据:正式环境
// export const getData = ()=>{
// 	// 发请求  axios发请求是Promise对象
// 	return requests({
// 		url:'/home/getData',
// 		method:'GET'
// 	})
// }

import mockreq from './mockaxios'
// 模拟1环境
export const getData = ()=> mockreq.get('/home/getdata')	

// axios传参需要一个params对象
export const getUserList = (params)=> mockreq.get('/user/get',params)

export const createUser = (data)=> mockreq.post('/user/add',data)	

export const updateUser = (data)=> mockreq.post('/user/update',data)	

export const deleteUser = (data)=> mockreq.post('/user/del',data)	


// Login
export const getLogin = (data)=> mockreq.post('/login',data)	


// 模拟商品获取
export const getMallList = (params)=> mockreq.get('/mall/get',params)

export const createMall = (data)=> mockreq.post('/mall/add',data)	

export const updateMall = (data)=> mockreq.post('/mall/update',data)	

export const deleteMall = (data)=> mockreq.post('/mall/del',data)	