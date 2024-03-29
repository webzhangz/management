<template>
	<div class="layout">
		<UserHeader/>
		<UserList />
	</div>	
</template>

<script>
import UserHeader from '@/components/UserHeader.vue';
import UserList from '@/components/UserList.vue';

	export default {
		name:'myUser',
		components:{
			UserList,
			UserHeader
		}
	}
</script>

<style>

</style>