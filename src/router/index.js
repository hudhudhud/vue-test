import Vue from 'vue'
import Router from 'vue-router'

//import HelloWorld from '@/components/HelloWorld'
import Content from '@/components/content'
import ContentMain from '@/components/contentMain'
import UserList from '@/components/userList'
import AddArticle from '@/components/addArticle'
import ArticleList from '@/components/articleList'
import UserSta from '@/components/userSta'
import index from '@/components/index'
import login from '@/components/login'

Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })


var router=new Router({
	mode:'history',
	base:"/admin",
	routes:[
	    { path: '/', component: index },
	    { path: '/manage', component: ContentMain,
	      children: [
	        { path: '', component: ArticleList,name:"1" },
	        { path: 'article', component: ArticleList,name:"1" ,
	       //    children: [
		      //   { path: 'add', component: AddArticle,name:"1" },
		      // ]
	    	},
	    	{ path: 'article/add', component: AddArticle,name:"3" },
	    	{ path: 'article/catg/:catg', component: ArticleList,name:"2" },
	        { path: 'article/edit/:id', component: AddArticle,name:"4" },
	        { path: 'user', component: UserList,name:"5"}
	      ]
	    },
	    { path: '/statistics', component: Content,
	      children: [
	        { path: '', component: UserSta },
	        { path: 'user', component: UserSta }
	      ]
	    },
	],
})

export default router