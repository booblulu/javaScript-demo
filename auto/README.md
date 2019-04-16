## 自动化工具

### 版本控制

#### git
* 分布式，每个客户端都是服务器
* 操作
    - 克隆库 `git clone "路径" 文件夹名`
    - 添加全部文件 `git add .`
    - 提交到本地 `git commit -m "提示信息" `
    - 提交到服务器 `git push origin master`
    - 下载到本地 `git pull origin master`
    - 比较修改 `git mergetool` (会使用svn的)
    - 查看状态 `git status -s`


#### svn
* 集中式，服务器挂就会影响使用。


#### 版本控制的好处
* 使用方便
* 可以追溯以前提交的版本
* 解决合并冲突的问题
* 安全性好



### 构建工具

#### gulp
* 安装全局gulp `npm i -g gulp`   --启动器
* 安装本地gulp `npm i gulp -S`   --核心库
* 需要新建 gulpfile.js 文件
* 需要创建一个包描述文件 `npm init [-y]`
* 添加压缩组件 `npm i gulp-uglify -D-S`
* 添加css压缩组件 `npm i gulp-cssmin -D-S`
* 添加babel `npm i gulp-babel @babel/core @babel/preset-env -D`
* 执行gulp 
    - 默认default任务会执行 `gulp`
    - 执行特定任务 `gulp taskName`
* 编辑 gulpfile.js
    - 引入gulp、使用的gilp-xx包
    - 创建gulp任务 `gulp.task('taskName',()=>{return xxx;})`
* node-glob模块
    - * 匹配文件路径中的0或多个字符
    - ** 匹配路径中的0或多个目录及其子目录
* 自动刷新
    - 服务器 `npm i http-server -g`
    - 自动刷新 `npm i gulp-livereload -D` || `npm i -g browser-sync`
    - 在终端中进入项目目录，当我们本地没有起服务的时候
    -   `browser-sync start --server --files "css/*.css"`
    - 如果本地通过php,node,nginx等起了服务，对于这些动态站点使用代理模式
    -   `browser-sync start --proxy "localhost:4000" --files "**"`


#### webpack

* 安装webpack 
    - 安装全局webpack `npm i webpack -g`
    - 安装webpack-cli `npm i webpack-cli -g`
    - 本地需要引入webpack `npm link webpack`
* 新建webpack.config.js
```javascript
    module.exports = {
        // node 不压缩  production 能压缩多大压多大 development 保留有效信息，会报错
        mode: 'development',
        // 打包文件的入口
        // entry: './src/js/a', // 单入口
        entry: {  // 多出口
            a: './src/js/a.js',
            b: './src/js/b.js'
        },
        // 打包文件的出口
        output: {
            // 输出文件路径
            path: path.resolve(__dirname,'bulid'),
            // 文件名 a.min.js,b.min.js
            filename: '[name].min.js'
        }
    }
```
* loader -- 帮助webpack预处理js以外的文件，然后送给webpack
    - 安装 `npm i style-loader css-loader`
    - css-loader 加载css文件，使webpack认识它，但没有实际作用
    - style-loader 会将css转换成style标签
    ```javascript
        module.exports = {
            mode: 'development',
            // entry: './src/js/a',
            entry: {
                a: './src/js/a.js',
                b: './src/js/b.js'
            },
            output: {
                path: path.resolve(__dirname,'bulid'),
                // a.min.js,b.min.js
                filename: '[name].min.js'
            },
            module: {
                // 模块的规则
                rules: [
                    // 先执行后面，再向前执行
                    // 读取成为字符串，然后创建标签，写进去
                    {test: /\.css$/, use: ['style-loader','css-loader']}
                ]
            }
        };
    ```
    - postcss-loader 给浏览器加前缀   
    - autoprefixer 根据浏览器兼容表，帮助选择性的添加哪个前缀，大于5%用户使用默认添加
        - 需要配置postcss.config.js文件，引入autoprefixer
        ```javascript
            module.exports={
                plugins: [
                    require('autoprefixer')
                ]
            }
        ```
    - file-loader 读取并输出文件
    - url-loader 读取并输出为base64
    - less-loader less 会将less转换成style标签
    - babel-loader  es6解析
    - 代码质量 `npm i eslint eslint-loader -D`
    ```javascript
        {
            "parserOptions": {
                "ecmaVersion": 6,  // eslint标准版本
                "sourceType": "module", // 已模块身份存在
                "ecmaFeatures": {  // 是否启用
                    "jsx": true
                }
            },
            "rules": { // 规则
                "indent": ["error",2], // 缩进两个空格
                "linebreak-style":["error","unix"], // 换行\n
                "quotes": ["error","double"], // 引号""
                "semi": ["error","always"] // 尾部分号必须有
            }
        }
    ```
    
