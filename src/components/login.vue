<template>
	<div class="login">
			<div>
				<label>用户名：</label>
				<input type="text" name="name" v-model="name">
			</div>
		 	<div>
		 		<label>密码：</label>
		 		<input type="password" name="pwd" v-model="pwd">
		 	</div>
	   		<button @click="submit">登录</button>
	   		<p  v-if="msg" class="msg">{{msg}}</p>
	   		<p  v-if="err" class="err">{{err}}</p>
	   </form>
	</div>
</template>
<script>
import axios from '../assets/js/myaxios'
export default {
	data(){
		return {
			name:"",
	     	pwd:"",
	     	msg:"",
	     	err:"",
	     	day:0,
		}
	},
	created:function(){
    	axios.get("/login/api").then(res=>{
    		if(res.data.user){
    			this.name=res.data.user.name
    			this.day=Math.ceil((Date.now()-Date.parse(res.data.user.regidate))/3600/24/1000)
    			this.isLogin=true
    			this.$emit('login',{user:res.data.user})
    			console.log('logined')
    		}
    		else{
    			console.log('no login')
    		}
    	})
    },
	methods:{
		submit(){
    		axios.post('/login/api', {
			    name: this.name,
			    pwd: this.pwd,
			  })
			  .then((res)=>{
			  	if(res.data){
			  		this.msg=res.data.msg
			  		this.err=res.data.err
			  		if(res.data.user&&res.data.user.regidate){
			  			this.day=Math.ceil((Date.now()-Date.parse(res.data.user.regidate))/3600/24/1000)
			  		}
			  		if(!this.err)
			  			this.$emit('login',{user:res.data.user})
			  	}
			  	console.log(res.data)
			    //this.$router.push({path:"/"})
			  })
			  .catch(function (error) {
			    console.log(error);
			  });

    	},
    	loginout(){
    		axios.get('/login/out').then(res=>{
    			this.msg=res.msg
    		})
    	}
	}
}
</script>
<style scoped lang="scss">
	@import '../assets/css/common.scss';
	.login{
		width:400px;
		height: 200px;
		background-color:$main-color;
		box-shadow: 5px 5px 20px -3px;
		margin:auto;
		margin-top:100px;
		text-align: center;
		padding:50px;
	}
	.login div label{
		display: inline-block;
		width:100px;
	}
	.login input{
		width:200px;
		height: 25px;
		outline: none;
		border:none;
		background-color: white;
		margin-top:30px;
	}
	.login button{
		margin-top:30px;
		width:100px;
		height: 30px;
	}
	.msg{
		color:green;
	}
	.err{
		color:red;
	}
</style>