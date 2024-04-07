#### 后台管理系统
![1712456306153](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1712456306153.png)

##### 提示：管理员登录：admin --- - admin  	用户登录：user --- 123

##### 技术栈

vue-router -vuex-axios - elemeny-ui-echarts

##### 使用

安装依赖：npm install

启动使用：npm run serve

##### 目录结构

```
├── /dist/         		 	# 项目打包后的文件
├── /public/        	 	# 入口目录
│ ├── /index.html/       	# 入口文件
├── /src/            	 	# 源码目录
│ ├── /api/          	 	# API请求(真实/mock请求)
│ ├── /assets/       		# 组件静态资源(图片)
│ ├── /components/  		# 组件
│ ├── /router/       		# 路由配置
│ ├── /store/         		# vuex状态管理
│ ├── /views/        		# 路由组件(页面维度)
│ ├── /mock/       			# mock接口配置文件
│ ├── App.vue       		# 组件入口
│ └── main.js        		# 程序入口
├── babel.config.js  		# ES6语法编译配置
├── package-lock.json		#包的版本号
├── package.json     		# 项目依赖
└── README.md        		# 项目全局配置
```

##### 完成功能

-  登录 -- 完成
-  路由拦截 -- 完成
- 首页图表可视化 ---- 完成
-  商品管理（增加、编辑、搜索、删除） -- 即将完成
-  用户管理（增加、编辑、搜索、删除、数据权限、刷新缓存） -- 完成
-  权限管理（增加、编辑、搜索、删除、配置权限） -- 完成

###### 登录

![1712457029272](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1712457029272.png)

###### 首页截图

![1712456958962](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1712456958962.png)

###### 用户管理

**![1712457002715](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1712457002715.png)**

##### 逻辑说明

###### 面包屑

右侧导航栏跳转时需要出现面包屑，删除时需要跳转到另一个页面，这里默认最后一个

1、利用vuex的state来记录当前的路由数据，

```
state : {
		// 面包屑
		breadCrumb:[
			{
				path:"/",
				name: "home",
				label:"首页",
				icon: "s-home",
				url:"Home/Home"
			}
		]
	},
```

2、当左侧的导航栏跳转时，不光是要用路由跳转同时还需要给vuex发送当前的数据

```javascript
methods:{
clickMenu(target){
    // 若是觉得这种比较麻烦可以使用router.js的重写vueRouterpush和replace方法
//跳转路由
    this.$router.push({path:target.path})
    //逻辑判断是不是跳转的是首页跳转
// if(this.$route.path !== target.path && !(this.$route.path === '/home' && 	(target.path === '/'))){
    // 	this.$router.push({path:target.path})
    // }
//向vue的mutations发送数据
    this.$store.commit('changeCrumb',target)
},
```

`store.js`	

```
// 更新面包屑数据
changeCrumb(state,value){
    // console.log(state,value);
    const index = state.breadCrumb.findIndex(item => item.name === value.name)
    if(index === -1){
        state.breadCrumb.push(value)
    }
},
```

3、面包屑通过mapstate截取数据vuex中的state数据

```vue
<el-breadcrumb  separator="/">
			<el-breadcrumb-item  v-for="item in crumb" :key="item.name" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
		</el-breadcrumb>


computed:{
    ...mapState({
        crumb:state => state.header.breadCrumb
    })
}
```

如果需要高亮显示可以设置样式

```css
// deep样式穿透
:deep(.el-breadcrumb__item) {
    .el-breadcrumb__inner {
        // &是作为并且
        &.is-link{
            color:#6c6a6a
        }
    }
    // 选择最后一个样式
    &:last-child{
        .el-breadcrumb__inner{
            color: #ffffff;
        }
    }
}
```

nav随着面包屑和tags的跳转而变动，只需要判断当前router值

```
:default-active="isColor"

isColor(){		
    return this.$route.name
}
```

###### 关于tags

用mapState截取vuex中的数据、展示

```
<el-tag
//closable根据state的name值判断是否高亮,effect判断显示颜色
    v-for="(item) in tags"
    :key="item.name"
    :effect="$route.name === item.name ? 'dark' : 'plain'" 
    :closable="item.name !== 'home'"
    @click="clickTags(item)"
    @close="closeTags(item)"
    >
        {{item.label}}
</el-tag>
```

点击tags跳转至目标页面

```
clickTags(item){
    // 第一种方式：path
    // this.$router.push(item.path)
    // 第二种方式：name
    this.$router.push({name:item.name})
    // console.log(item);
},
```

点击x删除tags，并自动跳转右边的tags

