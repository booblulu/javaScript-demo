// 前端路由

// 好处
// 1. 通过路由将各个功能从url上面分辨出来了
// 2. 路由可以前进后退导航的操作

// 实现方式
// 哈希路由 #/xxx/xxx/xxx
// 后端路由 /xx/x/xx/xxx/
// 1. 监听window对象的hashchange事件
// 		location.hash值  ->  https/www.baidu.com/#abc     hash值:#abc
// 2. history对象: popState/pushState


// vue框架
define([], function () {
	// Vue路由
	// var router = new VueReate();

		// routes:[
		// 	{ path:"/home",componont:Home},
		// 	{ path:"/user",componont:User}
		// ]


	// 模块化的路由
	function Route(option) {
		this.routes = option.routes;
		this.init();
	}

	Route.prototype = {
		constructor: Route,
		init(){
			var _that = this;
			// 1.监听路由变化
			window.addEventListener("hashchange",function () {
				// 1.1 获取最新的hash值
				var hash = location.hash.substring(1); // 去掉#

				// 1.2 根据hash值跟本低保存的path匹配,匹配到制定路由,就执行制定模块的代码		
				var route = _that.routes.find(item=>{
					return item.path === hash;
				}); // 找不到为空

				if(route){
					route.component();
				}
			})
		},
		push({path}){
			//  从this.routes中找到path与参数path相等的对象
			var route = this.routes.find(item=>{
				return item.path === path;
			});

			if(route){
				route.component();
			}
		}

	}

	return Route;

})