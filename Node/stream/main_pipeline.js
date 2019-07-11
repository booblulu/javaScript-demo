var fs = require("fs");

var readStream = fs.createReadStream("input.txt");

var writeStream = fs.createWriteStream("output.txt");

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readStream.pipe(writeStream);