// 接收命令行参数，根据该目录，读取目录下的所有文件并输出(遍历文件夹)
const path = require('path');
const fs = require('fs');

// 1.接收命令行参数,修正该路径 node ./read_files.js D://xxx//xxx//xxx
// 防止用户输入的路径有误
let inputPath = path.resolve(process.argv[2]);

function testReadFiles(dir) { 
    try {
        // 2.判断该路径是否存在
        // fs.accessSync(dir,fs.constants.F_OK);
    
        // 3.遍历文件夹
        // 获取文件状态
        let state = fs.statSync(dir);
    
        // 判断是文件还是文件夹，如果是文件，直接输出，如果是文件夹，读取子文件夹，继续调用自己
        if (state.isFile()) {
            console.log(dir);
        } else if (state.isDirectory()){
            // console.log("是一个文件夹");
            let files = fs.readdirSync(dir); // ['ab.txt','b']
            files.forEach(file => {
                testReadFiles(path.join(dir,file));
            });
        }
    } catch(e) {
        // console.log(e);
        console.log("文件或文件夹不存在");
    }
}

// 2.判断该路径是否存在
fs.accessSync(inputPath,fs.constants.F_OK);
testReadFiles(inputPath);