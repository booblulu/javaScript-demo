/*
	/jquery-3.3.1   --  根目录下
	./jquery-3.3.1  --  当前目录下
	../jquery-3.3.1 --  当前目录的上一级目录下
*/

// 配置文件
require.config({
	// baseUrl:配置requriejs模块的基础路径
	// 	require内的第一个参数和paths的路径都是相对于baseUrl的
	baseUrl:"js",
	// paths:用来配置常用的文件或文件夹路径
	paths:{
		// 以后所有的模块调用将使用jquery短名称
		jquery:"utils/jquery-3.3.1"
	}
	// shim
})

// 入口函数
// 在一个单页面中，只需要调用一次require，后面全是define
// 第一个模块数组，存储模块的路径，后缀不写默认js
// 第二个回调函数，接受的参数和前面模块的顺序一致
// 		回调函数形参的类型由返回值决定
require(
	// 有返回值的在前面导入，无返回值的后导入或不用写了
	[
		"jquery",
		"cart/index",
		"user/index",
		"product"
	],
	function ($,cartIndex,userIndex,product) {
		// index --> 
		//   cart --> cartDetail
		//   user --> userDetail
		console.log("首页模块");
		$("body").append("<div>abc</div>");

		userIndex();

		cartIndex();

		product.init();

		// 实现用户点击按钮，出现用户模块的逻辑
		// 需要改造user，"按需加载"
		var btnUser = document.getElementById('user');
		btnUser.onclick = function () {
			// 调用用户模块逻辑
			userIndex();
		}

		// 购物车
		var btnCart = document.getElementById('cart');
		btnCart.onclick = function () {
			// 调用购物车模块逻辑
			cartIndex();
		}

		// 商品
		var btnPro = document.getElementById('product');
		btnPro.onclick = function () {
			// 调用商品模块逻辑
			product.init();
		}

})


// 假设使用jquery，为什么每个模块都要调用jquery模块
// 1.减少全局变量污染：$ 
// 		因为$不一定是jquery,还有可能指向其他变量(zepto)
// 使用AMD模式导入jquery，就是一个局部变量
// 2.为什么使用paths配置jquery
// 		当插件版本更新的时候，易于维护