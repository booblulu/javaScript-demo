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
* process.cwd 获取当前行的目录

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
    root: 'D:\\', // 根目录
    dir: // 运行文件夹
        'D:\\Program Files\\Git\\storeroom\\basics\\Node\\day01\\one\\two',
    base: 'three.txt', // 文件名+后缀名,可以作为修改文件名和后缀名的方式
    ext: 'txt', // 后缀名
    name: 'three' // 文件名
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

* node中有两种IO的操作

  * 同步IO
    * 一行代码(读文件)不执行完毕...后续代码不能执行
  * 异步IO (建议)
    * 一行代码(读写文件) 不执行完毕(正在读写中) ... 后续代码也可以执行

* 同步和异步IO的区别: 同步IO会阻塞后续代码执行,异步IO不会阻塞后续代码执行

### 包

* 多个文件，有效的被组织与管理的一个单位
* 留一个入口
* 包就是一个:文件夹

#### npm
* 自己先有一个包描述文件（__package.json__)
```javascript
{
  "name": "package_test", // 包名
  "version": "1.0.0", // 版本号
  "description": "",  // 包的描述
  "main": "index.js",  // 主入口文件
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "", // 作者名
  "license": "ISC",
  "dependencies": { // 依赖包列表
    "jquery": "^3.3.1"
  }
}
// homepage 包的官网url
// contributors 包的其他贡献值姓名
```
* 创建一个包描述文件 `npm init [-y]`
    * 会根据当前的文件夹来自动生成包名（__不允许中文，不允许大写英文字母__)
    * 默认生成 ```npm init [-y]```
* 下载一个包 `npm install art-template jquery@1.5.1 --save`
    - 记录依赖 `--save`
* 根据package.json文件中的 `dependencies` 属性恢复依赖
    - 恢复包 `npm install`  简写 ```npm i ```
* 卸载一个包 `npm uninstall jquery@1.5.1 --save`
    - 卸载简写 ```npm un jquery@1.5.1 --S`
* 下载简写 ```npm i 包名```
* __小结:以上简写:  uninstall -> un ,install -> i , --save -> -S__
* 查看包的信息
    - `npm info jquery`
* 查看包的信息中的某个字段(版本)(掌握)
    - `npm info jquery versions`
* 查看包的文档
    - `npm docs jquery`
* 安装全局命令行工具
    - `npm install -g http-server`
* 卸载全局命令行工具
    - `npm uninstall -g http-server`
* 查看全局包的下载路径
    - `npm root -g`
* 修改存储目录
    * ```npm config set prefix "D:\xxx"```
    * 不要node_modules
    * 接着，修改环境变量中的path属性
      * 添加或改为```D:\xxx```
      * 目的就是为了在任意目录启动 xxx.cmd
    * 重启命令行


#### 包的区别
* node_modules中的包,需要引入入口文件 require('xxx') (需要使用其函数或方法)
* 工具性的包（全局命令行工具)
    - 可以在cmd中安装，哪个目录都可以安装 ```npm i http-server -g```
* 全局工具 和 项目包 的区别
  * __全局工具哪个目录都可以通过命令行启动，通过任意目录启动该工具，给相对路径传递任意目录的文件给该工具__
  * __项目中的包，部分具备命令行工具的能力，需要命令行环境变量的支持__

#### nrm是npm的镜像源管理工具
* 1:全局安装 `npm install -g nrm`
* 2:查看当前可选的镜像源 `nrm ls`
* 3:切换镜像源 `nrm use taobao`
* 4.添加私有源 ```nrm add name http://www.xxx.xxx/```
* 5.cnpm 和 nrm
    - cnpm类似npm的工具，淘宝产品，只能是npm的镜像源(taobao)。
    - nrm 负责npm切换不同的镜像源,使用npm下载。

#### 安装多个node
* 删掉node的环境变量(path)
* 修改node安装文件夹名
* 增加node环境变量

#### 包的加载机制
* 我们未来可能需要辨识一个包中，入口是否是我们想要的启动程序
* 逐级向上查找node_module,直到盘符根目录
* 1:查找node_modules下的包名文件夹中的main属性(常用)
* 2:不常用:查找node_modules下的包名.js
* 3:查找node_modules下的包名文件夹中的index.js(常用)
* __逐级向上,node_modules,要么main属性,要么index.js__