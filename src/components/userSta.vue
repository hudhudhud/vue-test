<template>
	<section>
		<div class="foo">用户分析</div>
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
			list:["1","2","3","4"]
		}
	}
}
</script>