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
		update(num,name,age){
			salemanList[num].name = name;
			salemanList[num].age = age;
		},
		del(num){
			salemanList.splice(num,1);
		},
		find(num){			
			return salemanList.filter((item,index)=>{				
				return (index == num);			
			});
		},
		select(name,age){

			if (!name && !age){
				return salemanList;
			}

			if (name && !age){
				return salemanList.filter((item,index)=>{				
					return (item.name === name) ;			
				});
			} else if (!name && age) {
				return salemanList.filter((item,index)=>{				
					return (item.age == age);			
				});
			} else {
				return salemanList.filter((item,index)=>{				
					return (item.name === name) && (item.age == age);			
				});
			}
			
		}

	}
})