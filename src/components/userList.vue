<template>
	<section>
		<div class="foo">用户管理</div>
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
			list:["hd","dh","hx","lal"]
		}
	}
}
</script>