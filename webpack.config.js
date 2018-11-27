/**
 * Created by wuyaru
 * Author: wuyaru
 * Date: 2018/11/26
 * Time: 9:00
 */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');


//环境变量配置 dev/online
var WEBPACK_ENV = process.env.WEBPACK_ENV || "dev";


//获取html模板配置参数
function getHtmlPara(name) {
    return {
        template: './src/view/' + name + '.html', //模板文件
        filename: 'view/' + name + '.html', //目标文件
        chunks: ['common', name], //对应加载的资源
        inject: true, //资源加入到底部
        hash: true,//加入版本号
    }
}

//webpack config
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js']
    },
    output: {
        path: './dist',
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
            {test: /\.(png|gif|jpg)$/, loader: 'url-loader?limit=10000&name=/resource/images/[hash].[ext]'},
            {test: /\.(woff|woff2|svg|eot|ttf)\??.*$/, loader: 'file?name=/resource/fonts/[name].[ext]'}
        ]
    },
    plugins: [
        //独立通用的模块打包到js/base.js文件中
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "js/base.js"
        }),
        //将css单独打包到css文件夹中
        new ExtractTextPlugin("css/[name].css"),
        //html 模板处理
        new HtmlWebpackPlugin(getHtmlPara("index")),
        new HtmlWebpackPlugin(getHtmlPara("login"))
    ]
};


if("dev"===WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;
 