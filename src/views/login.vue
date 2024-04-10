<template>
	<div class="login-mall">
		<el-form ref="login" :model="loginFrom" class="login" label-width="80px" :inline="true" :rules="rules">
			<h3 class="login-title">系统登录</h3>
			<div class="usertags"  v-show="isUser">
				<div class="usertags-title">帐号或者密码错误</div>
			</div>
			<el-form-item label="用户名" prop="username">
				<el-input v-model="loginFrom.username" placeholder="请输入账号"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" placeholder="请输入密码" v-model="loginFrom.password"></el-input>
			</el-form-item>
			<div  class="footer">
				<el-form-item>
				<el-button type="primary" @click="submitlogin">登录</el-button>
				<el-button @click="resetForm('ruleForm')">切换登录方式</el-button>
				</el-form-item> 
			</div>
		</el-form>
	</div>
</template>

<script>
import { getLogin } from '@/api';
import Cookies from 'js-cookie'
export default {
	name: 'myLogin',
	data() {
		return {
			isUser:false,
			loginFrom: {
				username: '',
				password: ""
			},
			rules: {
				username: [
					{ required: true, message: '请输入账号名称', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				]
			}
		}
	},
	methods:{
		// 登录按钮
		submitlogin(){
			// 校验表单
			this.$refs.login.validate((boolean)=>{
				if(boolean){
					getLogin({...this.loginFrom}).then((res)=>{
						if(res.code === 200){
							// token信息
							Cookies.set('Token',res.data.token,{expires:1})

							// 将获取到的menu信息存入store
							this.$store.commit("addMenu",res.data.menu)
							// 将获取到的动态路由（this.$router）信息存入store

							this.$store.commit("setRouterMenu",this.$router)
							// 跳转首页
							this.$router.push({path:'/home'})
						}else{
							this.isUser = true
						}
					}).catch((err)=>{
					console.log(err);
					})
				}
			})

		}
	}
}
</script>

<style scoped lang="less">
@media (max-width: 1200px) {
  .login-mall {
		padding-top: 200px;
		background-image: linear-gradient(to top, #c1dfc4 0%, #deecdd 100%);
  }
}

@media (min-width: 1200px) {
  .login-mall {
		padding-top:380px;
		background-image: linear-gradient(to top, #fddb92 0%, #d1fdff 100%);
  }
}
.login-mall{

	width: 100%;
	height: 100vh;
	top: 0;
  left: 0;
	position: relative;
	.usertags{
		margin-bottom:16px;
		box-sizing:inherit;
		height: auto;
		background-color:#FFF6F6;
		border:1px solid #e3e9ed;
		border-radius: 4px;
		box-shadow: 0px 0px 0px 1px #e0b4b4 inset,0px 0px 0px 0px rgba(0,0,0,0);
		.usertags-title{
			padding: 14px 21px;
			color: #c30707;
		}
	}
	.login {
		position: absolute;
			border-radius: 15px;
			width: 350px;

			margin-left: 60%;
			box-shadow: 0 0 25px #b2aeae;
			background-color: #ffffff;
			padding: 35px 35px 15px 35px;
			.login-title {
				text-align: center;
				font-size: 28px;
				margin-bottom: 20px;
			}
			.el-input {
				width: 230px;
			}
			.footer{
				margin-top: 20px;
				display: flex;
				justify-content: center;
			}
	}
}

</style>