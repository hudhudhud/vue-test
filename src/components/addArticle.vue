<template>
	<div>
		<p>文章管理 / 新建文章</p>
		<section class="main clearfix">
			<quillEditor></quillEditor>
			<div class="btns">
				<div class="mb">
					<p class="title">模板</p>
					<p class="btn">美食模板</p>
				</div>
				<div class="dmt">
					<p class="title">多媒体</p>
					<p class="btn">图片</p>
					<p class="btn">视频</p>
					<p class="btn">音频</p>
				</div>
			</div>
		</section>
		
	</div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  }
}


</script>
<style scoped>
.main{
	background-color: white;
	height: 1000px;
	width:1000px;

}
.quill-editor{
	width:850px;
	height: 500px;
	float: left;
}
.btns{
	float:right;
	width:150px;
	box-sizing: border-box;
	padding:10px;
	font-size: 15px;
}
.btns  .title{
	text-align: left;
	padding:10px;
}
.btns  .btn{
	text-align: center;
	border:1px solid rgba(0,0,0,0.3);
	width:130px;
	height: 30px;
	line-height: 30px;
	box-sizing: border-box;
}
.btns  .btn:not(:last-child){
	border-bottom:none;
}
</style>