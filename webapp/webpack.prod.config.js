const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
      app: './index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[chunkhash].[name].js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        'alert_events_api': 'empty-module'
      }
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-object-rest-spread']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.png$/,
                loader: "url-loader?prefix=img/limit=100000"
            },
            {
                test: /\.jpg$/,
                loader: "url-loader?prefix=img/limit=100000"
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: __dirname,
            verbose: true,
            dry: false,
        }),
        new HtmlWebpackPlugin({
            title: 'MBTA Alert Metrics',
            inject: 'body',
            template: 'src/templates/index.html',
            favicon: 'src/img/favicon.png'
        }),
        new webpack.DefinePlugin({
           'process.env': {
               NODE_ENV: JSON.stringify('production'),
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
          name: "commons",
          minChunks: function (module) {
             return module.context && module.context.indexOf('node_modules') !== -1;
          }
        }),
        new webpack.optimize.UglifyJsPlugin(),
    ]
};
