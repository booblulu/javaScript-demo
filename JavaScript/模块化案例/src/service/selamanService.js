define([],function () {

	// 闭包存储
	var salemanList = [
		{name:"姚明",age:31},
		{name:"马可波罗",age:38},
		{name:"纯朴",age:29}
	];
	
	return {
		getList(){
			return salemanList;
		},
		add(name,age){
			salemanList.push({name,age});
		},
		update(){

		},
		del(){

		}
	}
})