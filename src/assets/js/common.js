var common={

	////开发
	// apiUrl:"http://localhost/admin",
	// uploadUrl:"http://localhost",
	// imgUrl:"http://localhost/img",
	
	////正式
	// apiUrl:"/admin",
	// uploadUrl:"//localhost",
	// imgUrl:"/img",


	apiUrl:"https://iamabj.club/admin",
	uploadUrl:"https://iamabj.club",
	imgUrl:"https://iamabj.club/img",

	catgList:[{name:"美食",val:"1"},{name:"美妆",val:"2"},{name:"服饰",val:"3"},{name:"健身",val:"4"},{name:"家居",val:"5"}],
	userOrign:[{name:"微信授权用户",val:"1"},{name:"手机号注册用户",val:"2"},{name:"完善信息用户",val:"3"}],
	// formatDate (date, fmt='yyyy-MM-dd hh:mm') {
	//   if (/(y+)/.test(fmt)) {
	//     fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	//   }
	//   let o = {
	//     'M+': date.getMonth() + 1,
	//     'd+': date.getDate(),
	//     'h+': date.getHours(),
	//     'm+': date.getMinutes(),
	//     's+': date.getSeconds()
	//   }
	//   for (let k in o) {
	//     if (new RegExp(`(${k})`).test(fmt)) {
	//       let str = o[k] + ''
	//       fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : this.padLeftZero(str))
	//     }
	//   }
	//   return fmt
	// },
	//  padLeftZero(str) {
	//   return ('00' + str).substr(str.length)
	// }

}
export default common