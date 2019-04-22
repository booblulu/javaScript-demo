// 引入核心对象fs
const fs = require('fs');

// I/0
// I 输入
// O 输出(展现/写入)

// 写入-> 追加-> 读取
const myPath = 'D:/Program Files/Git/storeroom/basics/Node/test.txt';

// 读取文件
fs.readFile(myPath, 'utf-8', (err,data)=>{
    // Err => Error || null
    if (err) throw err; // 抛到控制台显示异常信息
    // console.log(data);  // <Buffer 61 62 63> 缓存 16进制的ASCII
    // console.log(data.toString('utf-8')); // 将编码转换为字符串数据，默认'utf-8'，可以不写
    console.log(data); //增加第二个参数 'utf-8'，显示字符串数据
});

// 写入文件，每次写入都会重置文件，如不想重置想二次添加，可加{flag:'a'}
fs.writeFile(myPath,'我今天学习了', {flag:'a'}, (err)=>{
    if (err) throw err;
    console.log("写入成功");
})

// 追加方式1
fs.appendFile(myPath,'明天也要学',(err)=>{
    if (err) throw err;
    console.log("追加成功")
})
