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
        		<editor1 :content="content"  :height="500"  ref="editor" @change="editchange" :z-index="5" :auto-height=false></editor1>
        		<p class="article-detail" v-if="!focusEditor" @click="editFocus">请在这里编辑文章</p>
				<div class="customer">
					<div class="item title">
						<span class="item-name">标题：</span>
						<input type="text" class="title" v-model="title" placeholder="请输入标题">
					</div>
					<!-- <p><span>简要描述：</span><input type="text" v-model="desc"> -->
					<div class="item">
						<span class="item-name">封面：</span>
						<uploadImg :callback="showCoverImg" :uploadUrl="uploadUrl"></uploadImg>
						<div v-if="coverImg">
							<span  class="hasImg" :style="{backgroundImage:'url('+coverImg+')'}"></span>
						</div>
						<span v-else class="noImg" ></span>
					</div>
					<div class="item">
						<span class="item-name">分类：</span>
						<select v-model="catg" name="catg" class="catg">
							<option value="-1">请选择</option>
							<option value="1">美食</option>
							<option value="2">美妆</option>
							<option value="3">服饰</option>
							<option value="4">健身</option>
							<option value="5">家居</option>
						</select>
					</div>
					<div class="item tags">
						<span class="item-name">标签：</span>
						<span v-for="(item,i) in tags" class="tag"  @mouseenter="tagEnter(i)"  @mouseleave="tagLeave">{{item.val}}
							<transition name="fade">
								<span class="close" @click="deleteTag(i)" v-show="tagActive==i">X</span>
							</transition>
						</span>
						<input type="text" v-if="ifaddtag" @blur="tagblur" class="tagInput"  v-focus>
						<span class="tag" @click="addtag" title="添加标签">+</span>
					</div>
					<div class="item food" v-show="catg==1">
						<span class="item-name">食材:</span>
						<input type="button" class="btn" @click="foodTemp" value="添加食材">
						<section class="food-temp">
							<div v-for="(item,i) in showFoodList" :class="{oddFood:i%2==0,evenFood:i%2==1,choosedFood:foodActive==i}" class="clearfix"
							@mouseenter="foodEnter(i)" @mouseleave="foodLeave()">
								<span >{{item.name}}</span>
								<span @click="deleteFood(i)"  title="删除">X</span>
								<span>{{item.quality}}</span>
							</div>
						</section>
					</div>
					<div class="item slider">
						<span class="item-name">轮播图:</span>
						<uploadImg :callback="showImgList" :uploadUrl="uploadUrl"></uploadImg>
						<div v-if="sliderImgs.length">
							<span  class="hasImg sliderImg" v-for="(item,i) in sliderImgs" 
							 :style="{backgroundImage:'url('+item+')'}"
							 @mouseenter="sliderImgEnter(i)" @mouseleave="sliderImgLeave()">
							 	<transition name="fade">
									<span class="close slider" @click="deleteSliderImg(i)" v-show="imgActive==i">X</span>
								</transition>
							 </span>
						</div>
						<span v-else class="noImg" ></span>
					</div>
				
				</div>
			</div>
			<div class="footer">
				<input type="button" value="保存" @click="save">
				<input type="button" value="保存并发送"  @click="savesend">
			</div>			
		</section>
		<foodTemp :is-hide="foodTempHide" :food-lines="foodList" @saveTemp="saveTemp"  @cancelTemp="cancelTemp"></foodTemp>
	</div>

</template>

