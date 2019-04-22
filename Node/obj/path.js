// 引入核心对象
const path = require('path'); // path在node.exe中

// 拼接路径，例子：3个路径来自不同用户的输入   //one//    two    ///three///
const mypath = path.join(__dirname,'//one//','two','///three.txt///');
console.log(mypath); // 当前运行文件的绝对路径\one\two\three\

// 相对路径转绝对路径
const str = `./abc/efg.js`;
let temp = path.resolve(str);
console.log(temp);

// 接受一个合法的路径字符串，转换成一个对象
let objPath = path.parse(mypath);
console.log(objPath);
//  { 
//      root: 'D:\\', 根目录
//      dir: 运行文件夹
//          'D:\\Program Files\\Git\\storeroom\\basics\\Node\\day01\\one\\two',
//      base: 'three.txt', 文件名+后缀名
//      ext: 'txt', 后缀名
//      name: 'three' 文件名
//  }
// base可以作为修改文件名和后缀名的方式
objPath.base = "four.js";
console.log(objPath);

// 接收一个路径对象，转换成一个字符串路径
let strPath = path.format(objPath);
console.log(strPath);