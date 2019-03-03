define(["jquery", "service/salemanService", "require", "saleman/index"],function ($, salemanService, require) {
	return function(index){

		// 1.获取该索引的对象
		var obj = salemanService.find(index);
		var updateStr = `
			<div>
				操作：<button class="top">返回上级</button>
				<form>
					<label>姓名：</label><input name="name" value="${obj[0].name}"/>
					<label>年龄：</label><input name="age" value="${obj[0].age}"/>
					<button type="submit">提交</button>
				</form>
			</div>
		`;

		var $update = $(updateStr);

		$update.on("submit",function (e) {
			e.preventDefault();

			var name = $(this).find("input[name=name]").val();
			var age = $(this).find("input[name=age]").val();

			salemanService.update(index,name,age);

			require("saleman/index")();

		});

		$update.on("click",".top",function () {
			require("saleman/index")();
		});

		$("#main .content").html($update);


	}
})