```
// 点击关闭tags,删除功能
closeTags(item){
    this.$store.commit('handleClose',item)
    // 读取点击删除的是第几个按钮
    const leg = this.tags.length - 1
    // console.log(leg);
    // 如果删除的不是当前的，直接删除
    if(item.name !== this.$route.name ){
        return
    }else{
        this.$router.push({
            name:this.tags[leg].name
        })
        // console.log(leg , index);
    }
}
```

`store.js`	mutations操作数据

```
// 删除tags
handleClose(state,value){
    // 判断传递进来的数据是否与breadCrumb的数据一致
    const index = state.breadCrumb.findIndex(item => item.name === value.name )
    state.breadCrumb.splice(index,1)
}
```

##### 用户页面：

用户增删改查作用

​	新增提示框和编辑提示框复用同一个，modalType字段表示

​	用户加载页面：mounted发请求获取最新的数据；封装成一个函数方法

```
getUser() {
//input 搜索时传参，改变页码时传参
    getUserList({params:{...this.input,...this.pageData}}).then((result) => {
        if (result.code == 200) {
            // console.log(result);
            this.UserList = result.data
            this.pagecount = result.count
        }
    })
},
```

​	用户提示框，提交form发post请求（需要判断modaltype字段区分编辑还是新增）之后调用不同接口获取

ps：如果时编辑状态下需要将数据进行深度拷贝

​	关闭提示框时需要清空form数据：封装在关闭时触发的方法this.$refs.userForm.resetFields()方法

​	改变页码：记录当前的条数，点击时获取点击页码，之后重新调用getUser接口

##### 封装请求接口API

由于没有后端接口，这里采取mock模拟

大致流程,	封装发请求----创建aixos/拦截器

封装API

```
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

// axios传参接收params对象（具体根据后端文档
export const getUserList = (params)=> mockreq.get('/user/get',params)

export const createUser = (data)=> mockreq.post('/user/add',data)	

export const updateUser = (data)=> mockreq.post('/user/update',data)	
export const deleteUser = (data)=> mockreq.post('/user/del',data)	
```

创建aixos/拦截器

```
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
```

##### 登录

思路，用户登录发请求获取到专属token（临时将token的值存入cookie），如果token不对则返回密码错误，密码正确跳转到home首页，对于菜单的数据在不同页面之间的数据通信采取存放到store中

1.不同的账号登录，会有不同的菜单权限

​		比如管理员和用户的菜单是不一样的，我们可以借助vuex存放数据

登录页面：

```
getLogin({...this.loginFrom}).then((res)=>{
if(res.code === 200){
    // token信息
    Cookies.set('Token',res.data.token,{expires:3})
    console.log('res',res);
    // 跳转首页
    this.$router.push({name:'home'})
    // 将获取到的menu信息存入store
    this.$store.commit("addMenu",res.data.menu)
    // 将获取到的动态路由（this.$router）信息存入store
    this.$store.commit("setRouterMenu",this.$router)

}else{
    this.isUser = true
}
}).catch((err)=>{
console.log(err);
})
```

`store.js`中

```
// 设置menu数据
addMenu(state,value){
    state.menuData = value
    // 存入menu缓存
    Cookies.set("menu",JSON.stringify(value))
    // console.log(state.menuData,value);
},
```

但是vuex中的数据是存放在内存中，刷新会显示空白所以就要进行缓存

CommonNav.vue

```
menuData(){
    // 判断当前数据，如果缓存中没有，则从store中获取
return JSON.parse(Cookies.get('menu')) ||  this.$store.state.navtab.menuData
}
```

2.通过url输入地址来显示页面

​	针对权限不同，地址获取也要不同

​	这个系统采取在vuex中设置动态路由 -登陆时存放---store拼接动态路由

```
mutations : {
// 动态注册路由
setRouterMenu(state,router){
    // 1判断缓存中是否有数据,有则取
    if(!Cookies.get('menu')) return
    const menu = JSON.parse(Cookies.get('menu'))
    state.menuData = menu

    //2 组装动态路由的数据
    const menuArr =  []
    menu.forEach(item => {
    // console.log(state);

        // 有子菜单情况
        if(item.children){
            item.children = item.children.map(val => {
                // 动态添加子路由 
                item.component = ()=> import(`../views/${val.url}`)
                return val
            })
            menuArr.push(...item.children)
        // 没有子菜单情况	
        }else {
            item.component = ()=> import(`../views/${item.url}`)
            menuArr.push(item)
        }
    });
    menuArr.forEach(index => {
        // console.log(menuArr,'idnex');
        //设置动态路由跳转
        router.addRoute('Main',index)
    })
}
}
```

登录后刷新获取不到路由：原因，这是我们存放的数据是在store中，但是初始化时不会渲染router，所以需要在main.js文件中加载一遍这个方法