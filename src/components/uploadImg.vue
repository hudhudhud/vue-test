<template>
	<a href="javascript:;" class="a-upload">
	    <input type="file" name="coverImg" multiple="multiple"  @change="uploadImg" accept="image/*">选择图片
	</a>
</template>
<script type="text/javascript">
	import common from '../assets/js/common.js'
	import axios from '../assets/js/myaxios'
	export default {
		props:["callback","uploadUrl","maxSize"],
		data(){
			return {
				
			}
		},
		methods:{
			uploadImg:function(e) {
			    console.log(e.target.files)
			    var self=this
			    for(let file of e.target.files){
			    	//debugger
			    	var name=file.name
		    	    this.imgResize(file,(file)=>{
		    	    	var data = new FormData;
				    	data.append('artifile',file);
					    var xhr=new XMLHttpRequest();
			            xhr.open('post',self.uploadUrl);
			            xhr.responseType='json';
			            xhr.send(data);
			            xhr.onload=()=>{
			              if(xhr.status==200){
			              	//debugger
			              	console.log(xhr.response.files,name)
			              	self.callback(xhr.response.files)
			              }
			            }
	       			})
			    }
			
			},
		    imgResize:function(file, callback){
				var fileReader = new FileReader();
				var self=this;
				var res=[]
				fileReader.onload = function(){
				    var IMG = new Image();
				    IMG.src = this.result;
				    IMG.onload = function(){
				      var w = this.naturalWidth, h = this.naturalHeight, resizeW = 0, resizeH = 0;
				      // maxSize 是压缩的设置，设置图片的最大宽度和最大高度，等比缩放，level是报错的质量，数值越小质量越低
				      var maxSize =Object.assign({
				        width: 500,
				        height: 500,
				        level: 0.6
				      },self.maxSize) 
				      if(w > maxSize.width || h > maxSize.height){
				        var multiple = Math.max(w / maxSize.width, h / maxSize.height);
				        resizeW = w / multiple;
				        resizeH = h / multiple;
				      } else {
				        // 如果图片尺寸小于最大限制，则不压缩直接上传
				        return callback(file)
				      }
				      var canvas = document.createElement('canvas'),
				      ctx = canvas.getContext('2d');
				      //ios手机拍照会旋转90度，这里必须判断是否ios手机做出相应处理后再上传
				      if(window.navigator.userAgent.indexOf('iPhone') > 0){
				        canvas.width = resizeH;
				        canvas.height = resizeW;
				        ctx.rorate(90 * Math.PI / 180);
				        ctx.drawImage(IMG, 0, -resizeH, resizeW, resizeH);
				      }else{
				        canvas.width = resizeW;
				        canvas.height = resizeH;
				        ctx.drawImage(IMG, 0, 0, resizeW, resizeH);
				      }
				      var base64 = canvas.toDataURL('image/jpeg', maxSize.level);
				      self.convertBlob(window.atob(base64.split(',')[1]), callback);
				    }
				  };
				  fileReader.readAsDataURL(file);
				},
				convertBlob:function(base64, callback){
				  var buffer = new ArrayBuffer(base64.length);
				  var ubuffer = new Uint8Array(buffer);
				  for (var i = 0; i < base64.length; i++) {
				    ubuffer[i] = base64.charCodeAt(i)
				  }
				  var blob;
				  try {
				    blob = new Blob([buffer], {type: 'image/jpg'});
				  } catch (e) {
				    window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
				    if(e.name === 'TypeError' && window.BlobBuilder){
				      var blobBuilder = new BlobBuilder();
				      blobBuilder.append(buffer);
				      blob = blobBuilder.getBlob('image/jpg');

				    }
				  }
				  callback(blob)
				},
			 //    fileOrBlobToDataURL:function(obj, cb){
				// 	var a = new FileReader();
				// 	a.readAsDataURL(obj);
				// 	a.onload = function (e){
				// 		var img=new Image()
				// 		img.src=e.target.result
				// 		cb(img)
				// 	};
				// 	a.onerror=function(e){
				// 		console.log(e)
				// 	}
				// }

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