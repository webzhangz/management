import Mock from 'mockjs'

export default {
	getLogin : config =>{
		console.log(config.body);
		const {username,password }= JSON.parse(config.body)
		if(username === 'admin' && password  === 'admin'){
			return {
				code:200,
				data:{
					menu:[
						{
							path:"/",
							name: "home",
							label:"首页",
							icon: "s-home",
							url:"Home/Home"
						},
						{
							path:"/mall",
							name: "mall",
							label:"商品管理",
							icon: "video-play",
							url:"MallManage/MallManage"
						},
						{
							path:"/user",
							name: "user",
							label:"用户管理",
							icon: "user",
							url:"UserManage/UserManage"
						},
						{
							label:"其他",
							icon:"location",
							children: [{
								path: "/page1",
								name: "page1",
								label:"页面1",
								icon:"setting",
								url: "other/Pageone"
							},
							{
								path: "/page2",
								name: "page2",
								label:"页面2",
								icon:"setting",
								url: "other/Pagetwo"
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
							path:"/",
							name: "home",
							label:"首页",
							icon: "s-home",
							url:"Home/Home"
						},
						{
							path:"/mall",
							name: "mall",
							label:"商品管理",
							icon: "video-play",
							url:"MallManage/MallManage"
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