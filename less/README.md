## less

### 入门
1. 安装 `npm i -g less`
2. Less （Leaner Style Sheets 的缩写） 是一门向后兼容的 CSS 扩展语言。包括 Less 语言以及利用 JavaScript 开发的用于将 Less 样式转换成 CSS 样式的 Less.js 工具。
3. 引用顺序
```html
    <!-- link需要在less.js前引用，并且ref必须是less -->
    <link rel="stylesheet/less" type="text/css" href="styles.less" />
    <!-- 可以在less.js之前配置less对象 -->
    <script type="text/javascript">
        less = {
            env: "development", // 或者"production"
            async: false,       // 异步加载导入的文件
            fileAsync: false,   // 使用文件协议访问页面时异步加载导入的文件
            poll: 1000,         // 在监视模式下，每两次请求之间的时间间隔（ms）
            functions: {},      // user functions, keyed by name
            dumpLineNumbers: "comments", // 或者"mediaQuery"，或者"all"
            relativeUrls: false,// 是否调整相对路径
                                // 如果为false，则url已经是相对入口less文件的
                                // entry less file
            rootpath: ":/a.com/"// 添加到每个url开始处的路径
        };
    </script>
    <script src="less.min.js"></script>
```

### 语法

#### 变量
1. 变量 @name:value;
```less
    @width: 50%;
    @height: 100px;
    @color: greenyellow;

    div {
        width: @width;
        height: @height;
        background: @color;
    }

    // 生成的css
    #box {
        width: 50%;
        height: 100px;
        background: greenyellow;
    }
```
2. 动态选择器 @{name}{}
```less
    @mySelector: #box;

    @{mySelector}{
        width: 50%;
        height: 100px;
        background: greenyellow;
    }

    // 生成的css
    #box {
        width: 50%;
        height: 100px;
        background: greenyellow;
    }
```
3. url变量  "{@image}/..."
```less
    @image: "../images";

    div {
        background: url("@{image}/头像.jpg");
    }

    // 生成的css
    div {
        background: url("../images/头像.jpg");
    }
```
4. 声明变量 name={key:value}  use @name()
```less 
    @box: {
        width: 50%;
        height: 100px;
        background:red;
    };

    div {
        @box();
    }

    // 生成的css
    div {
        width: 50%;
        height: 100px;
        background:red
    }
```
5. 变量运算 以第一个单位为基准，前后要加空格(减号有坑)
```less
    @width: 50%;
    @height: 100px;
    @color: pink;

    div {
        width: @width - 10;
        height: @height - 10;
        background: @color;
    }

    // 生成的css
    div {
        width: 40%;
        height: 90px;
        background: pink;
    }
```
6. 用变量定义变量 
```less
    @one: "hello world";
    @nums: one;

    div:after {
        content: @@nums; // 将@nums替换成其值@one
    }

    // 生成的css
    div:after {
        content: "hello world";
    }
```

#### 嵌套
1. &运算符，将&替换为上一层选择器的名字
```less
.box {
    width: @width - 10;
    height: @height - 10;
    background: @color;   
    &:after{
        content: "hi";
    }
    &_content {
        color: red;
    }
}
```
2. 媒体查询， 可以写在id内部
```less
    // 原生写法的媒体查询
    #wrap{
        width:800px;
        height: 100px;
        background: blueviolet;
    }
    @media screen and (max-width:768px){
        #wrap{
            width:500px;
            height: 100px;
            background: blue;
        }
    }
    @media screen and (max-width:400px){
        #wrap{
            width:100px;
            height: 100px;
            background: pink;
        }
    }

    // less版
    #wrap{
        width:800px;
        height: 100px;
        background: blueviolet;

        @media screen {
            @media (max-width:768px){
                    width:500px;
                    height: 100px;
                    background: blue;
            }
            @media (max-width:400px){
                    width:100px;
                    height: 100px;
                    background: pink;
            }
        }
    }
```

