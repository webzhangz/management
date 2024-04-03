import Mock from 'mockjs'

export default {
	getLogin : config =>{
		// console.log(config.body);
		const {username,password }= JSON.parse(config.body)
		if(username === 'admin' && password  === 'admin'){
			return {
				code:200,
				data:{
					menu:[
						{
							path:"/home",
							name: "home",
							label:"首页",
							icon: "s-home",
							url:"Home.vue"
						},
						{
							path:"/mall",
							name: "mall",
							label:"商品管理",
							icon: "video-play",
							url:"Mall.vue"
						},
						{
							path:"/user",
							name: "user",
							label:"用户管理",
							icon: "user",
							url:"User.vue"
							
						},
						{
							label:"其他",
							icon:"location",
							children: [{
								path: "/page1",
								name: "page1",
								label:"页面1",
								icon:"setting",
								url: "pageOne.vue"
							},
							{
								path: "/page2",
								name: "page2",
								label:"页面2",
								icon:"setting",
								url: "PageTwo.vue"
							}]
						}
					],
					token:Mock.Random.guid(),
				},
				// token信息
			
				message:'获取成功'
			}
		}else if (username === 'user' && password === '123'){
			return {
				code:200,
				data:{
					menu:[
						{
							path:"/home",
							name: "home",
							label:"首页",
							icon: "s-home",
							url:"Home.vue"
						},
						{
							path:"/mall",
							name: "mall",
							label:"商品管理",
							icon: "video-play",
							url:"Mall.vue"
						}
					],
					// token信息
					Token:Mock.Random.guid(),
					message:'获取成功'
				}
			}
		}else {
			return{
				data:{
					code:404,
					message:'密码错误'
				}
			}	
		}
	}
}