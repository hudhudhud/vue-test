<template>
	<a href="javascript:;" class="a-upload">
	    <input type="file" name="coverImg" multiple="multiple"  @change="uploadImg" >选择图片
	</a>
</template>
<script type="text/javascript">
	import common from '../assets/js/common.js'
	import axios from '../assets/js/myaxios'
	export default {
		props:["callback","uploadUrl"],
		data(){
			return {
				
			}
		},
		methods:{
			uploadImg:function(e) {
			    console.log(e.target.files)
			    var data = new FormData;
			    for(let file of e.target.files){
			    	data.append('artifile',file,file.name);
			    }
	            var xhr=new XMLHttpRequest();
	            xhr.open('post',this.uploadUrl);
	            xhr.responseType='json';
	            xhr.send(data);
	            xhr.onload=function () {
	              if(xhr.status==200){
	              	console.log(xhr.response.files)
	              	this.callback(xhr.response.files)
	              }
	            }.bind(this)
			},
		}
	}
</script>
<style lang="scss" scoped>
.a-upload {
    padding: 4px 20px;
    height: 20px;
    line-height: 20px;
    position: relative;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    font-size:10px;
    vertical-align: middle;
}
.a-upload  input {
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;
}
</style>