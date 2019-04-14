define(["jquery", "service/salemanService", "saleman/select", "saleman/update", "saleman/delete", "router"],function($, selamanService, salemanSelect, salemanUpdate, salemanDelete){
	

	return function () {

		
		var selamanList = selamanService.getList();

		var rowsStr = selamanList.map((item,index)=>{
			return `<tr><td>${item.name}</td><td>${item.age}</td><td><button class="update" name="${index}">编辑</button><button class="delete" name="${index}">删除</button></td><tr>`;
		}).join("");
		// join(符号) 将数组放入一个字符串，根据符号分割
		console.log(rowsStr);
		// 渲染一个销售列表页面
		// a.拼接处一整个DOM字符串
		var dom = 	`<div>
						<div>
							操作：
							<button class="add">添加</button>
							<button class="select">查询</button>
						</div>
						<table border="3" cellpadding="0">
							<thead>
								<tr>
									<th>姓名</th>
									<th>年龄</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody>
								${rowsStr}
							</tbody>
						</table>
					</div>`;
		

		// b.把字符串插入指定区域

		// 将字符串封装成jquery对象
		var $saleman = $(dom);
		// 增加
		$saleman.on("click",".add",function () {
			require("router").push({ path:"/saleman/add"});
		})
		// 查询
		$saleman.on("click",".select",function () {
			salemanSelect();
		})
		// 修改
		$saleman.on("click",".update",function () {
			salemanUpdate($(this).attr("name"));
		})
		// 删除
		$saleman.on("click",".delete",function () {
			salemanDelete($(this).attr("name"));
		})

		$("#main .content").html($saleman);
	}
})