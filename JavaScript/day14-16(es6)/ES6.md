## es6

### let、const、var的区别
在es6之前只有全局作用域，函数作用域。<br>
es6之后增加了块级作用域。

#### let
* 不能重复声明 
* 变量可修改
* 块级作用域

#### const
* 不能重复声明  
* 常量不能修改
* 块级作用域

#### var
* 可以重复声明
* 没有限制修改
* 没有块级作用域(函数级)


### 箭头函数
* 只有一个参数的时候，可以省略圆括号
* 只有一条语句的时候，可以省略花括号
```html
    <script>
        let b = 5;
        let d = (a)=>{
            return a+b;
        }
        let c = a=>a+b;
    </script>        
```


### 解构
* 前后表达式相等，前后数据类型要一致。
```html
    <script>
        let arr = [1,5,8];
        let [a,b,c] = arr; 
        console.log(a); //1
        console.log(b); //5
        console.log(c); //8  
    </script>
```
* 可以是任意类型，但类型必须对的上
```html
    <script>
        let arr = [1,5,8];
        let [json,[a,b,c],num,str] = [{name:"lulu",age:20},[3,6,7],6,"lulu"]; 
        console.log(json.name); //1
        console.log(a,b,c); //5
        console.log(num); //8  
        console.log(str); //8 
    </script>
```


### 扩展运算符
* 可以作为入参
```html
    <script>
        function test(a,b,...args){
            console.log(a); // 1
            console.log(b); // 5
            console.log(args);  // [3,5,7,8]     
        }
        test(1,5,3,5,7,8);
    </script>
```
* 可以扩展数组
```html
    <script>
        let arr1 = [2,4,7];
        let arr2 = [4,7,2];
        console.log(...arr1,...arr2); // 2 4 7 4 7 2
    </script>
```
* 增加，修改
```javascript
    var car = {
        brand: "BMW",
        length: "3米",
        price: "360000"
    }

    // 克隆对象
    var car2 = { ...car};
    console.log(car2);

    // 修改属性
    var car3 = { ...car,length:"3.1米"};
    console.log(car3);

    // 增加属性
    var car4 = { ...car,type:"SUV",price:"200000"};
    console.log(car4);	
```
* 别名
```javascript
    // 别名
    var box = {
        height: 100,
        width: 100
    }
    // 创建一个新属性boxHeight，值是box.height
    var { height:boxHeight } = box;

    // 创建两个新变量
    // 适用于，当需要同一个变量的值，但又不想改变原变量
    // 属性不需要顺序一致
    var { height:boxHeight2, width:boxWidth2 } = box;
```


### 属性简写
```javascript
    // 属性简写(并不算解构)
    var a = 3;
    var b = 4;
    var c = { a, b };
```


### 默认参数
* 当不输入参数时，会使用默认参数，当有入参时，会使用输入的参数。
```html
    <script>
        function test(a=2,b=4){
            console.log(a,b);
        }
        test(4,8); // 4,8
        test(1);   // 1,4
    </script>
```


### Object.assign() 对象的浅拷贝
```javascript
    // 克隆新对象
    // (目标对象，数据源)
    var newObj = Object.assign({},source);
    console.log(newObj);
```


### 字符串

#### 字符串模板
* 拼接字符串使用，变量使用${}包裹
```javascript
    var s1 =  ` hello `;
    var s1 =  ` world `;

    // 解决以下问题
    // 字符串拼接
    var s3 = " a " + s1 + " b " + s2; // 老拼接
    var s4 = ` a ${s1} b ${s2}`;  //用${}包裹变量

    // 模板字符串可以直接换行
    var s5 = ` <div>
                    <p>1</p>
                    <p>2</p>
                    <p>${s1}</p> 
               </div>`
```

#### 新方法

##### startsWith 
* 判断是否由其开头
```javascript
    let str = "ddd";
    console.log(str.startsWith("d")); // true
```
* 用途
```javascript
    // 用途
    let http = "git://www.baidu.com";
    if (http.startsWith("http://")) {
        alert("普通网址");
    } else if (http.startsWith("https://")) {
        alert("加密网址");
    } else if (http.startsWith("git://")) {
        alert("git地址");
    } else if (http.startsWith("svn://")) {
        alert("svn地址");
    } else {
        alert("其他");
    }
```

##### endsWith
可以用于后缀名判断
```javascript
    let endStr = "1.txt";
    if (endStr.endsWith(".txt")) {
            console.log("文本文件");
    } else if (http.startsWith(".jpg")) {
            console.log("图片文件");
    } else if (http.startsWith(".mp4")) {
            console.log("音频文件");
    } else {
            console.log("其他");
    }		
```

### rest参数
```javascript
    // 箭头函数内部不能使用arguments
    // 为弥补这个问题，rest参数因此诞生

    //...args -> 产生一个数组变量，包含函数调用传递的所以实参
    function q(...args) {

        // 验证是否是数组
        console.log(args);
        console.log(args instanceof Array);
        console.log(Object.prototype.toString.call(args));// [Object Array] 最常用
        console.log(Array.isArray(args)); // es5新方法
        // isNaN(1)  isInfinity()
    }
    q(1,4,5,7,8);
```


