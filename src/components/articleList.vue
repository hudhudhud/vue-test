<template>
	<section>
		<p>文章管理</p>
		<router-link to='/manage/article/add' >新建文章</router-link>
		<ul class="articles">
			<li v-for="item in list" class="article">
				<p>{{item.title}}</p>
				<img :src="item.coverImg" alt=""  style="width:100%;height:70%">
				<p>更新于 {{item.modifyDate?item.modifyDate:item.createDate}}</p>
			</li>
		</ul>
	</section>
</template>
<script>
import axios from '../assets/js/myaxios'
export default {
	data(){
		return {
			list:[]
		}
	},
	mounted(){
		 axios.get('/manage/article/api').then(res=>{
		 		console.log(res)
                this.list=res.data
            })
	}

}
</script>

<style lang="scss">
.content{
	background-color: none;
	.articles{
	display: flex;
	flex-direction: row;
		.article{
			padding:10px;
			width:20%;
			height: 200px;
			background-color: white;
			&:not(:last-child){
				margin-right: 10px;
			}
		}
	}
}

	
</style>