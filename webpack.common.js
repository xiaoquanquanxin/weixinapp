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
const nodeEnv = process.env.NODE_ENV || 'development'
const API_TYPE = process.env.API_TYPE || '1'
const isPro = nodeEnv === 'production'
console.log('当前运行环境：', isPro ? 'production' : 'development')
//  todo    wechat-pay
let buildDirName = path.resolve(__dirname, './wechat-pay/')
if (isPro) {
    console.log("清空build目录。。")
    if (!fs.existsSync(buildDirName)) {
        fs.mkdirSync(buildDirName)
    }
    deleteall(buildDirName)
}
let randBuildDirname = new Date().format('yyyyMMdd')
let html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <title>加载中..</title>
  <meta http-equiv="Access-Control-Allow-Origin" content="*" />
  <meta charset="utf-8" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Cache-Control" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <link type="favicon" rel="shortcut icon" href="favicon.ico" />
  <script language="javascript" type="text/javascript">
    try {
           window.getQueryString = function (name) {
              var aftername = window.location.href.split("?")[1];
              if (aftername&&aftername.length>1){
                  var arr=aftername.split("&")
                  var obj={};
                  for (var i=0;i<arr.length;i++){
                      var tem=arr[i].split('=')
                      if (tem.length==2) obj[tem[0]]=tem[1]
                  }
                  return obj;
              }
              return null;
          }
        var arg=window.getQueryString();
        var url="";
        if (arg){
            if (arg.url){
                 url=decodeURIComponent(arg.url);
            }
            var pre=""
            if(url.indexOf('/')!=0){
                pre="/"
            }
            var tem=[];
            for (var k in arg){
                if (k!="url") tem.push(k+"="+arg[k])
            }
            if (tem.length>0){
                url="#"+pre+url+"?"+tem.join("&")
            }else{
                url="#"+pre+url
            }
        } 
        // console.log("url:",url)
        console.log("${randBuildDirname}/"+url)
        console.log("url1:",url)
        url=url.replace(/__jh__/g, "#")
        url=url.replace(/##/g, "#")
        //url=url.replace(/#\/\//g, "#/")
		console.log("url2:",url)
        // window.location.replace("${randBuildDirname}/"+url); 
          debugger;
        //  todo    wechat-pay
        window.location.replace("/wechat-pay/${randBuildDirname}/"+url); 
    } catch (err) {
        alert("錯誤信息"+JSON.stringify(err)+e)
    }
  </script>
  </head>
<body>
</body>
</html>`;
if (isPro) {
    //setTimeout(function(){
    let htmlFile = path.resolve(buildDirName, '../goto_index.html')
    console.log("准备写入文件：" + htmlFile)
    fs.writeFile(htmlFile, html, {flag: 'w+', encoding: 'utf8'}, function (err){
        if (err) return console.log('\n写入跳转文件失败:' + htmlFile, err);
        console.log('\n写入跳转文件成功:' + htmlFile);
    });
    //},3000)
}

let buildPath = path.resolve(buildDirName, './' + randBuildDirname + "/");
console.log(`/wechat-pay/${randBuildDirname}`)
console.log(`/wechat-pay/${randBuildDirname}`)
console.log(`/wechat-pay/${randBuildDirname}`)
module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        vendor: ['react', 'react-dom']
    },
    output: {
        path: buildPath,
        publicPath: './', //填写服务器绝对路径
        //  todo    wechat-pay      这块是否需要改成新的？
        // publicPath: `/wechat-pay/${randBuildDirname}/`, //填写服务器绝对路径
        // publicPath: `/wechat-pay/`, //填写服务器绝对路径
        // filename: 'js/[name].js',
        filename: 'wechat-pay/js/[name].js',
        // chunkFilename: 'js/[name].js',
        chunkFilename: 'wechat-pay/js/[name].js'
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
                from: __dirname + '/lib/jquery/jquery.min.js',
                to: path.resolve(buildPath, './jquery.min.js')
            },
            {
                from: __dirname + '/lib/vconsole.min.js',
                to: path.resolve(buildPath, './vconsole.min.js')
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
            // 定义全局变量
            NODE_ENV: JSON.stringify(nodeEnv),
            API_TYPE: JSON.stringify(API_TYPE)
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
