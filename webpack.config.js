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
function getHtmlPara(name,title) {
    return {
        template: './src/view/' + name + '.html', //模板文件
        filename: 'view/' + name + '.html', //目标文件
        chunks: ['common', name], //对应加载的资源
        inject: true, //资源加入到底部
        hash: true,//加入版本号
        title:title
    }
}

//webpack config
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'list': ['./src/page/list/index.js'],
        'detail': ['./src/page/detail/index.js'],
        'cart': ['./src/page/cart/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
        'user-pass-update': ['./src/page/user-pass-update/index.js'],
        'user-center': ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'result': ['./src/page/result/index.js'],
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
            {test: /\.(woff|woff2|svg|eot|ttf)\??.*$/, loader: 'file?name=/resource/fonts/[name].[ext]'},
            {test: /\.string$/,loader:'html-loader'}
        ]
    },
    resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
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
        new HtmlWebpackPlugin(getHtmlPara("index","首页")),
        new HtmlWebpackPlugin(getHtmlPara("list","商品列表")),
        new HtmlWebpackPlugin(getHtmlPara("detail","商品详情")),
        new HtmlWebpackPlugin(getHtmlPara("cart","我的购物车")),
        new HtmlWebpackPlugin(getHtmlPara("user-login","登录页")),
        new HtmlWebpackPlugin(getHtmlPara("user-register","注册页")),
        new HtmlWebpackPlugin(getHtmlPara("user-pass-reset","重置密码页")),
        new HtmlWebpackPlugin(getHtmlPara("user-center","个人中心")),
        new HtmlWebpackPlugin(getHtmlPara("user-center-update","个人信息")),
        new HtmlWebpackPlugin(getHtmlPara("result","操作结果页")),
        new HtmlWebpackPlugin(getHtmlPara("user-pass-update","修改密码"))
    ]
};


if ("dev" === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;
 