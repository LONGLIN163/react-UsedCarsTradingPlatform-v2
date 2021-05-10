const path = require('path');

module.exports = {
    
    mode: "development", 
    entry: "./www/app/main", 
    output: {
        path: path.resolve(__dirname, "www/dist"),
        filename: "bundle.js"
    },
    //watch:true,
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                  path.resolve(__dirname, "www/app")
                ],
                exclude: [
                  path.resolve(__dirname, "node_modules")
                ],
                loader: "babel-loader",
                options: {
                    presets: ["env","react"],
                    plugins: ["transform-object-rest-spread","transform-runtime"]
                }
            },
            {
                test:/\.less$/,
                include:[
                    path.resolve(__dirname,"www/app")
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader",
                    options: {
                        modifyVars: {
                                 'primary-color': "red",
                                 'link-color': '#1DA57A',
                                 'border-radius-base': '2px',
                        },
                        javascriptEnabled: true,
                    }
                
                }]
            }
        ]
    }
}