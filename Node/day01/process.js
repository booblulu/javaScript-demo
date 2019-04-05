// process 全局对象 可直接使用

// 可以通过其.属性名来获取具体的环境变量值 process.env.xxx
// console.log(process.env);
// console.log(process.env.PATH);

// 相对于var来说，var会自动提升为全局变量，let不会，只是块级{}
// 服务器上，不应该有console.log()

// 可以获取到在cmd中，输入的命令行参数
// console.log(process.argv); => [node绝对路径，文件的绝对路径，1,2]

// 命令行计算器
// 数组2,3索引对于元素
let num1 = process.argv[2] - 0
    num2 = process.argv[3] - 0,
    timer = null; // 将字符串转换为数字，parseInt也行

// 卡顿输出/定时输出
console.log("计算中...");

clearTimeout(timer);

timer = setTimeout(()=>{
    console.log(`结果为：${num1+num2}`);
},2000);


