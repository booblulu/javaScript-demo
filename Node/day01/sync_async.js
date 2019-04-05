const myPath = 'F:/迅雷下载/动画/你的名字.mp4';
const fs = require('fs');

console.log('同步读取前...');
fs.readFileSync(myPath); // 阻塞代码，本行不执行完，不会执行工作A
console.log("工作A...");
console.log("读取完毕");


// 异步读取
console.log("异步读取前"); 
fs.readFile(myPath,(err)=>{
    if (err) throw err;
    console.log("读取完毕");
})
console.log("工作B..."); // 不会阻塞

// 同步 会浪费cpu资源，一直等待上一步操作执行完才能继续执行，会阻塞代码的运行
// 异步，会将回调函数保存在事件队列中，等待主线程走完再执行，不会阻塞。