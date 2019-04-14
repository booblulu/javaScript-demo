// 用户使用部分
define(["Route", "saleman/index", "saleman/add", "saleman/delete", "saleman/update", "saleman/selectResult", "saleman/select"],function (Route, salemanIndex,salemanAdd, salemanDelete, salemanUpdate, salemanSelectResult, salemanSelect) {
	var router = new Route({
		routes:[
			{path:"/", redirect:"/saleman"},
			{path:"/saleman",component: salemanIndex},
			{path:"/saleman/add",component: salemanAdd},
			{path:"/saleman/delete",component: salemanDelete},
			{path:"/saleman/update",component: salemanUpdate},
			{path:"/saleman/select",component: salemanSelect},
			{path:"/saleman/selectResult",component: salemanSelectResult}
		]
	});
	return router;
})