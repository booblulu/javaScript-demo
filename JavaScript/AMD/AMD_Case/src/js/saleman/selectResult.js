define(["jquery", "service/salemanService", "require", "saleman/select"], function ($, salemanService, require){
	return function (obj) {
		


		var resultStr = `
			<div>
				操作：<button class="top">返回上级</button>
				<table border="3" cellpadding="0">
					<thead>
						<tr>
							<th>姓名</th>
							<th>年龄</th>
						</tr>
					</thead>
					<tbody>
							${obj.map((item)=>{
								console.log(item.name);
								return `<tr><td>${item.name}</td><td>${item.age}</td></tr>`;
							}).join("")}
					</tboby>
				</table>
			</div>
		`;

		$result = $(resultStr);
		

		$result.on("click",".top",function () {
			require("saleman/select")();
		})

		$("#main .content").html($result);

	}
})