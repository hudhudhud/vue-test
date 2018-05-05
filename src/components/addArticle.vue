<template>
	<div>
		<p>文章管理 / 新建文章</p>
		<section class="main clearfix">
			<div class="left">
				<!-- <quillEditor
				    :content="content"
	                :options="editorOption"
	                @change="onEditorChange($event)">
	                	
            	
	            </quillEditor> -->
				 <editor ref="myTextEditor"
		            :fileName="'myFile'"
		            :canCrop="canCrop"
		            :uploadUrl="uploadUrl"
		            v-model="content">
           		 </editor>
				<div class="customer">
					<span>封面：</span>
					<a href="javascript:;" class="a-upload">
					    <input type="file" name="" id="">从正文选择
					</a>
					<a href="javascript:;" class="a-upload">
					    <input type="file" name="" id="">从图片库选择
					</a>
				</div>
			</div>
			<div class="right">
				<div class="mb">
					<p class="title">模板</p>
					<input type="button" class="btn" @click="foodTemp" value="美食模板">
				</div>
				<div class="dmt">
					<p class="title">多媒体</p>
					<input type="button" class="btn" value="图片">
					<input type="button" class="btn" value="视频">
					<input type="button" class="btn" value="音频">
				</div>
			</div>
			<div class="footer">
				<input type="button" value="保存">
				<input type="button" value="预览">
				<input type="button" value="保存并发送">
			</div>			
		</section>
		<foodTemp :is-hide="foodTempHide"  @saveTemp="saveTemp"></foodTemp>
	</div>

</template>

<script>

import editor from './Quilleditor.vue'
import foodTemp from './foodTemp.vue'
export default {
  components: {
    editor,
    foodTemp
  },
 	data:function(){
		return {
			canCrop:false,
			 /*测试上传图片的接口，返回结构为{url:''}*/
     	uploadUrl:'http://localhost:8888/upload',
			content:`<h1 class="ql-align-left"><span class="ql-font-serif" style="border-bottom:1px solid;"> 请在这里输入标题 </span></h1>
			`,
			foodTempHide:true,
		}
	},
	methods:{
		foodTemp:function(e) {
			this.foodTempHide=false
		},
		cancelTemp:function(){
			this.foodTempHide=true
		},
		saveTemp:function(data){
			console.log(data)
			this.foodTempHide=true
			  // axios.post('/manage/article/add',{
	      //     firstName: 'Fred',
	      //     lastName: 'Flintstone'
	      //   }).then(res=>{
	    //               this.foodTempHide=true
	    //   })
	    
	    for(var item of data){
	    	if(item.name){
	    		this.content+=`<p><span>${item.name}</span>    <span>${item.quality}</span></p>`
	    	}
	    }
		}
	}
}
</script>
<style lang="scss" scoped>

.main{
	position: relative;
	background-color: white;
	height: 1000px;
	width:1000px;
	.left{
		width:850px;
		float: left;
		border-right:1px solid rgba(0,0,0,0.2);
		padding:10px;
		box-sizing: border-box;
	/*	.quill-editor{
			width:100%;
			height: 600px;
			margin-bottom: 100px;
			.ql-title{
				text-align:center;
				text-decoration: underline;
				font-size:50px;
				};
		}*/
		.customer{
			.a-upload {
			    padding: 4px 10px;
			    height: 20px;
			    line-height: 20px;
			    position: relative;
			    cursor: pointer;
			    border: 1px solid #ddd;
			    border-radius: 4px;
			    overflow: hidden;
			    display: inline-block;
			    *display: inline;
			    *zoom: 1;
			    font-size:10px;
			}
			.a-upload  input {
			    position: absolute;
			    font-size: 100px;
			    right: 0;
			    top: 0;
			    opacity: 0;
			    filter: alpha(opacity=0);
			    cursor: pointer;
			}
		}
	}
	
	.right{
		float:right;
		width:150px;
		box-sizing: border-box;
		padding:10px;
		font-size: 15px;
		.title{
			text-align: left;
			padding:10px;
		}
		.btn{
			text-align: center;
			border:1px solid rgba(0,0,0,0.3);
			box-sizing: border-box;
			width:100px;
			background-color: white;
			padding:5px;
			outline: none;
			&:not(:last-child){
				border-bottom:none;
			}
		}
	}
	.footer{
		width:100%;
		height: 80px;
		position: absolute;
		bottom: 0;
		border-top: 1px solid rgba(0,0,0,0.2);
		text-align: center;
		line-height: 80px;
	}
}


	


</style>