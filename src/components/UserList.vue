<template>
	<div class="userlist">
		<el-table
			
      style="width: 100%">
			<el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
			<el-table-column
        prop="name"
        label="年龄"
        width="180">
      </el-table-column>
			<el-table-column
        prop="name"
        label="性别"
        width="180">
      </el-table-column>
			<el-table-column
        prop="name"
        label="出生日期"
        width="180">
      </el-table-column>      
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button
						@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button
						type="danger"
						@click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
    </el-table>
	</div>	
</template>

<script>
import { getUser } from '@/api';

	export default {
		name:'UserList',
		data(){
			return {
				UserList:[]
			}
		},
		mounted(){
			getUser().then((result) => {
				this.UserList = result.data
				console.log(result);
			}).catch((err) => {
				console.log(err);
			});
			// getUser()
		}
	}
</script>

<style>

</style>