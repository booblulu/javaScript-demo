var event = require("events");
var emitter = new event.EventEmitter();

var listener1 = ()=>{
    console.log('监听器 listener1 执行。');
}

var listener2 = ()=>{
    console.log('监听器 listener2 执行。');
}

// 绑定 connection 事件，处理函数为 listener1 listener2
emitter.addListener('connection', listener1);
emitter.on('connection', listener2);

var eventListeners = emitter.listenerCount('connection');
console.log(eventListeners + " 个监听器监听连接事件。");

emitter.emit("connection");

// removeAllListeners 移除全部
// 移除监绑定的 listener1 函数
emitter.removeListener('connection', listener1);
console.log("listener1 不再受监听。");

emitter.emit("connection");

eventListeners = emitter.listenerCount('connection');
console.log(eventListeners + " 个监听器监听连接事件。");

console.log("程序执行完毕。");