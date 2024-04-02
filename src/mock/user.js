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
const count = 200

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
			name: Mock.Random.cname(),
			address: Mock.mock('@county(true)'),
			'age|18-60': 1,
			date: Mock.Random.date(),
			sex: Mock.Random.integer(0, 1)
		})
	)
}

export default {
	/*
	 * @param name
	 * @return {(code:number,count:number,data:*[])}
	*/
	getUserList: config => {
		// console.log(config.url);
		const { name, page = 1, limit = 20 } = param2Obj(config.url)
		// console.log(name, page, limit);
		const mockList = List.filter(user => {
			// console.log(user);
			if (name && user.name.indexOf(name) === -1 && user.address.indexOf(name) === -1) { return false }
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
	createUser: config => {
		const { name, address, age, date, sex } = JSON.parse(config.body)
		console.log(JSON.parse(config.body))
		List.unshift({
			id: Mock.Random.guid(),
			name: name,
			address: address,
			age: age,
			date: date,
			sex: sex
		})
		return {
			code: 200,
			data: {
				message: '添加成功'
			}
		}
	},
	deleteUser: config => {
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
	batchremove: config => {
		let { ids } = param2Obj(config.url)
		ids = ids.split(',')
		List = List.filter(u => !ids.includes(u.id))
		return {
			code: 200,
			data: {
				message: '批量删除成功'
			}
		}
	},
	updateUser: config => {
		// console.log(JSON.parse(config.body));
		const { id, name, address, age, date, sex } = JSON.parse(config.body)

		const sex_num = parseInt(sex)
		List.some(u => {
			if (u.id === id) {
				u.name = name
				u.address = address
				u.age = age
				u.date = date
				u.sex = sex_num
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
