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
* __小结:以上简写:  uninstall -> un ,install -> i , --save -> -S , --dev -> -D__
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


### koa

#### 基本使用
* 下载(项目文件夹不能是koa) `npm i koa -D`
* 创建server.js文件，执行 ` node server(.js)`
```javascript
    // 引入koa
    const koa = require('koa');

    // 创建服务器
    let server = new koa();

    // 设置端口
    server.listen('8081');
```
* 需要router `npm i koa-router -D`
```javascript
    // 引入koa-router
    const Router = require("koa-router");

    // 创建路由对象
    let router = new Router();
    // async (ctx, next) ，next是下一步，可以省略
    router.get("/a", async ctx => {
        // 多次写入和字符串一样 
        ctx.body = `aaa`;
        // ctx.body += `aaa`;
    })
    // 挂到服务器上
    server.use(router.routes());
```

#### 嵌套路由
* 在server.js中写
```javascript
    // 总路由
    let router = new Router();
        // 用户路由
        let userRouter = new Router();
            let admin = new Router();
                admin.get('/index', ctx=>{
                    ctx.body = '管理员主页';
                })
            let company = new Router();
                company.get('/index', ctx=>{
                    ctx.body = '企业主页';
                })
            userRouter.use('/admin',admin.routes());
            userRouter.use('/company',company.routes());
        // 新闻路由
        let newsRouter = new Router();
            let woman = new Router();
                woman.get('/index', ctx=>{
                    ctx.body = '女性频道';
                })
            let games = new Router(); 
                games.get('/index', ctx=>{
                    ctx.body = '游戏新闻';
                })
            // 将子路由挂到newsRouter上，千万不能忘记routes()
            newsRouter.use('/games', games.routes());
            newsRouter.use('/woman', woman.routes());
    router.use('/user', userRouter.routes());
    router.use('/news', newsRouter.routes());

    server.use(router.routes());
```
* 拆成routers文件夹，每一级路由分开写
```javascript
    // 文件夹内是index时可以省略
    server.use(require('./routers'));
```

#### 路由参数
* ctx.params 参数时固定的，缺一个都不行，SEO好，后可以继续接路径
```javascript
    let router = new Router();
    router.get('/news/:id/:id1', ctx=>{
        let {id, id1} = ctx.params;
        ctx.body = `access ${id} ${id1}`; // access 333 www
    })

    server.use(router.routes());
```
* ctx.params 路由重复的时候
```javascript
    // 路由参数
    let router = new Router();
    // 路由一样的话，会按顺序执行，不用next()只执行一次，以第一个碰到的为准
    router.get('/news/:id', async (ctx, next)=>{
        let {id} = ctx.params;
        ctx.body = `access ${id} `; 
        // 会跳转到下一个符合条件的路由，由于是async函数，需要加await
        await next();
    })

    router.get('/news/1', async ctx=>{
        ctx.body += `1`; // access 1 1
    })

    server.use(router.routes());
```
* ctx.query(urlencoded) 更灵活，更方便，参数可以任意传，也不用在意顺序，seo没有ctx.params好
```javascript
    // 路由参数 ctx.query
    let router = new Router();

    // http://localhost:8081/news/?a=hello&b=lulu
    router.get('/news', async ctx=>{
        let {a,b} = ctx.query;
        ctx.body = `${a} ${b}`; // hello lulu
    })

    server.use(router.routes());
```

#### ctx
* ctx.method   请求方式
* ctx.url      请求的url(/news/?a=hello)
* ctx.path     不包括参数的路径(/news/)
* ctx.ip       客户端ip
* ctx.headers  请求头
* ctx.request
* ctx.response
* ctx.throw(code, msg) 抛错
```javascript
    let router = new Router();

    // http://localhost:8081/news/?a=hello
    router.get('/news', async ctx=>{
        if (ctx.query.a || ctx.query.b) {
            ctx.throw(400,'a or b is required'); // a or b is required
        }
        // 后面没执行
        let {a,b} = ctx.query;
        ctx.body = `${a} ${b} ${ctx.a}`;
        
    })

    server.use(router.routes());
```
* ctx.assert(条件, code, msg)  断言测试
```javascript
    let router = new Router();

    // http://localhost:8081/news/?a=hello
    router.get('/news', async ctx=>{
        ctx.assert(ctx.query.a && ctx.query.b, 400, 'a or b is required'); // a or b is required
        // 后面没执行
        let {a,b} = ctx.query;
        ctx.body = `${a} ${b} ${ctx.a}`; 
        
    })

    server.use(router.routes());
```
* ctx.state = 200  状态码
```javascript
    router.get('/login', async ctx=>{
        ctx.state = 404;  // 文件会报404
    })
```
* ctx.redirect()   跳转页面
```javascript
    router.get('/login', async ctx=>{
        ctx.redirect("/news");   // 自动跳转到news,login会报302(临时重定向)
    })
```
* ctx.attachment() 下载文件，静态生成

#### server.context  ctx的原型
* ctx的原型
* 适合放置全局变量
```javascript
    // 外部设置
    server.context.a = 11;

    // 路由参数 ctx.query
    let router = new Router();

    // http://localhost:8081/news/?a=hello&b=lulu
    router.get('/news', async ctx=>{
        let {a,b} = ctx.query;
        ctx.body = `${a} ${b} ${ctx.a}`; // hello lulu 11
    })

    server.use(router.routes());
```

#### koa-static
* 下载 ` npm i koa-static -D `
* 基本使用
```javascript
    // 引入koa-static
    const static = require('koa-static');
    // 挂在服务器上
    server.use(static('./static'));
```
* 带参数
```javascript
    // 引入koa-static
    const static = require('koa-static');
    // 挂在服务器上
    server.use(static('./static',{
        maxage: 84600*1000,    // 缓存时间，毫秒为单位，到浏览器上会变成秒
        index: '1.html'        // 默认路径
    }));
```
* 可以分别设置不同的文件格式，缓存不同的时间
```javascript
    // 引入koa-static
    const static = require('koa-static');

    // 创建路由
    let staticRouter = new Router();

    staticRouter.all(/\.(html|htm)$/i,static('./static',{
        maxage: 7200*1000// html两个小时一刷新
    }));
    staticRouter.all(/\.(jpq|png|gif)$/i,static('./static',{
        maxage: 60*86400*1000   // 图片两个月一刷新
    }));
    staticRouter.all(/\.css$/i,static('./static',{
        maxage: 1*86400*1000   // css一天一刷新
    }));
    staticRouter.all('',static('./static',{
        maxage: 30*86400*1000   // 其他文件一个月一刷新
    }));

    // 挂在服务器上
    server.use(staticRouter.routes());
```

####  koa-better-body
* 下载 ` npm i koa-better-body -D `
* 