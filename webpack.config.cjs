const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    entry: './source/app/App.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        compress: true,
        static: ['./dist', './source/shared/'],
        open: false,
        host: 'localhost',
        port: 8001,
        hot: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({}),
        new HtmlWebpackPlugin({
            title:'Harmonium',
            template: './public/index.html',
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [ 'style-loader', 'css-loader' ],
            },
            {
                test: /\.handlebars$/,
                loader: 'handlebars-loader'
            },
        ],
    },
    /* resolve: {
        fallback: {
            "querystring": require.resolve("querystring-es3"),
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "stream": false,
            "crypto": false,
            "crypto-browserify": require.resolve('crypto-browserify'),
            "async_hooks": false,
        }
    }, */
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};