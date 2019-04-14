define(["jquery", "saleman/selectResult", "service/salemanService", "saleman/index"], function ($, salemanSelectResult, salemanService) {
	return function () {
		
		var selectStr = `
			<div>
				操作：<button class="top">返回上级</button>
				<form>
					<label>姓名：</label><input name="name">
					<label>年龄：</label><input name="age">
					<button type="submit">提交</button>
				</form>
			</div>
		`;

		var $select = $(selectStr);


		$select.on("submit",function (e) {
			e.preventDefault();

			var name = $(this).find("input[name=name]").val();
			var age = $(this).find("input[name=age]").val();

			var obj = salemanService.select(name,age);
			console.log(obj,obj.length);
			if(obj.length <= 0){
				alert("查无此人");
			} else {
				salemanSelectResult(obj);
			}

			

		})

		$select.on("click",".top",function () {
			require("saleman/index")();
		})

		$("#main .content").html($select);
	}
})