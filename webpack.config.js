let webpack = require('webpack');
let path = require('path');
//noinspection JSUnresolvedFunction
module.exports = {
    entry: {
        app: ['webpack/hot/dev-server', './src/js/entry.js'],
    },
    output: {
        path: path.join(__dirname, './src/build'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:8080/built/'
    },
    devServer: {
        contentBase: './src',
        publicPath: 'http://localhost:8080/built/'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {presets: ["es2015", "stage-0", "react"]}},
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};