<script>
import '../assets/css/font-awesome.min.css';
//import editor from './Quilleditor.vue'
import editor from 'vue-html5-editor'
import uploadImg from './uploadImg.vue'                                                           
import foodTemp from './foodTemp.vue'
import common from '../assets/js/common.js'
import axios from '../assets/js/myaxios'
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
        sizeLimit: 1024 * 1024,//1兆
        // 上传参数,默认把图片转为base64而不上传
        // upload config,default null and convert image to base64
        upload: {
            url: common.uploadUrl+'/upload',
            headers: {},
            params: {},
            fieldName: "artifile",
        },
        // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
        // compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
        // set null to disable compression
        compress:true, 
        width: 600,
        height: 600,
        quality: 80,
       
        // 响应数据处理,最终返回图片链接
        // handle response data，return image url
        uploadHandler(responseText){
        	var name=JSON.parse(responseText).files[0].name
        	console.log(name)
        	var src=`${common.imgUrl}/upload/${name}`
        	console.log(src)
        	return src
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
    hiddenModules: [
     	"full-screen",
        "info",
     ],
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
	    foodTemp,
	    uploadImg
	},
	directives: {
	  focus: {
	    // 指令的定义 当被绑定的元素插入到 DOM 中时……
	    inserted: function (el) {
	      el.focus()
	    }
	  },
	},
 	data:function(){
		return {
     		uploadUrl:common.uploadUrl+'/upload',
			foodTempHide:true,
			catg:"-1",
			title:"",
			desc:"",
			content:``,
			foodList:[{name:1,quality:2},{name:3,quality:4}],
			showFoodList:[],
			sliderImgs:[],
			coverImg:"",
			focusEditor:false,
			tags:[],
			ifaddtag:false,
			foodActive:-1,
			tagActive:-1,
			imgActive:-1,
		}
	},
	computed:{
		// coverImgStyle(){
		// 	return `url(${this.coverImg})`
		// }
	},
	methods:{
		foodTemp() {
			this.foodTempHide=false
		},
		cancelTemp(){
			this.foodTempHide=true
		},
		saveTemp:function(data){
			this.foodTempHide=true
			this.foodList=data
			this.showFoodList=this.foodList.map(({name,quality})=>{return {name,quality}})
		},        
		showCoverImg:function(files){
            console.log(this.createImgUrl(files[0].name))
            this.coverImg=this.createImgUrl(files[0].name)
		},
		showImgList:function(files){
			files.forEach(item=>this.sliderImgs.push(this.createImgUrl(item.name)))
			console.log(this.sliderImgs)
		},
		createImgUrl(name){
			return common.imgUrl+"/upload/"+name
		},
		editFocus(){
			this.focusEditor=true
			this.$refs.editor.focus()
		},
		editchange(data){
			this.content=data
		},
		addtag(){
			this.ifaddtag=true
			// this.$refs.edittag.focus()//获取不到，因为该inpu用了v-if不是在注册的时候就存在
			//官方关于 ref 注册时间的重要说明：因为 ref 本身是作为渲染结果被创建的
		},
		tagEnter(i){
			this.tagActive=i
		},
		tagLeave(){
			this.tagActive=-1
		},
		foodEnter(i){
			this.foodActive=i
		},
		foodLeave(i){
			this.foodActive=-1
		},
		sliderImgEnter(i){
			this.imgActive=i
		},
		sliderImgLeave(){
			this.imgActive=-1
		},
		tagblur(e){
			if(e.target&&e.target.value){
				this.tags.push({val:e.target.value,sclose:false})
			}
			this.ifaddtag=false
		},
		deleteTag(i){
			this.tags.splice(i,1)
		},
		deleteFood(i){
			this.foodList.splice(i,1)
			this.showFoodList.splice(i,1)
		},
		deleteSliderImg(i){
			this.sliderImgs.splice(i,1)
		},
		save(){
			axios.post('/manage/article/api/add',{
	      	    catg: this.catg,
	      	    title: this.title,
	      	    //desc: this.desc,
	      	    details:this.content,
	      	    spec:JSON.stringify(this.foodList),
	      	    sliderImgs:JSON.stringify(this.sliderImgs),
	      	    coverImg:this.coverImg,
	      	    tags:JSON.stringify(this.tags),
	      	}).then(res=>{
	      		console.log(res)
	      	  		if(res.data.success){
	      	  			console.log("添加成功！")
	      	  			this.$router.push({
                            path: "/admin/manage"
                        });
	      	  		}
	    	})
		},
		savesend(){
			axios.post('/manage/article/api/add',{
	      	    catg: this.catg,
	      	    title: this.title,
	      	    //desc: this.desc,
	      	    details:this.content,
	      	    spec:JSON.stringify(this.foodList),
	      	    sliderImgs:JSON.stringify(this.sliderImgs),
	      	    coverImg:this.coverImg,
	      	    tags:JSON.stringify(this.tags),
	      	    publishDate:new Date()
	      	}).then(res=>{
	      		console.log(res)
	      	  		if(res.data.success){
	      	  			console.log("添加成功！")
	      	  			this.$router.push({
                            path: "/manage"
                        });
	      	  		}
	    	})
		},
	}
}
</script>
<style lang="scss" scoped>
@import '../assets/css/common.scss';
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.main{
	margin-top:20px;
	position: relative;
	background-color: white;
	width:100%;
	display: flex;
	flex-direction: row;
	input[type=button]{
		background-color: white;
		border: 1px solid #ddd;
	    border-radius: 4px;
	    padding: 4px 20px;
	    display: inline-block;
	}
	.arti-div{
		width:100%;
		margin-bottom: 80px;
		float: left;
		box-sizing: border-box;
		position: relative;
		.vue-html5-editor{
			border:none;
		}
		.article-detail{
			width:100%;
			height: 500px;
			font-size:20px;
			color:rgba(0,0,0,0.4);
			position:absolute;
			top:0;
			line-height: 500px;
			text-align: center;
		}
		.customer{
				border-top:1px solid rgba(0,0,0,0.2);
				margin:40px;
				box-sizing: border-box;
				padding-top:30px;
				.item{
					margin-top:20px;
					.item-name{
						font-size:15px;
					}
				    .catg{
				    	display: inline-block;
				    	width:180px;
				    	padding:3px;
				    	border: 1px solid #ddd;
				    	border-radius: 4px;
				    	vertical-align: bottom;
				    	outline: none;
				    	cursor: pointer;
				    }
				    &.food{
						.food-temp{
							border:1px solid rgba(0,0,0,0.1);
							margin-top:10px;
							min-width:max-content;/*元素大到所有元素都刚好不换行*/
					    	width:50%;
							div{
							  padding:5px 10px;
							  span:first-child{
								 float:left;
								 margin-right: 50px;
							  }
							  span:nth-child(n+2){
								 float:right;
								 margin-right: 20px;
							  }
							  span:nth-child(2){
							  	color:rgba(0,0,0,0.4);
							  	cursor: pointer;
							  }
					    	}
					    	.choosedFood{
					    		xbackground-color: rgba(0.2,0,0,0.5);
					    	}
					    	.oddFood{
					    		span:first-child{
					    			color:$main-color;
					    		};
					    	}
					    	.evenFood{
								background-color: rgba(0,0,0,0.1)
					    	}
						}
				    	
				    }
					&.title{
						input[type=text]{
							border:none;
							border-bottom: 1px solid rgba(0,0,0,0.2);
							outline: none;
							width:50%;
							font-size:15px;
						}
					}
					&.tags{
						.tag{
							cursor: pointer;
							margin-right: 10px;
							background-color: white;
							border: 1px solid #ddd;
						    border-radius: 4px;
						    padding: 4px 20px;
						    display: inline-block;
							position: relative;
						}
						.tagInput{
						 	 border-radius: 4px;
						 	 padding: 4px 20px;
						 	 border: 1px solid #ddd;
						}
					}
					.cover-img{
						margin-top:10px;
						border:1px solid gray;
						display:block; 
						width:100px;
						height: auto;
					}
					.hasImg,.noImg{
						margin-top:10px;
						display: block;
						width:200px;
						height: 120px;
						background-color: rgba(0,0,0,0.2);
					}
					.hasImg{
						background-repeat: no-repeat;
						background-size: cover;
						&.sliderImg{
							display: inline-block;
							margin-right: 10px;
						}
					}
					&.slider{
						.hasImg{
							position: relative;
						}
					}
					.close{
							position: absolute;
							top:0;
							left:0;
							background-color: rgba(0,0,0,0.7);
							width:100%;
							height: 100%;
							text-align: center;
							line-height: 30px;
							color:white;
							cursor: pointer;
							&.slider{
								font-size: 50px;
								line-height: 120px;
							}
						}

			}
		}
	}
	.footer{
		position: fixed;
		width:81.5%;
		height: 60px;
		bottom: 0;
		border-top: 1px solid rgba(0,0,0,0.2);
		text-align: center;
		line-height: 60px;
		background-color: white;
	}
	
/*	.arti-oth{
		flex-grow: 1;
		width:150px;
		box-sizing: border-box;
		font-size: 15px;
		text-align: center;
		margin-bottom: 80px;
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
	}*/
}


	


</style>