const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.dev')
const errorOverlayMiddleware = require('react-error-overlay/middleware')
const webpackServerConfig = require('./webpack/webpackServerConfig')
const proxy = require('http-proxy-middleware')

const {host,port} = webpackServerConfig.devServer;
new WebpackDevServer(webpack(config), {
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
    setup(app) {
        app.use(errorOverlayMiddleware())
    },
}).listen(port, host, function (err){
    if (err) {
        return console.log(err);
    }
    console.log(`监听地址：：https://${host}:${port}/`);
});
