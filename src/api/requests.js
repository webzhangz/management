import axios from "axios";

const requests = axios.create({
	baseURL:'/api',
	timeout:5000
})

requests.interceptors.request.use(config =>{
	console.log('请求拦截器触发');
	return config
})
// 返回promise对象
requests.interceptors.response.use(res =>{
	console.log('响应拦截器触发');
	return res.data
},(err)=>{
	console.log(err);
	return Promise.reject(new Error('false'))
})
export default requests