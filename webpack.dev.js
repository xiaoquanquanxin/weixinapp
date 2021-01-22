const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpackServerConfig = require('./webpack/webpackServerConfig')
const {host, port} = webpackServerConfig.devServer
module.exports = merge(common, {
    devtool: 'inline-source-map',
    entry: {
        app: [
            'react-hot-loader/patch',
            `webpack-dev-server/client?http://${host}:${port}`,
            'webpack/hot/only-dev-server',
            'entry.js'
        ]
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [{
            test: /\.(less|css)$/,
            //use: ['style-loader', 'css-loader','postcss-loader?rootValue=100', 'less-loader']
            use: ['style-loader', 'css-loader', {
                loader: 'less-loader'
            }]
        }]
    }
})
console.log('执行dev编译');
