<template>
	<section>
		<!-- <ul class="tabs">
			<li :style="{width:tabWidth+'px'}"><router-link to='/manage/article'>文章管理</router-link></li>
			<li :style="{width:tabWidth+'px'}" v-for="item in tabs"><router-link :to='"/manage/article/catg/"+item.val' >{{item.name}}</router-link></li>
			<li class="active-tab" :style="{transform:'translateX('+tabLeft+'px)',width:tabWidth+'px'}"></li>
		</ul> -->
		<tabs :default-tab="defaultTab" :dis="tabDis" :tabs="tabs" :cb="search"></tabs>
		<div class="search">
			<span>全部(共{{list.length}}条)</span>
			<router-link to='/manage/article/add' class="btnAdd">新建文章</router-link>
			<span class="search-bar"><input type="text" placeholder="标题" v-model="searchQry"><i class="fa fa-search" @click="search(null)"></i></span>
		</div>
		
		<!-- <ul class="articles"> -->
			<transition-group name="list-complete" tag="ul" class="articles">
				<li v-for="(item,i) in list" class="article list-complete-item"  :key="i"  
				><!-- v-if="catg==-1||item.catg==catg" -->
					<router-link :to='{path:"/manage/article/edit/"+item._id}' >
						<p>{{item.title}}</p>
						<img :src="item.coverImg" alt=""  style="width:100%;height:70%">
						<p>更新于 {{item.date}}</p>
					</router-link>
				</li>
			</transition-group>
		<!-- </ul> -->
	</section>
</template>
<script>
import axios from '../assets/js/myaxios'
import common from '../assets/js/common'
import tabs from './tool/tabs.vue'
export default {
	components:{
		tabs,
	},
	data(){
		return {
			defaultTab:{name:'文章管理',path:'/manage/article'},
			tabs:common.catgList.map(item=>{item.path="/catg/"+item.val;return item}),
			list:[],
			tabLeft:0,
			tabDis:50,
			catg:-1,
			searchQry:"",
		}
	},
	methods:{
		search(to,from){
			if(to){
				var catg=to.params.catg
				if(catg){
					this.catg=catg
				}
				else{
					this.catg=-1
				}
			}

			var queryStr=""
			if(this.searchQry){
				queryStr+=`search=${this.searchQry}`
			}
			if(this.catg&&this.catg!=-1){
				queryStr+="&catg="+this.catg
			}
			axios.get(`/manage/article/api?${queryStr}`).then(res=>{
	            this.list=res.data
	            this.list.forEach(item=>{
	            	item.date=item.modifyDate?common.formatDate(new Date(item.modifyDate)):common.formatDate(new Date(item.createDate))
	            })
	        })
		},
	},
	watch: {
	  //   $route (to, from) {
   //      	console.log(to)
   //      	var catg=to.params.catg
   //      	if(!catg)
   //      		this.tabLeft=0
   //      	else{
   //      		this.tabLeft=(catg)*this.tabWidth
   //      	}
			// if(catg){
			// 	this.catg=catg
			// }
			// else{
			// 	this.catg=-1
			// }

			// //搜索
			// var queryStr=""
			// if(this.searchQry){
			// 	queryStr+=`search=${this.searchQry}`
			// }
			// if(this.catg&&this.catg!=-1){
			// 	queryStr+=`&catg=${this.catg}`
			// }
			// axios.get(`/manage/article/api?${queryStr}`).then(res=>{
	  //           this.list=res.data
	  //           this.list.forEach(item=>{
	  //           	item.date=item.modifyDate?common.formatDate(new Date(item.modifyDate)):common.formatDate(new Date(item.createDate))
	  //           })
   //     		})
	  //   }
	},
	mounted(){
		var catg=this.$route.params.catg
		var url='/manage/article/api'
		if(catg){
			this.catg=catg
			if(catg!=-1){
				url+="?catg="+catg
			}
		}
		else{
			this.catg=-1
		}
		axios.get(url).then(res=>{
            this.list=res.data
            this.list.forEach(item=>{
            	item.date=item.modifyDate?common.formatDate(new Date(item.modifyDate)):common.formatDate(new Date(item.createDate))
            })
        })
	},

}
</script>

<style lang="scss" scoped>
@import '../assets/css/common.scss';
@import '../assets/css/font-awesome.min.css';
.content{
	background-color: none;
/*	.tabs{
		position: relative;
		font-size: 0;
		border-bottom:2px solid rgba(0,0,0,0.1);
		li{
			font-size: 15px;
			text-align: center;
			height: 50px;
			line-height: 50px;
			display: inline-block;
			&.active-tab{
				height: 1px;
				position: absolute;
				top:100%;
				left:0;
				transform: translateX(0);
				border-bottom: 2px solid $main-color;
				transition: transform .3s linear;
			}
		}
	}*/
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
	.articles{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		.article{
			box-sizing: border-box;
			padding:0 10px;
			width:200px;
			height: 200px;
			margin:10px;
			background-color: white;
			xtransform: scale(0);
			xopacity:0;
			xtransition: transform .2s linear;
			&:not(:last-child){
				margin-right: 10px;
			}
			p{
				padding:5px 0;
			}
		}
	}
}
.list-complete-item {
  transition: all .3s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  xtransform: translateY(30px);
}
.list-complete-leave-active {
  xposition: absolute;
}
</style>