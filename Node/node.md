## Node基础

### 基本使用

* 官网上下载 node-v-xx.msi 傻瓜式的安装包  一路下一步,就ok
* 检测是否安装成功 node -v
* 运行程序   node ./xxx.js

### 内置对象介绍

#### 分类

* 全局对象:  何时何处都能访问
* 核心对象:  向系统索要,引入即可使用
* 自定义对象:  按路径引入即可

#### process（全局对象）

* 每个系统的环境变量几乎都不一样，可以利用环境变量中的具体某个特定的值来区分不同的机器
* process.env 是一个对象存储所有的环境变量，我们可以通过其.属性名来获取具体的环境变量值
* process.argv 可以获取到在cmd中，输入的命令行参数

#### filename/dirname（全局对象）
* __filename 获取当前运行文件的目录,绝对路径
* __dirname 当前运行文件的绝对路径

#### 核心对象path
* 引入核心对象 `const path = require('path');`
* 在处理路径的时候很擅长,但是,其不负责判断路径是否存在文件
* 拼接并修正路径 `path.join(__dirname,'a','b');` -->当前目录/a/b
* 相对路径转绝对路径 `path.resovle('./xxx');` -->当前目录/xxx
* 接收一个合法的路径字符串，转换成一个对象 `let pathObj = path.parse(mypath);`
```javascript
{ 
    root: 'D:\\', 根目录
    dir: 运行文件夹
        'D:\\Program Files\\Git\\storeroom\\basics\\Node\\day01\\one\\two',
    base: 'three.txt', 文件名+后缀名,可以作为修改文件名和后缀名的方式
    ext: 'txt', 后缀名
    name: 'three' 文件名
}
```
* 接收一个路径对象，转换成一个字符串路径 `let str = path.format(pathObj);`

### fs文件模块

- 文件读写
- 其他功能
- 扩展介绍

#### 操作文件对象

* IO
  * I :input输入
  * O:output 输出
  * 文件的操作就是IO