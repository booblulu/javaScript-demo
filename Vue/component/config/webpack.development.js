const HtmlWebpackPlugin = require("html-webpack-plugin");
// vue-loader-plugin
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
    mode: "development",
    output: {
        filename: "bundle.js"
    },
    devtool: "source map",
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html"
        }),
        new VueLoaderPlugin()
    ]
    
}