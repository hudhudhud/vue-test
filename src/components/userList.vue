<template>
	<section>
		<tabs :default-tab="defaultTab" :dis="tabDis" :tabs="tabs" :cb="search"></tabs>
		<div class="search">
			<span>全部(共{{list.length}}条)</span>
			<span class="search-bar"><input type="text" placeholder="用户昵称" v-model="searchQry"><i class="fa fa-search" @click="search(null)"></i></span>
		</div>
		<ul>
			<li v-for="item in list">
				<span>{{item}}</span>
			</li>
		</ul>
	</section>
</template>
<script>
import tabs from './tool/tabs.vue'
import common from '../assets/js/common'
export default {
	components:{
		tabs,
	},
	data(){
		return {
			list:["hd","dh","hx","lal"],
			defaultTab:{name:'用户管理',path:'/manage/user'},
			tabs:common.userOrign.map(item=>{item.path="/orign/"+item.val;return item}),
			tabDis:60,
			searchQry:""
		}	
	},
	methods:{
		search(){

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
</style>