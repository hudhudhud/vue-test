<template>
	<div id="app">
		 	用户名：<input type="text" name="name" v-model="name"><br>
	   		密码：<input type="password" name="pwd" v-model="pwd"><br>
	   		<input type="button" value="登录" @click="submit">
	   		<p  v-if="msg" class="msg">{{msg}}</p>
	   		<p  v-if="err" class="err">{{err}}</p>
	   </form>
	</div>
</template>
<script>
import axios from 'axios'
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
		//请求若要带上cookie需要设置axios，且后端也需要设置Origin为指定域名
		axios.defaults.withCredentials = true
    	axios.get("http://localhost:9000/login").then(res=>{
    		if(res.data.user){
    			this.name=res.data.user.name
    			this.day=Math.ceil((Date.now()-Date.parse(res.data.user.regidate))/3600/24/1000)
    			this.isLogin=true
    			this.$emit('login')
    			console.log('logined')
    		}
    		else{
    			console.log('no login')
    		}
    	})
    },
	methods:{
		submit(){
    		axios.post('http://localhost:9000/login', {
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
			  			this.$emit('login')
			  	}
			  	console.log(res.data)
			    //this.$router.push({path:"/"})
			  })
			  .catch(function (error) {
			    console.log(error);
			  });

    	},
    	loginout(){
    		axios.get('http://localhost:9000/login/out').then(res=>{
    			this.msg=res.msg
    		})
    	}
	}
}
</script>