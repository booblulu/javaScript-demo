var events = require("events");


// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// 绑定事件及事件的处理程序（数据接收）
eventEmitter.on('data_received', function(){
    console.log("数据接收成功");
});

// 创建事件处理程序
var connectHandler = function(){
    console.log("连接成功");

    // 触发事件（数据接收）
    eventEmitter.emit("data_received");
};

// 绑定事件及事件的处理程序（连接）
eventEmitter.on('connection', connectHandler);

// 触发事件（开始链接）
eventEmitter.emit("connection");

console.log("执行完成");