#### 混合方法
1. 混合方法(无参)
```less
    .box {
        width: 100px;
        height: 100px;
        background: lightblue;
    }

    .inner {
        .box   // 等价于 .box() 推荐加()避免混淆
    }

    // 生成的css
    .inner {
        width: 100px;
        height: 100px;
        background: lightblue;
    }
```
2. 混合方法(有参)  选择器(name:value,name1:value2...){}
```less
    .box(@nums: 1px,@type: solid,@color: red;) {
        width: 100px;
        height: 100px;
        border: @nums @type @color;
    }

    .inner {
        .box(10px); // 和es6一样，无参数使用默认的，有参数覆盖默认参数
    }

    // 生成的css
    .box {
        width: 100px;
        height: 100px;
        border: 1px solid red;
    }

    .inner {
        width: 100px;
        height: 100px;
        border: 10px solid red;
    }
```
3. 匹配模式，类似重载
```less
    .triangle(top,@width:20px,@color:#000){
        border-color:transparent  transparent @color transparent ;
    }
    .triangle(right,@width:20px,@color:#000){
        border-color:transparent @color transparent  transparent ;
    }

    .triangle(bottom,@width:20px,@color:#000){
        border-color:@color transparent  transparent  transparent ;
    }
    .triangle(left,@width:20px,@color:#000){
        border-color:transparent  transparent  transparent @color;
    }
    // 如果匹配的参数 是变量，则将会匹配，`@_` 
    .triangle(@_,@width:20px,@color:#000){
        width: 0;
        height: 0;
        border-style: solid;
        border-width: @width;
    }
    #main{
        .triangle(left, 50px, #999)
    }

    // 生成的 CSS 
    #main{
        width: 0;
        height: 0;
        border-left: 50px solid #999;
        border-right: 50px solid transparent;
        border-bottom: 50px solid transparent;
        border-top: 50px solid transparent;
    }
```
4. 命名空间
```less
    #color(){
        .h {
            color: blue;
        }
        .m {
            color: firebrick;
            .c {
                color: yellowgreen;
            }
        }
    }

    #header {
        #color > .h;
    }
    #main {
        // 不能省略 #color
        #color > .m;
    }
    #content {
        // #coloe > .m() > .c 中间的.m作为父节点不能加()

        // 等同于 #coloe > .m > .c()
        #color .m .c;
    }

    // 生成后的css
    #header {
        color: blue;
    }
    #main {
        color: firebrick;
    }
    #content {
        // 等同于 #coloe > .m > .c()
        color: yellowgreen;
    }
```
5. 条件筛选 when
```less
    #card{  
        // and 运算符 ，相当于 与运算 &&，必须条件全部符合才会执行
        .border(@width,@color,@style) when (@width>100px) and(@color=#999){
            border:@style @color @width;
        }
    
        // not 运算符，相当于 非运算 !，条件为 不符合才会执行
        .background(@color) when not (@color>=#222){
            background:@color;
        }
    
        // , 逗号分隔符：相当于 或运算 ||，只要有一个符合条件就会执行
        .font(@size:20px) when (@size>50px) , (@size<100px){
            font-size: @size;
        }
    }
    #main{
        #card>.border(200px,#999,solid);
        #card .background(#111);
        #card > .font(40px);
    }
    /* 生成后的 CSS */
    #main{
      border:solid #999 200px;
      background:#111;
      font-size:40px;
    }
```
6. 数量不定的参数 类似ES6扩展运算符
```less
    .boxShadow(...){
        box-shadow: @arguments;
    }
    .textShadow(@a,...){
        text-shadow: @arguments;
    }
    #main{
        .boxShadow(1px,4px,30px,red);
        .textShadow(1px,4px,30px,red);
    }

    /* 生成后的 CSS */
    #main{
    box-shadow: 1px 4px 30px red;
    text-shadow: 1px 4px 30px red;
    }
```
7. 批量使用!important
```less
    .border{
        border: solid 1px red;
        margin: 50px;
    }
    #main{
        .border() !important;
    }
    /* 生成后的 CSS */
    #main {
        border: solid 1px red !important;
        margin: 50px !important;
    }
```


#### 其他
1. 注释
    * `/* */` css原生注释，会被编译在css文件中
    * `/ /` less提供的注释，不会被编译在css中
2. 避免编译 ~'值'
```less
    .box {
        width: ~'calc(300px - 30px)';
        height: 90px;
        background: yellow;   
    }

    // 生成后的css
    .box {
        width: calc(300px - 30px);
        height: 90px;
        background: yellow;   
    }
```
3. 可以直接使用js
```less
    .box {
        width: ~'`Math.round(Math.random()*80)`px';
        height: 90px;
        background: yellow;   
        alert: ~"`alert(1)`";
    }

    // 生成后的css

    //弹出1
    .box {
        width: 0~80px;
        height: 90px;
        background: yellow;   
    }
```

参考 https://segmentfault.com/a/1190000012360995#articleHeader8