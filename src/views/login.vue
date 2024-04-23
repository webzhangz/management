<template>
	<div class="login-mall">
		<div class="login-icon">聚优乐商城订单管理系统</div>

		<div class="login">
			<div class="login-img">
				<img style="width: 600px;height: 400px;" src="../assets/login/login.png" alt="">
			</div>

			<div class="login-form" >
				<div class="login-title">欢迎登录</div>
				<div class="usertags" v-show="isUser">
					<div class="usertags-title">帐号或者密码错误</div>
				</div>
				<div v-show="isReset">
					<el-form ref="login" :model="loginFrom" label-width="80px" :inline="true" :rules="rules">
						<el-form-item label="账户" prop="username">
						<el-input v-model="loginFrom.username" placeholder="请输入账号"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input type="password" placeholder="请输入密码" v-model="loginFrom.password"></el-input>
					</el-form-item>
					<div class="login-checked">
						<el-checkbox v-model="checked" @change="ischecked">记住我</el-checkbox>
					</div>
					<div class="footer">
						<el-form-item>
							<el-button type="primary" @click="submitlogin">登录</el-button>
							<el-button @click="resetForm">切换登录方式</el-button>
						</el-form-item>
					</div>
					</el-form>
				</div>
				<div v-show="!isReset">
					<div class="login-input">
						<input  type="number" name="number" v-model="loginTel.Tel" placeholder="请输入手机号">
					</div>
					<div class="login-input">
						<input type="number" name="IdCode"  v-model="loginTel.IdCode"  placeholder="请输入验证码">
						<span herf="javascript:;" @click="getIdCode"> {{ countdown > 0 ? `${countdown} 秒` : '获取验证码' }}</span>
					</div>
					<div>
						<div class="footer">
							<el-button type="primary" @click="submitloginTel">注册/登录</el-button>
							<el-button @click="resetForm">切换账号</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getLogin } from '@/api';
import Cookies from 'js-cookie'
export default {
	name: 'myLogin',
	data() {
		return {
			// 验证码倒计时
			countdown:0,
			checked: false,
			isReset: true,
			isUser: false,
			loginTel: {
				Tel: '',
				IdCode: ''
			},
			loginFrom: {
				username: '',
				password: "",
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
	methods: {
		// 登录按钮
		submitlogin() {
			// 校验表单
			this.$refs.login.validate((boolean) => {
				if (boolean) {
					getLogin({ ...this.loginFrom }).then((res) => {
						if (res.code === 200) {
							// token信息
							Cookies.set('Token', res.data.token, { expires: 1 })

							// 将获取到的menu信息存入store
							this.$store.commit("addMenu", res.data.menu)
							// 将获取到的动态路由（this.$router）信息存入store

							this.$store.commit("setRouterMenu", this.$router)
							// 跳转首页
							this.$router.push({ path: '/home' })
						} else {
							this.isUser = true
						}
					}).catch((err) => {
						console.log(err);
					})
				}
			})

		},
		// 获取验证码
		getIdCode(){
			if(this.countdown > 0)return
			this.countdown = 60

			const intervalId = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown -= 1;
					if(this.countdown == 50){
						alert("验证码为4210")	
					}
        } else {
          clearInterval(intervalId);
          this.loginTel.IdCode = ''; // 重置验证码
        }
      }, 1000)

		},
		// 手机登录
		submitloginTel(){
			getLogin({ ...this.loginTel}).then((res) => {
						if (res.code === 200) {
							// token信息
							Cookies.set('Token', res.data.token, { expires: 1 })
							// 将获取到的menu信息存入store
							this.$store.commit("addMenu", res.data.menu)
							// 将获取到的动态路由（this.$router）信息存入store

							this.$store.commit("setRouterMenu", this.$router)
							// 跳转首页
							this.$router.push({ path: '/home' })
						} else {
							this.isUser = true
						}
					}).catch((err) => {
						console.log(err);
					})

		},

		ischecked() {
			console.log(this.checked);
			if (this.checked) {
				Cookies.set('username', this.loginFrom.username, { expires: 1 })
			} else {
				Cookies.remove('username')
			}
		},
		// 切换登录
		resetForm() {
			this.isReset = !this.isReset
		}
	},
	mounted() {
		if (!this.checked && Cookies.get('username')) {
			this.checked = true
			this.loginFrom.username = Cookies.get('username')
		}
	}
}
</script>

<style scoped lang="less">
@media (max-width: 1200px) {
	.login-mall {
		background-image: linear-gradient(to top, #c1dfc4 0%, #deecdd 100%);
	}
}

@media (min-width: 1200px) {
	.login-mall {
		background-image: linear-gradient(to top, #fddb92 0%, #d1fdff 100%);
	}
}
// 移除input的number默认方向键
input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
-webkit-appearance: none !important;
margin: 0; 
}                                                                                 // chrome

input[type="number"]{-moz-appearance:textfield;}   // Firefox

.login-mall {
	display: flex;
	width: 100%;
	height: 100vh;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	.login-icon {
		text-align: center;
		// width: 350px;
		margin-bottom: 20px;
		font-size: 28px;
		font-weight: 800;
		margin-bottom: 25px;
	}

	.usertags {
		margin-bottom: 16px;
		box-sizing: inherit;
		height: auto;
		background-color: #FFF6F6;
		border: 1px solid #e3e9ed;
		border-radius: 4px;
		box-shadow: 0px 0px 0px 1px #e0b4b4 inset, 0px 0px 0px 0px rgba(0, 0, 0, 0);

		.usertags-title {
			padding: 14px 21px;
			color: #c30707;
		}
	}

	.login {
		
		border-radius: 15px;
		display: flex;
		height: 400px;
		box-shadow: 0 0 25px #b2aeae;
		background-color: #ffffff;
		padding: 30px 20px 10px 20px;
		.login-input{
			box-sizing:border-box;
			padding: 16px 20px 15px 20px;
			width: 340px;
			border-radius:4px; 
			height: 50px;
			background: #F5F6F8;
			position: relative;
			margin: 0px 10px 0 10px;
			input{

				position: absolute;
				left: 20px;
				top: 50%;
				transform: translateY(-50%);
				outline: none;
				border: none;
				background: #F5F6F8;
				font-size: 14px;
			}

			span{
				position: absolute;
				top: 16px;
				right: 20px;
				height: 19px;
				line-height: 19px;
				font-size: 12px;
				color: #2D313E;
				letter-spacing: 0;
				text-align: right;
				cursor: pointer;
				user-select: none;
			}
		}
		.login-input:nth-child(2){
				margin-top: 20px;
				margin-bottom: 30px;
			}
		.login-img {
			position: relative;

			img {
				border-radius: 15%;
			}
		}

		.login-img:after {
			position: absolute;
			content: '';
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			box-shadow: 0 0 50px 50px #ffffff inset;
		}

		.login-form {
			padding: 10px;
			width: 350px;
			margin-left: 20px;
			border-left: 1px solid #c9c8c8;
			display: flex;
			justify-content: center;

			flex-direction: column;

			.login-checked {
				width: 80px;
				margin-left: 25px
			}

			.login-title {
				text-align: center;
				font-size: 16px;
				margin-bottom: 20px;
			}

			.el-input {
				width: 230px;
			}

			.footer {
				margin-top: 20px;
				display: flex;
				justify-content: center;
			}
		}

	}
}
</style>