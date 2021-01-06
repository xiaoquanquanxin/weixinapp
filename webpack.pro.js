const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
module.exports = merge(common, {
    devtool: 'inline-source-map',
    entry: {
        app: [
            'entry.js'
        ]
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new UglifyJSPlugin()
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
console.log('执行prod编译');
