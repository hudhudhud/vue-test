<template>
	<div>
		<p>文章管理 / 新建文章</p>
		<section class="main clearfix">
			<div class="arti-div">
				<!-- <quillEditor
				    :content="content"
	                :options="editorOption"
	                @change="onEditorChange($event)">
	                	
            	
	            </quillEditor> -->
				<!--  <editor ref="myTextEditor"
		            :fileName="'myFile'"
		            :canCrop="canCrop"
		            :uploadUrl="uploadUrl"
		            v-model="content">
           		 </editor> -->
        <editor1 :content="content"  :height="500" ></editor1>
				<div class="customer">
					<span>封面：</span>
					<a href="javascript:;" class="a-upload">
					    <input type="file" name="coverImg" @change="uploadHeadImg">从正文选择
					</a>
					<a href="javascript:;" class="a-upload">
					    <input type="file" name="coverImg" id="" >从图片库选择
					</a>
					<img :src="coverImg" alt="" class="cover-img">
				</div>
			</div>
			<div class="arti-oth">
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
		<foodTemp :is-hide="foodTempHide" :food-lines="foodList" @saveTemp="saveTemp"  @cancelTemp="cancelTemp"></foodTemp>
	</div>

</template>

<script>
import '../assets/css/font-awesome.min.css';
//import editor from './Quilleditor.vue'
import editor from 'vue-html5-editor'
import foodTemp from './foodTemp.vue'
import common from '../assets/js/common.js'
var options= {
    // 全局组件名称，使用new VueHtml5Editor(options)时该选项无效 
    // global component name
    name: "vue-html5-editor",
    // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
    // if set true,will append module name to toolbar after icon
    showModuleName: false,
    // 自定义各个图标的class，默认使用的是font-awesome提供的图标
    // custom icon class of built-in modules,default using font-awesome
    icons: {
        text: "fa fa-pencil",
        color: "fa fa-paint-brush",
        font: "fa fa-font",
        align: "fa fa-align-justify",
        list: "fa fa-list",
        link: "fa fa-chain",
        unlink: "fa fa-chain-broken",
        tabulation: "fa fa-table",
        image: "fa fa-file-image-o",
        hr: "fa fa-minus",
        eraser: "fa fa-eraser",
        undo: "fa-undo fa",
        "full-screen": "fa fa-arrows-alt",
        info: "fa fa-info",
    },
    // 配置图片模块
    // config image module
    image: {
        // 文件最大体积，单位字节  max file size
        sizeLimit: 512 * 1024,
        // 上传参数,默认把图片转为base64而不上传
        // upload config,default null and convert image to base64
        upload: {
            url: common.apiUrl+'/upload',
            headers: {},
            params: {},
            fieldName: {}
        },
        // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
        // compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
        // set null to disable compression
        compress: {
            width: 1600,
            height: 1600,
            quality: 80
        },
        // 响应数据处理,最终返回图片链接
        // handle response data，return image url
        uploadHandler(responseText){
        	console.log("111111"+responseText)
            //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
            // var json = JSON.parse(responseText)
            // if (!json.ok) {
            //     alert(json.msg)
            // } else {
            //     return json.data
            // }
        }
    },
    // 语言，内建的有英文（en-us）和中文（zh-cn）
    //default en-us, en-us and zh-cn are built-in
    language: "zh-cn",
    // 自定义语言
    i18n: {
        //specify your language here
        "zh-cn": {
            "align": "对齐方式",
            "image": "图片",
            "list": "列表",
            "link": "链接",
            "unlink": "去除链接",
            "table": "表格",
            "font": "文字",
            "full screen": "全屏",
            "text": "排版",
            "eraser": "格式清除",
            "info": "关于",
            "color": "颜色",
            "please enter a url": "请输入地址",
            "create link": "创建链接",
            "bold": "加粗",
            "italic": "倾斜",
            "underline": "下划线",
            "strike through": "删除线",
            "subscript": "上标",
            "superscript": "下标",
            "heading": "标题",
            "font name": "字体",
            "font size": "文字大小",
            "left justify": "左对齐",
            "center justify": "居中",
            "right justify": "右对齐",
            "ordered list": "有序列表",
            "unordered list": "无序列表",
            "fore color": "前景色",
            "background color": "背景色",
            "row count": "行数",
            "column count": "列数",
            "save": "确定",
            "upload": "上传",
            "progress": "进度",
            "unknown": "未知",
            "please wait": "请稍等",
            "error": "错误",
            "abort": "中断",
            "reset": "重置"
        }
    },
    // 隐藏不想要显示出来的模块
    // the modules you don't want
    hiddenModules: [],
    // 自定义要显示的模块，并控制顺序
    // keep only the modules you want and customize the order.
    // can be used with hiddenModules together
    visibleModules: [
        "text",
        "color",
        "font",
        "align",
        "list",
        "link",
        "unlink",
        "tabulation",
        "image",
        "hr",
        "eraser",
        "undo",
        "full-screen",
        "info",
    ],
    // 扩展模块，具体可以参考examples或查看源码
    // extended modules
    modules: {
        //omit,reference to source code of build-in modules
    }
}
const editor1 = new editor(options)

export default {
  components: {
    editor1,
    foodTemp
  },
 	data:function(){
		return {
			canCrop:false,
			 /*测试上传图片的接口，返回结构为{url:''}*/
     		uploadUrl:common.apiUrl+'/upload',
			content:`<h1 class="ql-align-left"><span class="ql-font-serif" style="border-bottom:1px solid;"> 请在这里输入标题 </span></h1>
			`,
			foodTempHide:true,
			coverImg:"http://localhost/img/a.jpg",
			foodList:[{name:"1",quality:"2"},{name:"3",quality:"4"}]
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
	    
		    for(var i in data){
		    	if(data[i].name){
		    		if(i%2==1){
		    			this.content+=`<p style="background-color: rgb(0,0,0,0.2);">
		    			<span style='color:green;'>${data[i].name}</span><span>${data[i].quality}</span>
		    			</p>`
		    		}
		    		else{
		    			this.content+=`<p>
		    			<span>${data[i].name}</span><span>${data[i].quality}</span> 
		    			 </p>`
		    		}
		    	}
		    }
		},            
		uploadHeadImg:function(e) {
			  var data = new FormData;
	          data.append('imgimg', e.target.files[0],e.target.files[0].name);
	          var xhr=new XMLHttpRequest();
	          xhr.open('post',this.uploadUrl);
	          xhr.responseType='json';
	          xhr.send(data);
	          xhr.onload=function () {
	            if(xhr.status==200){
	              console.log(common.apiUrl+"/img/upload/"+xhr.response.name)
	              this.coverImg=common.apiUrl+"/img/upload/"+xhr.response.name
	            }
	          }.bind(this)
		}
	}
}
</script>
<style lang="scss" scoped>

.main{
	position: relative;
	background-color: white;
	height: 1000px;
	width:100%;
	display: flex;
	flex-direction: row;
	.arti-div{
		width:80%;
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
			.cover-img{
				border:1px solid gray;
				display:block; 
				width:100px;
				height: 150px;
			}
		}
	}
	
	.arti-oth{
		flex-grow: 1;
		width:150px;
		box-sizing: border-box;
		padding:10px;
		font-size: 15px;
		text-align: center;
		.title{
			text-align: left;
			padding:10px;
		}
		.btn{
			display: block;
			text-align: center;
			border:1px solid rgba(0,0,0,0.3);
			box-sizing: border-box;
			width:80%;
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