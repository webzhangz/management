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