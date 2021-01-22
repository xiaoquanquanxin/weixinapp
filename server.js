const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const devConfig = require('./webpack.dev');
const proConfig = require('./webpack.pro');
const errorOverlayMiddleware = require('react-error-overlay/middleware');
const webpackServerConfig = require('./webpack/webpackServerConfig');
const {host, port, proxy} = webpackServerConfig.devServer;
const {API_TYPE} = process.env;
new WebpackDevServer(webpack((+API_TYPE === 1) ? devConfig : proConfig), {
    proxy,
    contentBase: './',
    host,
    hot: true,
    compress: false,
    historyApiFallback: true,
    watchOptions: {
        ignored: /node_modules/
    },
    stats: {
        modules: false,
        chunks: false,
        colors: true
    },
    setup(app){
        app.use(errorOverlayMiddleware())
    },
}).listen(port, host, function (err){
    if (err) {
        return console.log(err);
    }
    console.log(`监听地址：：http://${host}:${port}/`);
});