* 热更新 dev-server
    - 需要在本地安装 `npm i webpack-dev-server -D`
    - 需要webpack(一般在连接的时候已经依赖上了),webpack-cli(启动器)的依赖 `npm i webpack-cli -S`
    - --open直接打开浏览器
    ```javascript
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "start": "webpack-dev-server --open" // 在package.json中配置
        }
    ```
    - 执行webpack-dev-server `npm run start`
    - 会将编译的结果存放在内存中，不会修改磁盘文件，提升速度
* 单元测试 jest
    - 安装 `npm i jest jest-cli jest-webpack -D`
    - 需要编辑测试用例 例子名：`sum.js` 测试用例`sum.test.js`

#### devDependencies 和 dependencies 的区别
devDependencies(-D) 是开发环境下依赖的模块，生产环境不会被打入包内 
dependencies(-S) 是生产环境和开发环境都能用

#### 动态webpack
* 格式
```javascript
    // 动态写法
    // env 环境参数
    // argv 所有选项
    module.exports = function(env, argv){
        env = env || {};
        return {
            entry: "./src/vm.js",
            module:{
                rules:[
                    {
                        test:/\.css$/,
                        use:["style-loader","css-loader"]
                    },
                    {
                        test: /\.(eot|svg|ttf|woff|woff2)$/i,
                        use: ["file-loader"]
                    }
                ]
            },
            // 判断是哪个生产模式，将其json引入在此
            ...env.development?require("./config/webpack.development"):require("./config/webpack.production")
        };
    }
```
* package.json文件增加bulid，可以在命令行敲，但是麻烦，直接配置，少敲几个字母
```json
  "scripts": {
    //  ...  
    "start": "webpack-dev-server --env.development --open",
    "build": "webpack --env.production"
  },
```
* 新建两个js文件，根据模式不同使用不同的config
    - webpack.development.js 生产模式
    ```javascript
        module.exports = {
            mode: "development",
            output: {
                filename: "bundle.js"
            },
            devtool: "source map"
            
        }
    ```
    - webpack.production.js 打包
    ```javascript
        const path = require("path");
        module.exports = {
            mode: "production",
            output: {
                path: path.resolve(__dirname,"../build"),
                filename: "bundle.min.js"
            }
        }
    ```

#### html-webpack-plugin
* 解决html路径的问题，原来需要在body内加个script标签，并且根据不同的情况更换路径很麻烦。
```html
    <script src="/bundle.min.js"></script>
```
* 使用html-webpack-plugin
```javascript
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    module.exports = {
        mode: "development",
        output: {
            filename: "bundle.js"
        },
        devtool: "source map",
        // 会自动生成index.html文件
        plugins: [
            new HtmlWebpackPlugin({
                template: "index.html"
            })
        ]
    }
```

### 取别名
* 由于vue引入需要写很长的路径 `import Vue from "vue/dist/vue.esm"`
```javascript
    module:{
        rules:[
            {
                test:/\.css$/,
                use:["style-loader","css-loader"]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/i,
                use: ["file-loader"]
            }
        ]
    },
    // 可以在webpack内配置
    resolve: {
        // 取别名，下次直接写vue就行
        alias: {
            "vue": "vue/dist/vue.esm"
        }
    }
```