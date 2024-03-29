# backManagement

#### 软件架构
后台管理系统

#### 技术栈

vue-router -vuex-axios - elemeny-ui-echarts

#### 使用

安装依赖
npm install

启动使用：npm run serve

技术难点：面包屑，登录鉴权



面包屑

![1711621687068](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1711621687068.png)

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

vuex管理js

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

关于tags

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

`vuexindex.js`	mutations操作数据

```
// 删除tags
handleClose(state,value){
    // 判断传递进来的数据是否与breadCrumb的数据一致
    const index = state.breadCrumb.findIndex(item => item.name === value.name )
    state.breadCrumb.splice(index,1)
}
```

