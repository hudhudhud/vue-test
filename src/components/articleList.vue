<template>
	<section>
		<div class="foo">文章管理</div>
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