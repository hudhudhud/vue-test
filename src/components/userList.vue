<template>
	<section>
		<tabs :default-tab="defaultTab" :dis="tabDis" :tabs="tabs" :cb="search"></tabs>
		<div class="search">
			<span>全部(共{{list.length}}条)</span>
			<span class="search-bar"><input type="text" placeholder="用户昵称" v-model="searchQry"><i class="fa fa-search" @click="search(null)"></i></span>
		</div>
		<table class="data-list">
			<tr>
				<td>头像</td>
				<td>昵称</td>
				<td>性别</td>
				<td>生日</td>
				<td>所在地</td>
				<td>手机号</td>
				<td>标签</td>
			</tr>
			<tr v-for="item in list">
				<td><img  class="avatar" :src="item.avatarUrl" alt=""></td>
				<td>{{item.nickName}}</td>
				<td>{{item.gender==1?"男":"女"}}</td>
				<td>{{item.birth}}</td>
				<td>{{item.country}}{{item.province}}{{item.city}}</td>
				<td>{{item.phone}}</td>
				<td>{{item.tags}}</td>
			</tr>
		</table>
	</section>
</template>
<script>
import tabs from './tool/tabs.vue'
import common from '../assets/js/common'
import axios from '../assets/js/myaxios'
export default {
	components:{
		tabs,
	},
	data(){
		return {
			list:[],
			defaultTab:{name:'用户管理',path:'/manage/user'},
			tabs:common.userOrign.map(item=>{item.path="/origin/"+item.val;return item}),
			tabDis:60,
			searchQry:"",
			origin:""
		}	
	},
	mounted(){
		var origin=this.$route.params.origin
		var url='/manage/user/api/list'
		if(origin){
			this.origin=origin
			if(origin!=-1){
				url+="?origin="+origin
			}
		}
		else{
			this.origin=-1
		}
		axios.get(url).then(res=>{
			console.log(res)
            this.list=res.data.users
        })
	},
	methods:{
		search(to,from){

			var origin=to.params.origin
			console.log(111111111,origin)
			var url='/manage/user/api/list'
			if(origin){
				this.origin=origin
				if(origin!=-1){
					url+="?origin="+origin
				}
			}
			else{
				this.origin=-1
			}
			axios.get(url).then(res=>{
	            this.list=res.data.users
	        })
		}
	}
}
</script>
<style lang="scss" scoped>
@import '../assets/css/common.scss';
.search{
	font-size:15px;
	padding: 10px 0;
	.btnAdd{
		background-color: $main-color;
		color:white;
		padding:3px 8px;
		border-radius: 5px;
		margin-left:10px;
	}
	.search-bar{
		position: relative;
		float:right;
		height: 20px;
		input{
			border:none;
			background-color: white;
			border-radius: 5px;
			height: 100%;
			line-height: 20px;
			padding:3px;
		}
		i{
			position: absolute;
			right: 6px;
			color:rgba(0,0,0,0.3);
			line-height: 20px;
			cursor:pointer;
		}
	}
}

.data-list{
	width:100%;
	background-color: white;
	border-collapse:collapse;
	tr{
		text-align: center;
		&:first-child{
			border-bottom:1px solid rgba(0,0,0,0.4);
		};
		td{
			padding:10px 0;
			.avatar{
				width:50px;
				height: 50px;
			}
		}
	}
}	
</style>