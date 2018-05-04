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
		<div id="foodTemp" :class="{foodTempHide:foodTempHide}" >
			<div class="foodTemp">
				<p class="top clearfix">
					<span>美食模板</span>
					<input type="button" @click="addLine" value="添加行">
				</p>
				<p class="food-title">食材</p>
				<ul class="lines">
					<li v-for="item of foodLines">
						<input type="text" placeholder="请输入食材" :value="item.name"  >
						<input type="text" placeholder="请输入用量" :value="item.quality" >
					</li>
				</ul>
				<input type="button" value="保存" @click="save">
				<input type="button" value="取消" @click="cancel">
			</div>
		</div>
	</div>

</template>

<script>

import editor from './Quilleditor.vue'
export default {
  components: {
    editor
    },
 	data:function(){
		return {
			canCrop:false,
			 /*测试上传图片的接口，返回结构为{url:''}*/
     		uploadUrl:'http://localhost:8888/upload',
			content:`<h1 class="ql-align-left"><span class="ql-font-serif" style="border-bottom:1px solid;"> 请在这里输入标题 </span></h1>
			`,
			foodTempHide:true,
			foodLines:[{name:"1",quality:"2"}]
		}
	},
	methods:{
		input:function (e) {
			console.log(e.html)
		},
		foodTemp:function(e) {
			this.foodTempHide=false
		},
		addLine:function() {
			this.foodLines.push({name:"",quality:""})
		},
		foodChange:function(i) {
			console.log(111)
			console.log(i)
		},
		cancel:function() {
			this.foodTempHide=true
			this.foodLines=[{name:"",quality:""}]
		},
		save:function() {
			
		}
	}
}
</script>
<style lang="scss" scoped>
@import '../assets/css/common.scss';
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

#foodTemp{
	position: absolute;
	top:0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0,0,0,0.2);
	text-align: center;
	font-size:15px;
	.foodTemp{
		width:500px;
		height: 300px;
		background-color: white;
		position: absolute;
		top:50%;
		left:50%;
		transform: translateY(-50%) translateX(-50%);
		padding:10px;
		box-sizing: border-box;
		.top{
			span{
				float:left;
			}
			input{
				border:none;
				float:right;
				width:80px;
				height: 25px;
				background-color:$main-color;
				color:white;
			}
			padding-bottom:5px;
			border-bottom:1px solid rgba(0,0,0,0.1);
		}
		.food-title{
			float:left;
		}
		.lines{
			margin:auto;
			margin-top:20px;
			box-sizing: border-box;
			xborder:1px solid;
			width:450px;
			height: 180px;
			padding:20px;
			overflow-y: scroll;
			input{
				margin-top: 5px;
				width:150px;
				height: 25px;
				outline: none;
				background-color: rgba(0,0,0,0.1);
				border:none;
				margin-right: 30px;
			}
		}
		>input[type=button]{
			margin-top:20px;
			width:100px;
			height: 30px;
			border:1px solid rgba(0,0,0,0.1);
			color: black;
			&:hover{
				background-color:$main-color;
				color:white;
			};
		}
	}
	&.foodTempHide{
		display: none;
	}
	
}
	


</style>