### 数组

#### 过滤器 filter
```javascript
    var arr3 = [32,52,74,68];
    var result = arr3.filter(item=>item>=60);
    console.log(result); //[74, 68]
```

#### 循环 forEach
```javascript
    var arr3 = [32,52,74,68];
    arr3.forEach(item=>console.log(item*2));
    // 64
    // 104
    // 148
    // 136
```

#### 计算 reduce
```javascript
    // 5.3.1 sum
    var arr5 = [6,3,6,7,3];
    var sum = arr5.reduce((tem, item, index)=>tem+item);
    console.log(sum); // 25

    // 5.3.2 平均值
    var arr5 = [6,3,6,7,3];
    var avg = arr5.reduce((tem, item, index)=>{
        if (index !== arr5.length-1) {
            return tem+item;
        }
        return (tem+item)/arr5.length;
    });
    console.log(avg); // 25		
```

#### 键值 map
```javascript
    var arr6 = [34,56,78,23,556,90];
    var resultArr = arr6.map(item=>item>=60?"及格":"不及格");
    console.log(resultArr); // ["不及格", "不及格", "及格", "不及格", "及格", "及格"]
```


### promise
```javascript
    function getBooks() {
        return new Promise((resolve,reject)=>{
            $.ajax({
                url:"/getBooks",
                success(res){
                    // 成功获取数据
                    resolve(res);
                },
                error(resErr){
                    // res为错误信息
                    // 失败执行reject()
                    reject(resErr);
                }
            })
        });
    }

    // 方式1
    getBooks().then(res=>{
        // res表示请求成功获取到的数据
    },resErr=>{
        // resErr表示错误信息
    })

    // 方式2,推荐
    // 不仅仅可以捕捉到reject()传递的参数
    // 还可以捕获到成功回调(success)中发生的错误
    // 多层只需要一个catch就可以了
    getBooks().then(res=>{
        // success
    }).then(res=>{
			console.log(`2 success`);
	}).catch(resErr=>{
        // reject()可以被catch()捕捉到错误信息
    })
```


### 面向对象

#### 老写法
```javascript
    // 类和构造函数是一个东西
    function User(name,pass) { 
        this.name = name;
        this.pass = pass;
    }
    // 方法和类分离
    User.prototype.showName = function (){
        console.log(this.name);
    }

    User.prototype.showPass = function (){
        console.log(this.pass);
    }

    var u1 = new User("lulu","123456");

    u1.showName();
    u1.showPass();

    // 继承
    function VipUser(name, pass, level) { 
        User.call(this, name, pass);

        this.level = level;
    }

    VipUser.prototype = new User();
    VipUser.prototype.constructor = VipUser;

    VipUser.prototype.showLevel = function (){
        console.log(this.level);
    }

    var v1 = new VipUser("blue","123456",3);

    v1.showName();
    v1.showPass();
    v1.showLevel();
```

#### class
* 定义类
```javascript
    class Person{
        // 构造方法
        constructor(name,age){
            this.name = name;
            this.age = age;
        }
    }
    var p1 = new Person("lulu",22);
    console.log(p1); // {age: 22,name: "lulu"}
```
* 类方法
```javascript
    class Car{
        // 构造方法
        constructor(age){
            this.age = age;
        }
        // 实例方法：通过类的实例访问的
        run(){
            console.log("开始");
        }
        getAge(){
            console.log(`今年${this.age}`);
        }
        // 静态方法，类独有
        static born(){
            console.log("出生了");
        }
    }
    // 创建Car实例
    var c1 = new Car(15);
    c1.run();          // 开始
    c1.getAge();       // 今年15
    // 只能由类访问     
    Car.born();        // 出生了
```
* 类继承
```javascript
    // 关键字extends
    class Teacher extends Person{

        constructor(name,age,gender){
            // 必须调用父类构造方法，否则会报错
            super(name,age);
            this.gender = gender;
        }
    }
    var tea = new Teacher("dd",33,"女");
    console.log(tea);
```


### JSON

#### 基础
```javascript
    // 8.1 JSON对象
    // 标准写法
    // 1. 只能用双引号
    // 2. 所有的名字(key)都必须用引号包起来		
    let json = { a: 13, b: 3};

    // JSON.stringify() 字符串化
    // encodeURIComponent() 将字符串转换成URL编码
    let str = `http://www.baidu.com?${encodeURIComponent(JSON.stringify(json))}`;
    alert(str);

    // JSON.parse() 转换成JSON
    let strJson = '{ "a": 13, "b": 3}';
    alert(JSON.parse(strJson));	
```

#### 简写
* 名字(key)和值(value)一样 
```javascript
    let a = 2,
        b = 4;
    let j1 = {a: a, b: b};
    console.log(j1);  // {a: 2, b: 4}
    let j2 = {a, b, c:12};
    console.log(j2);  // {a: 2, b: 4, c: 12}
```
* 函数简写，省略function
```javascript
    let j3 = {
        a: 12,
        // show:function(){
        show(){
            alert(this.a);
        }
    }
    j3.show();
```