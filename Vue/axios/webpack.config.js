const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/vmFetchPost.js",
    output: {
        path: path.resolve(__dirname, "dest"),
        filename: "bundle.min.js"
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:["style-loader", "css-loader"]
            }
        ]
    }
    
}