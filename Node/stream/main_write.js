var fs = require("fs");

var data = "www.baidu.com \n";

// 创建写入流
var writeStream = fs.createWriteStream("output.txt");

// 使用UTF8格式写入数据
writeStream.write(data, "UTF8");

// 标记文件末尾
writeStream.end();

writeStream.on("finish", ()=>{
    console.log("写入完成。");
})

writeStream.on("error", (err)=>{
    console.log(err.stack);
})

console.log("程序执行完毕");