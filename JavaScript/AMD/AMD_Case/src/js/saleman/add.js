define(["jquery", "service/salemanService", "require","router"], function ($, salemanService, require,router) {
	return function(){
		var addStr = `	
			<div>		
				操作：<button class="top">返回上级</button>
				<form>
					<label>姓名：</label><input name="name"/>
					<label>年龄：</label><input name="age"/>
					<button type="submit">提交</button>
				</form>			
			<div>
		`;
		// 1.同步表单变成异步表单，阻止form的submit事件的默认行为。
		var $add = $(addStr);
		
		$add.on("submit",function (e) {
			// preventDefault()阻止数据发生默认行为
			// 当需要ajax或者前端数据验证的时候,需要取消默认行为,否则会自动跳转,而使用它不会不会跳转页面,需要手动跳转
			e.preventDefault();
			
			// 2.手动获取表单数据
			var name = $(this).find("input[name=name]").val();
			var age = $(this).find("input[name=age]").val();

			// 3.调用方法service中的add方法添加
			salemanService.add(name,age);
			

			// 4.返回index页面
			//$(".aside .aside-item:eq(0)").trigger("click");	
			router.push({ path:"/saleman/index"});
		
		})
		

		$add.on("click",".top",function () {
			router.push({ path:"/saleman/index"});
		})
		

		$("#main .content").html($add);
		
	}
})