const path = require("path");


module.exports = {
    mode: "development",
    entry: "./src/js/a.js",
    // entry: {
    //     a: './src/js/a.js',
    //     b: './src/js/b.js'
    // },
    output: {
        path: path.resolve(__dirname,"bulid"),
        // a.min.js,b.min.js
        // filename: '[name].min.js'
        filename: "bundle.min.js"
    },
    module: {
        // 模块的规则
        rules: [
            // css结尾的模块使用css-loader,告诉webpack怎么处理css文件,只能解决css的引入问题，但在html中不会被执行
            // style-loader 可以让样式变成页面中的style标签
            // 先执行后面，再向前执行
            {
                test: /\.css$/, 
                use: ["style-loader","css-loader","postcss-loader"]
            },
            {
                test: /\.(png|jpg)$/,
                loader: "url-loader?limit=8192&name=images/[name].[ext]"
                // loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            },
            {
                test: /\.less$/i,
                use: ["style-loader","css-loader","less-loader"]
            },
            {
                test: /\.jsx?/i,
                // 不编译
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.js$/i,
                loader: "eslint-loader",
                exclude: /node_modules/,
                options: {

                }
            }             
        ]
    },
    devtool: "source-map"
};