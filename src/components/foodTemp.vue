<template>
    <div id="foodTemp" :class="{foodTempHide:isHide}" >
      <div class="foodTemp">
        <p class="top clearfix">
          <span>美食模板</span>
          <input type="button" @click="addLine" value="添加行">
        </p>
        <p class="food-title">食材</p>
        <ul class="lines"  >
          <li v-for="(item,i) in foodLines">
            <input type="text" placeholder="请输入食材"  v-model.trim="item.name" >
            <input type="text" placeholder="请输入用量"  v-model.trim="item.quality">
            <input type="button"  value="X" class="del" @click="del(i)">
          </li>
        </ul>
        <input type="button" value="保存" @click="save">
        <input type="button" value="取消" @click="cancel">
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
      input[type="text"]{
        margin-top: 5px;
        width:120px;
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
      outline: none;
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