// 配置
require.config({
	baseUrl:"js",
	paths:{
		// 文件
		jquery:"lib/jquery-3.3.1",
		// 文件夹
		service:"../service"
	}
})

require(["jquery", "router"],function($, router){
// require(["jquery", "saleman/index", "router"],function($, salemanIndex, router){
	// 事件委托:将事件绑定在父元素上，由子元素触发
	// 第二个为触发的元素

	// 1.绑定事件
	$(".aside").on("click",".aside-item",function () {

		// 2.切换列表
		// hasClass(class) 元素是否拥有该类名,class不需要带.
		if ( $(this).hasClass("aside-saleman") ) {
			// 销售员
			
			// 3.调用销售员模块
			router.push({ path:"/saleman"});
			// salemanIndex();

		} else if ( $(this).hasClass("aside-car") ) {
			alert("汽车");

		} else if ( $(this).hasClass("aside-shop") ) {
			alert("经销商");		

		}
	});

	// 默认展示第一个
	$(".aside .aside-item:eq(0)").trigger("click");
})


