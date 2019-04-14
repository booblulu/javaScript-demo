define(["jquery", "service/salemanService", "require", "saleman/index"],function($, salemanService, require){
	return function (index) {
		
		salemanService.del(index);

		require("saleman/index")();

	}
})