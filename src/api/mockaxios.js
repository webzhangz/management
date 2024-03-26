import axios from "axios";

const mockreq = axios.create({
	baseURL:'/mock',
	timeout:5000
})

mockreq.interceptors.request.use(config =>{
	console.log('请求拦截器触发');
	return config
})
// 返回promise对象
mockreq.interceptors.response.use((res) =>{
	console.log('响应拦截器触发');
	return res.data
},()=>{
	return Promise.reject(new Error('false'))
})
export default mockreq