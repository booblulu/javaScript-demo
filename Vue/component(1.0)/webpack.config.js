const path = require("path");

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
                    test:/\.css$/i,
                    use:["style-loader","css-loader"]
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2)$/i,
                    use: ["file-loader"]
                }
            ]
        },
        resolve: {
            // 取别名
            alias: {
                "vue": "vue/dist/vue.esm"
            }
        },
        ...env.development?require("./config/webpack.development"):require("./config/webpack.production")
    };
}

// 静态写法
// module.exports = {
//     mode: "development",
//     entry: "./src/vm.js",
//     output: {
//         path: path.resolve(__dirname,"dest"),
//         filename: "bundle.min.js"
//     },
//     module:{
//         rules:[
//             {
//                 test:/\.css$/,
//                 use:["style-loader","css-loader"]
//             },
//             {
//                 test: /\.(eot|svg|ttf|woff|woff2)$/i,
//                 use: ["file-loader"]
//             }
//         ]
//     }
// }