<template>
    <div id="foodTemp" :class="{foodTempHide:isHide}" >
      <div class="foodTemp">
        <p class="top clearfix">
          <span>美食模板</span>
          <input type="button" @click="addLine" value="添加行">
        </p>
        <p class="food-title">食材</p>
        <ul class="lines"  >
          <li v-for="(item,i) in foodLines" class="clearfix">
            <input type="text" placeholder="请输入食材"  v-model.trim="item.name" >
            <input type="text" placeholder="请输入用量"  v-model.trim="item.quality">
            <input type="button"  value="X" class="del" @click="del(i)" >
          </li>
        </ul>
        <input type="button" value="保存" @click="save" class="btns">
        <input type="button" value="取消" @click="cancel" class="btns">
      </div>
    </div>
</template>
<script type="text/javascript">

export default {
  props:["isHide","foodLines"],
  data:function(){
    return {
      //foodLines:[{name:"",quality:""}]
    }
  },
  methods:{
    addLine:function() {
      this.foodLines.push({name:"",quality:""})
    },
    cancel:function() {
      this.foodLines=[{name:"",quality:""}]
      this.$emit("cancelTemp")
    },
    save:function() {
       this.$emit("saveTemp",this.foodLines)
    },
    del:function(i){
      this.foodLines.splice(i,1)
    }
  }
}
</script>
<<style lang="scss" scope>
@import '../assets/css/common.scss';
#foodTemp{
  position: fixed;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,0.2);
  text-align: center;
  font-size:15px;
  z-index: 7;
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
      padding-left: 45px;
      margin-top:5px;
    }
    .lines{
      margin:auto;
      margin-top:20px;
      box-sizing: border-box;
      xborder:1px solid;
      width:450px;
      height: 180px;
      padding:20px;
      padding-top:0;
      overflow-y: scroll;
      li{
        width:350px;
        background-color: rgba(0,0,0,0.1);
        margin-top:5px;
        input[type="text"]{
          padding:0;
          width:120px;
          height: 25px;
          line-height: 25px;
          outline: none;
          background-color: transparent;
          border:none;
          margin-right: 30px;
          &:first-child{
            float:left;
          };
          &:nth-child(2){
            float:right;
          };
        }
      }
    
    }
    input[type=button]{
      &.btns{
        margin-top:20px;
        width:100px;
        height: 30px;
        color: black;
        border:1px solid rgba(0,0,0,0.1);
        margin-right:10px;
        background-color: white;
        &:hover{
          background-color:$main-color;
          color:white;
        };
      }
      &.del{
           border: none;
           background: none;
           margin-right: -380px;
           line-height: 25px;
      }
    }
  }
  &.foodTempHide{
    display: none;
  }
}
</style>