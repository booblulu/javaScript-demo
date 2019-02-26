define(["cart/cartDetail"],function (cartDetail) {
	

	// 在购物车内调用详细信息
	// 只需要在第一个参数，写详细信息的路径


	// 要在回调函数return
	return function () {
		console.log("购物车模块");
		cartDetail();
	}
})