<template>
  <div id="app">
    <section class="admin" v-if="isLogin">
        <div class="left">
            <div class="head-img">
              <img src="./assets/b.jpg" alt="">
              <p>{{user.name}} 管理员</p>
            </div>
            <div class="router" >
              <ul v-for="item in menu">
                  <li class="main-menu">
                    <router-link v-if="item.path" :to='item.path' :class="{active:item.name==activeName}" @click.native="menuClick"> <i :class="item.icon" v-if="item.icon"></i>{{item.name}}
                        <i class="fa fa-caret-left right" v-if="item.name==activeName"></i>
                    </router-link>
                    <p  v-else> <i :class="item.icon" v-if="item.icon"></i> {{item.name}}</p>
                  </li>
                  <li v-for="child in item.child">
                    <router-link v-if="child.path" :to='child.path' :class="{active:child.name==activeName}"@click.native="menuClick">
                        <i class="fa fa-home none" v-if="item.icon"></i>
                        {{child.name}}
                         <i class="fa fa-caret-left right" v-if="child.name==activeName"></i>
                    </router-link>
                   <p  v-else><i class="fa fa-home none" v-if="item.icon"></i>{{child.name}}</p>
                 </li>
              </ul>
            </div>
          </div>
          <div class="right">
            <p class="header">管理后台<span @click="loginOut" class="loginout">退出</span></p> 
            <transition name="fade" mode="out-in">
              <router-view  class="router-content"></router-view>
            </transition>
          </div>
    </section>
    <login v-else @login="login"></login>
</div>
</template>

<script>
import login from './components/login'
import axios from './assets/js/myaxios'
export default {
  name: 'app',
  components:{login},
  data () {
    return { 
     isLogin:false,
     user:{name:""},
     activeName:"首页",
     menu: [
        {name:"首页",path:"/",icon:'fa fa-home'},
        {name:"管理" ,icon:'fa fa-align-justify mana',child:[{name:"文章管理",path:"/manage/article"},{name:"用户管理",path:"/manage/user"}]},
        {name:"统计" ,icon:'fa fa-adjust',child:[{name:"用户分析",path:"/statistics/user"}]}
      ]
    }
  },
  mounted(){
    axios.get("/login/api").then(res=>{
        console.log("res=",res)
            if(res.data.user){
                this.user=res.data.user
                this.isLogin=true
                console.log('logined')
            }
            else{
                console.log('no login')
            }
        })
  },
  methods:{
    login(payload){
        this.isLogin=true
        this.user=payload.user
    },
    loginOut(){
        axios.get('/login/api/out').then(res=>{
                this.msg=res.msg
                this.isLogin=false
            })
    },
    menuClick(e){
        this.activeName=e.target.innerText.trim()
    }
  }

}
</script>
<style scoped>
  /*只在本模板中起作用*/
</style>
<style lang="scss">
@import './assets/css/font-awesome.min.css';
@import './assets/css/common.scss';
/*跟router transition中的name需要对应，如fade,slide-left,slide-right,否则默认为v*/
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.child-view {
  transition: all  .5s cubic-bezier(.55,0,.1,1);
  /*需要绝对定位，否则插入的块在离开的块下面布局*/
  position: absolute;
  top:0;
  left:0;
  padding:2%;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
/*end*/

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width:100%;
  height:100%;
    .admin{
      width:100%;
      height:100%;
      margin:0;
      padding:0;
      background-color: #f5f6f5;
      display: flex;
      flex-direction: row;
      >.left{
          width:$left-width;
          min-width: 200px;
          height: 100%;
          box-sizing: border-box;
          background-color: white;
          position: fixed;
          z-index: 9999;
        }
        >.right{
           flex-grow: 1;
           min-height: 100%;
           margin-left:$left-width;
           min-width: 1000px;
           .header{
               height: $top-width;
               background-color: $main-color;
               color:white;
               text-align: left;
               line-height: $top-width;
               padding-left: 40px;
               margin:0;
               position: fixed;
               width:100%;
               z-index: 1002;
               .loginout{
                    position: absolute;
                    left: 80%;
                    font-size: 10px;
                }
            }
           .router-content{
              box-sizing: border-box;
              xoverflow: scroll;
              margin-top: $top-width;
              position: relative;
              min-height: 100%;
              box-sizing: border-box;
           }
          
        }
    }
   
}
a{
  color:black;
  text-decoration: none;
}

*{xbackground-color: rgba(0,0,0,0.1)}

ul {
  list-style-type: none;
  padding: 0;
  margin:0;
}

li {
   padding: 0;
   margin:0;
}

p{
  margin:0;
}

.router{
    margin:auto;
    margin-top: 100px;
    width:100px;
    ul:not(:last-child){
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(0,0,0,0.3)
    }
    li{
        &.main-menu{
            font-size:18px;
        }
        i{
            &.mana{
                 font-size:15px;
            }
            margin-right: 10px;
            color:rgba(0,0,0,0.6);
            font-size: 18px;
            &.none{
                color: transparent;
            }
            &.right{
                 color: $main-color;
                 position: absolute;
                 right: 0;
                 font-size:20px;
                 transform: translateX(130%);
            }
        }
        margin-bottom:10px;
    }
 
}

.head-img{
  width:100px;
  height: 100px;
  text-align: center;
  margin:auto;
  margin-top:30px;
  box-sizing: border-box;
}
.head-img img{
  width:50px;
  height: 50px;
  border-radius: 100%;
}
input{
    outline: none;
}
.active{
    color: $main-color;
}
html,body{
  width:100%;
  height:100%;
  margin:0;
  padding:0;
  background-color: #f5f6f5;
}
.clearfix:after{
    content:"";
    display: block;
    clear:both;
}
</style>
