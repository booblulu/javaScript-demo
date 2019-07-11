var http = require("http");
var fs = require("fs");

// 模块
var hello = require("./hello");
h = new hello();
h.set("hello!!!");
h.get();

// 同步获取
// var data = fs.readFileSync("test.txt");
// 异步获取
var data = "";
fs.readFile("test.txt", (err, d)=>{
    if(err) return console.log(err);
    data = d.toString();
})




// 创建服务器，监听8888端口
http.createServer((request, response)=>{
    // 返回响应头 200
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // 返回响应数据
    request.end(data);
}).listen(8888);