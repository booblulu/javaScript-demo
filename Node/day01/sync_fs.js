// 引入核心对象fs
const fs = require('fs');

const myPath = 'D:/Program Files/Git/storeroom/basics/Node/test.txt';

// 先读
let data = fs.readFileSync(myPath,'utf-8');
console.log(data);
// 后写
fs.writeFileSync('./test.txt',data);
console.log("文件复制成功");





