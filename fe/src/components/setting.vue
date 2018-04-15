<template>
	<div class="settting">
		<vTopNav></vTopNav>
		<div class="main-content">
			<div class="person-setting">
				<h2>个人信息</h2>
				<div>用户名：{{username}}</div>
				<div>权限：管理员权限</div>
				<div>注册时间：{{registerTime}}</div>
			</div>
		</div>	
	</div>
</template>

<style scope lang='scss'>

.person-setting{
	width:600px;
	margin:0 auto;
	background-color: #f1f1f1;
	padding:20px 0  100px;
	h2{
		text-align: center;
	}
	div{
		margin-top: 20px;
	}
}

</style>

<script>
import vTopNav from './topNav.vue';
import {getStore,fetch} from '../common/util.js'
export default {
	data(){
		return {
			username:getStore('adminUsername'),
			registerTime:null
		}
	},
	mounted(){
		let that = this;
		fetch('queryUserList',{
			username:that.username
		},res=>{
			that.registerTime = res.data.list[0].registerTime
		})
	},
	methods: {

	},
	components: {
		vTopNav
	},
	directives: {

	},
	filters: {

	},
	computed: {

	},
	watch: {

	}
}
</script>
