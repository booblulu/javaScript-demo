define(["service/selamanService"],function(selamanService){
	

	return function () {

		
		var selamanList = selamanService.getList();

		var rowsStr = selamanList.map(item=>{
			return `<tr><td>${item.name}</td><td>${item.age}</td><tr>`;
		}).join("");
		// join(符号) 将数组放入一个字符串，根据符号分割
		console.log(rowsStr);
		// 渲染一个销售列表页面
		// a.拼接处一整个DOM字符串
		var dom = 	`<div>
						<div>
							操作：
							<button>添加</button>
							<button>删除</button>
						</div>
						<table border="3" cellpadding="0">
							<thead>
								<tr>
									<th>姓名</th>
									<th>年龄</th>
								</tr>
							</thead>
							<tbody>
								${rowsStr}
							</tbody>
						</table>
					</div>`;
		

		// b.把字符串插入指定区域
		$("#main .content").append(dom)
	}
})