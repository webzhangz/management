import Mock from 'mockjs'

function param2Obj(url){
  //get请求从config.url获取参数，post从config.body中获取参数
  const search = url.split('?')[1]
  if(!search){
    return {}
  }  
  return JSON.parse(
    '{"'+
      decodeURIComponent(search)
      .replace(/"/g,'\\"')
      .replace(/&/g,'","')
      .replace(/-/g,'"#"') +
      '"}'
  )
} 
let List =[]
const count=200

for(let i=0;i < count; i++){
  List.push(
    Mock .mock({
      id: Mock.Random.guid(),
      name:Mock.Random.cname(),
      addr: Mock.mock('@county(true)'),
      'age|18-60': 1,
      birth: Mock.Random.date(),
      sex:Mock.Random.integer(0,1)
    })
  )
}
export default {
 /*
  * @param name
  * @return {(code:number,count:number,data:*[])}
 */
 getUserList:config=>{
  const { name,page =1,limit=20 }=param20bj(config.url)
  console.log('±ame:'+ name,'page:'+ page,'分页大小limit:'+ limit)
  const mockList=List.filter(user =>{
    if(name && user.name.lndexOf(name)===-1 && user.address.indexOf(name) === -1)return false
    return true
  })
  const pageList = mockList.filter((item,index)=>index < limit * page && index>= limit *())
  return {
    code:200,
    count:mockList.length,
    list:pageList
  }
},
  // 新增用户
  createUser: config => {
    const{ name, addr, age, birth,sex}= JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    List.unshift({
      id: Mock.Random.guid()
      name: name,
      addr: addr,
      age: age,
      birth: birth,
      sex: sex
    })
    return {
      code:200,
      data:{

      }
    }
  }
}
