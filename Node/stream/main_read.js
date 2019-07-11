var fs = require("fs");
var data = "";

// 创建读取流
var readStream = fs.createReadStream("input.txt");

// 设置编码为 utf-8
readStream.setEncoding("UTF8");

// 处理流事件 --> data, end, error
readStream.on("data", (chunk)=>{
    data += chunk;
})

readStream.on("end", ()=>{
    console.log(data);
})

readStream.on("error", (err)=>{
    console.log(err.stack);
})

console.log("程序执行完毕");