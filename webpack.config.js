const path = require('path');

module.exports = {
    
    mode: "development", 
    devtool:"source-map", 
    entry: "./www/app/main", 
    output: {
        path: path.resolve(__dirname, "www/dist"), //the folder of the final packaged file
        filename: "bundle.js", //final file
        publicPath:"",//add prefix in the url,using for production
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)?$/, //handle all js or jsx file
                include: [
                  path.resolve(__dirname, "www/app") //the js in www/app will pass babel-loader
                ],
                exclude: [
                  path.resolve(__dirname, "node_modules") //but not node_modules
                ],
                loader: "babel-loader", //use babel-loader to translate es6 syntax 
                options: {
                    presets: [
                        "env", //convert es6 to es5, it acutrally support 2015,2016,2017..., no need more config
                        "react" //convert jsx  to es5
                    ], 
                    plugins: [
                        "transform-object-rest-spread", //make react can use es6 ...spread operation
                        "transform-es2015-arrow-functions", //make react can use arrow func
                        "transform-runtime" //make babel can translate new APIs，like async&await、Iterator、Generator、Set、Maps, includs...
                    ]
                }
            },
            {
                test:/\.less$/, //handle all less file
                include:[
                    path.resolve(__dirname,"www/app") //all less file in www/app 
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules") //but not modules
                ],
                use: [ //process from less to style
                    { loader: "style-loader"}, // create style tag in the html
                    {loader: "css-loader"}, // parse @import, url...in the css file
                    {
                        loader: "less-loader", // convert less files to css files
                        options: {
                            modifyVars: { // modify some variable in the less files
                                    'primary-color': "orange",
                                    'link-color': '#1DA57A',
                                    'border-radius-base': '2px',
                            },
                            javascriptEnabled: true, // if you want to wirte js code in less
                        }
                    
                    }
                ]
            }
        ]
    }
}