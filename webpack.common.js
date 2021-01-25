Date.prototype.format = function (format){
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}
var fs = require('fs'); // 引入fs模块
//删除文件夹
function deleteall(path){
    //console.log("deleteall:",path)
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index){
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteall(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
//判断当前运行环境是开发模式还是生产模式
const {API_TYPE, NODE_ENV} = process.env;
const isClient = NODE_ENV === 'production';
console.log('当前运行环境：', isClient ? 'production' : 'development');
let buildDirName = path.resolve(__dirname, './wechat-pay/');
if (isClient) {
    console.log("清空build目录。。");
    if (!fs.existsSync(buildDirName)) {
        fs.mkdirSync(buildDirName)
    }
    deleteall(buildDirName)
}
//  版本
const randBuildDirname = 20210108;
const {templateFn} = require('./webpack/templateConfig');
const html = templateFn(randBuildDirname);
if (isClient) {
    //setTimeout(function(){
    let htmlFile = path.resolve(buildDirName, '../goto_index.html');
    console.log("准备写入文件：" + htmlFile);
    fs.writeFile(htmlFile, html, {flag: 'w+', encoding: 'utf8'}, function (err){
        if (err) return console.log('\n写入跳转文件失败:' + htmlFile, err);
        console.log('\n写入跳转文件成功:' + htmlFile);
    });
    //},3000)
}

let buildPath = path.resolve(buildDirName, './' + randBuildDirname + "/");
module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        vendor: ['react', 'react-dom']
    },
    output: {
        path: buildPath,
        publicPath: './',
        filename: `js/[name].[hash].js`,
        chunkFilename: `js/[name].[chunkhash].js`
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: __dirname + '/404.html',
                to: path.resolve(buildDirName, './404.html')
            },
            {
                from: __dirname + '/goto_index.html',
                to: path.resolve(buildDirName, './index.html')
            },
            {
                from: __dirname + '/src/favicon.ico',
                to: path.resolve(buildDirName, './favicon.ico')
            },
            {
                from: __dirname + '/lib/jquery.min.js',
                to: path.resolve(buildPath, './lib/jquery.min.js')
            },
            {
                from: __dirname + '/lib/jweixin-1.6.0.min.js',
                to: path.resolve(buildPath, './lib/jweixin-1.6.0.min.js')
            },
            {
                from: __dirname + '/lib/md5.min.js',
                to: path.resolve(buildPath, './lib/md5.min.js')
            },
            {
                from: __dirname + '/lib/aes.min.js',
                to: path.resolve(buildPath, './lib/aes.min.js')
            },
            {
                from: __dirname + '/src/favicon.ico',
                to: path.resolve(buildDirName, './' + randBuildDirname + '/favicon.ico')
            }
        ]),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.DefinePlugin({
            // 往js里定义全局变量
            IS_CLIENT: JSON.stringify(isClient),
            API_TYPE: JSON.stringify(API_TYPE),
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: '../index.html',
            hash: true,
            chunks: ['vendor', 'app'],
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        })
    ],
    // alias是配置全局的路径入口名称，只要涉及到下面配置的文件路径，可以直接用定义的单个字母表示整个路径
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.join(__dirname, './src')
        ],
        alias: {
            'actions': path.resolve(__dirname, 'src/actions'),
            'PubComponents': path.resolve(__dirname, 'src/components'),
            'LibComponents': path.resolve(__dirname, 'lib/Components'),
            'containers': path.resolve(__dirname, 'src/containers'),
            'reducers': path.resolve(__dirname, 'src/reducers'),
            'LibUtils': path.resolve(__dirname, 'lib/utils')
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: 'babel-loader'
        }, {
            test: /\.html$/,
            use: 'html-loader?attrs=img:src img:data-src'
        }, {
            test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2|mp3)$/,
            use: ['file-loader?limit=1000&name=files/[md5:hash:base64:10].[ext]']
        }]
    }
}
