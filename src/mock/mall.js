import Mock from 'mockjs'

function param2Obj(url) {
	//get请求从config.url获取参数，post从config.body中获取参数
	const search = url.split('?')[1]
	if (!search) {
		return {}
	}

	return JSON.parse(
		'{"' + decodeURIComponent(search)
			.replace(/"/g, '\\"')
			.replace(/&/g, '","')
			.replace(/=/g, '":"') +
			'"}'
	)
}
let List = []
const count = 100
const products = [
  { name: 'iPhone', category: '电子产品' },
  { name: 'MacBook', category: '电子产品' },
  { name: '电视', category: '家用电器' },
  { name: '洗衣机', category: '家用电器' },
  { name: 'NIKE运动鞋', category: '服装鞋帽' },
  { name: 'T恤', category: '服装鞋帽' },
  { name: '矿泉水', category: '食品饮料' },
  { name: '华为mate60', category: '电子产品' },
  { name: '小说', category: '图书音像' },
  { name: '小米耳机', category: '电子产品' },
  // 更多商品及其分类...
];

for (let i = 0; i < count; i++) {
	List.push(
		// Mock .mock({
		//   id: Mock.Random.guid(),
		//   name:Mock.Random.cname(),
		//   addr: Mock.mock('@county(true)'),
		//   'age|18-60': 1,
		//   birth: Mock.Random.date(),
		//   sex:Mock.Random.integer(0,1)
		// })
		Mock.mock({
			id: Mock.Random.guid(),
			mallName: Mock.Random.pick(products),
			stocks: Mock.Random.natural(0,1000),
			salesVolume: Mock.Random.natural(0,5000),
			price: Mock.Random.natural(0,10000),
			salesPer: Mock.mock('@county(true)') + Mock.Random.cword(5, 10) +'店',
			date: Mock.Random.date() + ' ' + Mock.Random.time(),
		})
	)
}

export default {
	/*
	 * @param name
	 * @return {(code:number,count:number,data:*[])}
	*/
	getMallList: config => {
		// console.log(config.url);
		const { mallName, page = 1, limit = 10 } = param2Obj(config.url)
		// console.log(mallName, page, limit);
		const mockList = List.filter(mall => {
			// console.log(mall);
			if (mallName && mall.mallName.name.indexOf(mallName) === -1 && mall.mallName.category.indexOf(mallName) === -1) { return false }
			return true
		})
		// console.log(mockList);
		const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
		return { 
			code: 200,
			count: mockList.length,
			data: pageList
		}
	},
	createMall: config => {
		const { mallName, stocks, salesVolume,price,salesPer , date} = JSON.parse(config.body)
		// console.log('createMall',JSON.parse(config.body))
		List.unshift({
			id: Mock.Random.guid(),
			mallName: mallName,
			stocks: stocks,
			salesVolume: salesVolume,
			price:price,
			salesPer: salesPer,
			date: date,
		})
		return {
			code: 200,
			data: {
				message: '添加成功'
			}
		}
	},
	deleteMall: config => {
		const { id } = JSON.parse(config.body)
		if (!id) {
			return {
				code: -999,
				message: '参数不正确'
			}
		} else {
			List = List.filter(u => u.id !== id)
			return {
				code: 200,
				message: '删除成功'
			}
		}
	},
	updateMall: config => {
		// console.log(JSON.parse(config.body));
		const {id, mallName, stocks, salesVolume,price,salesPer , date} = JSON.parse(config.body)

		List.some(u => {
			if (u.id === id) {
				u.mallName = mallName
				u.stocks = stocks
				u.salesVolume = salesVolume
				u.price = price
				u.salesPer = salesPer
				u.date = date
				return true
			}
		})
		return {
			code: 200,
			data: {
				message: '编辑成功'
			}
		}
	}
}
