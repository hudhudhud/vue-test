<template>
	<div class="content">
		<transition :name="transitionName">
			<router-view class="child-view"></router-view>
		</transition>
	</div>
</template>

<script>
	export default{
		data(){
			return {transitionName:'out-in'}
		},
		watch:{
			'$route'(to,from){
				this.transitionName=to.name<from.name?'slide-right':'slide-left'
			}
		},
	}
</script>