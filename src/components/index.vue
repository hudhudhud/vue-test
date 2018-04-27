<template>
	<div class="content">
		<section class="user-count">
			<p>今日用户增长情况</p>
			<ul>
				<li>
					<p>新增人数(微信)</p>
					<p class="num">12</p>
				</li>
				<li><p>新增人数(注册)</p>
					<p class="num">32</p>
				</li>
				<li>
					<p>总用户数</p>
					<p class="num">3896</p>
				</li>
			</ul>
		</section>
		<section class="user-love">
			<p>用户喜好情况</p>
			<ul>
				<li>
					<p>美妆</p>
					<p class="num">29.1%</p>
				</li>
				<li>
					<p>美食</p>
					<p class="num">29.1%</p>
				</li>
				<li>
					<p>服饰</p>
					<p class="num">29.1%</p>
				</li>
				<li>
					<p>健身</p>
					<p class="num">29.1%</p>
				</li>
				<li>
					<p>家居</p>
					<p class="num">29.1%</p>
				</li>
			</ul>
		</section>
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
<style scoped>
.user-count,.user-love{
	margin:10px;
	padding:20px;
	box-sizing: border-box;
	background: white;

}
.user-count{
	height: 150px;
}
.user-count ul li{
	width:33%;
	text-align: center;
	padding-top:20px;
}
.user-count ul li .num{
	padding:10px;
	height: 30px;
	line-height: 30px;
	font-weight: bold;
	font-size: 30px;
}
.user-love{
	height: 500px;
}
ul{
	list-style: none;
}
ul li{
	display: inline-block;
}
.user-love li{
	width:100px;
	height: 100px;
	border-radius: 100%;
	text-align: center;
	padding-top:30px;
	box-sizing: border-box;
	background-color: pink;
}
</style>