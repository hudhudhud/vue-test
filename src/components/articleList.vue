<template>
	<section>
		<p>文章管理</p>
		<router-link to='/manage/addArticle' >新建文章</router-link>
		<ul>
			<li v-for="item in list">
				<span>{{item}}</span>
			</li>
		</ul>
	</section>
</template>
<script>
export default {
	data(){
		return {
			list:["啊","啦","啦","啦"]
		}
	}
}
</script>