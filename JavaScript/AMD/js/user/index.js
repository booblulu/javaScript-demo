define(["user/userDetail"],function (userDetail) {

	// 要在回调函数return
	return function () {
		console.log("用户模块");
		userDetail();
	}
})