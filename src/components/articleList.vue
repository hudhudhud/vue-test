<template>
	<section>
		<ul class="tabs">
			<li><router-link to='/manage/article'>文章管理</router-link></li>
			<li v-for="item in tabs"><router-link :to='"/manage/article/catg/"+item.val' >{{item.name}}</router-link></li>
		</ul>
		<router-link to='/manage/article/add' >新建文章</router-link>
		<!-- <transition :name="transitionName">
			<router-view class="child-view"> -->
				<ul class="articles">
					<li v-for="item in list" class="article">
						<router-link :to='{path:"article/edit/"+item._id}' >
							<p>{{item.title}}</p>
							<img :src="item.coverImg" alt=""  style="width:100%;height:70%">
							<p>更新于 {{item.date}}</p>
						</router-link>
					</li>
				</ul>
		<!-- 	</router-view>
		</transition> -->
		
	</section>
</template>
<script>
import axios from '../assets/js/myaxios'
import common from '../assets/js/common'
export default {
	data(){
		return {
			tabs:common.catgList,
			list:[],
			activeTab:-1,
			transitionName:'out-in'
		}
	},
	watch: {
	    $route (to, from) {
	         //var catg=to.params.catg
        	console.log(to)
        	var catg=to.params.catg
        	this.transitionName=to.name<from.name?'slide-right':'slide-left'
        	//this.transitionName=to.name<from.name?'slide-right':'slide-left'
			if(catg){
				//console.log(catg)
				axios.get('/manage/article/api/catg/'+catg).then(res=>{
			 		console.log(res)
	                this.list=res.data
	                this.list.forEach(item=>{
	                	item.date=item.modifyDate?common.formatDate(new Date(item.modifyDate)):common.formatDate(new Date(item.createDate))
	                })
	            })
			}
			else{
				axios.get('/manage/article/api').then(res=>{
			 		console.log(res)
	                this.list=res.data
	                this.list.forEach(item=>{
	                	item.date=item.modifyDate?common.formatDate(new Date(item.modifyDate)):common.formatDate(new Date(item.createDate))
	                })
	            })
			}
	    }
	},
	mounted(){
		var catg=this.$route.params.catg
		console.log(catg)
		if(catg){
			 axios.get('/manage/article/api/catg/'+catg).then(res=>{
		 		console.log(res)
                this.list=res.data
                this.list.forEach(item=>{
                	item.date=item.modifyDate?common.formatDate(new Date(item.modifyDate)):common.formatDate(new Date(item.createDate))
                })
            })
		}
		else{
			 axios.get('/manage/article/api').then(res=>{
		 		console.log(res)
                this.list=res.data
                this.list.forEach(item=>{
                	item.date=item.modifyDate?common.formatDate(new Date(item.modifyDate)):common.formatDate(new Date(item.createDate))
                })
            })
		}
	},
	beforeRouteUpdate(to, from, next) {
         // 在渲染该组件的对应路由被 confirm 前调用
         // 不！能！获取组件实例 `this`
         // 因为当钩子执行前，组件实例还没被创建
       
    },



}
</script>

<style lang="scss">
.content{
	background-color: none;
	.tabs{
		li{
			display: inline-block;
			margin-right: 50px;
		}
		padding-bottom:15px;
		border-bottom:2px solid rgba(0,0,0,0.1);
	}
	.articles{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
		.article{
			padding:10px;
			width:200px;
			height: 200px;
			margin:10px;
			background-color: white;
			&:not(:last-child){
				margin-right: 10px;
			}
		}
	}
}

	
</style>