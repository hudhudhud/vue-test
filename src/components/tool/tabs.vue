<template>
	<ul class="tabs">
		<li :style="{marginRight:dis+'px'}" ref="li-0"><router-link :to='defaultTab.path'>{{defaultTab.name}}</router-link></li>
		<li :style="{marginRight:dis+'px'}"  :ref="'li-'+(i+1)" v-for="(item,i) in tabs"><router-link :to='defaultTab.path+item.path' >{{item.name}}</router-link></li>
		<li class="active-tab" :style="{transform:'translateX('+tabLeft+'px)',width:activeWidth+'px'}"></li>
	</ul>
</template>
<script type="text/javascript">
	export default {
		props:["defaultTab","tabs","dis","cb"],
		data(){
			return {
				tabLeft:0,
				currentTab:-1,
				activeWidth:0
			}
		},
		mounted(){
			this.activeWidth=this.$refs["li-0"].offsetWidth
		},
		watch:{
			 $route (to, from) {
			 	var index=0
			 	if(to.path==this.defaultTab.path){
			 		this.tabLeft=0
			 		this.activeWidth=this.$refs["li-0"].offsetWidth
			 	}
			 	else{
			 		var self=this
			 		var tab=this.tabs.find(a=>(this.defaultTab.path+a.path)==to.path)
			 		index=this.tabs.indexOf(tab)+1
			 		this.activeWidth=this.$refs["li-"+index][0].offsetWidth
			 		this.tabLeft=(new Array(index)).fill(true).reduce((res,item,i)=>{
			 			if(i==0)
			 				res+=self.dis+self.$refs["li-"+i].offsetWidth;
			 			else
			 				res+=self.dis+self.$refs["li-"+i][0].offsetWidth;
			 			return res},0)
			 	}
			 	if(typeof this.cb=="function"){
			 		this.cb(to,from)
			 	}
			}
		}

	}
</script>
<style lang="scss" scoped>
@import '../../assets/css/common.scss';
.tabs{
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
}
</style>