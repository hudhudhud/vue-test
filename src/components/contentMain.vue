<template>
	<div class="content">
		<!-- <div>{{path}}</div> -->
		<transition :name="transitionName">
			<router-view class="child-view"></router-view>
		</transition>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				transitionName:'out-in',
				path:this.$route.path,
			}
		},
		watch:{
			'$route'(to,from){
				this.transitionName=to.name<from.name?'slide-right':'slide-left'
			}
		},
	}
</script>