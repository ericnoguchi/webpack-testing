'use strict';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');

const {
    NODE_ENV
} = process.env;
const isProduction = NODE_ENV === 'production';
const isDevelopment = !isProduction;

const webpackConfig = {

    //https://webpack.js.org/configuration/devtool/
    devtool: isDevelopment && 'inline-source-map',
    entry: {
        'vendor': ["es6-promise"],
        'a': './a.js',
        'b': './b.js',
    },
    // https://webpack.js.org/configuration/stats/
    stats: {
        assetsSort: "size",
    },
    // https://webpack.js.org/configuration/output/
    output: {
        path: __dirname + '/dist',
        publicPath: '',
        filename: `[name].js`,
        chunkFilename: `./async/[id].[chunkhash:6].chunk.js`,
    },
    module: {
        rules: [{
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            // https://github.com/webpack-contrib/css-loader
                            loader: 'css-loader',
                            options: {
                                sourceMap: isDevelopment
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [autoprefixer],
                                sourceMap: isDevelopment
                            }
                        },
                        {
                            // https://github.com/jtangelder/sass-loader
                            loader: 'sass-loader',
                            options: {
                                outputStyle: 'expanded',
                                sourceMap: isDevelopment,
                                sourceMapContents: isDevelopment
                            }
                        }
                    ]
                })
            },
            {
                test: /\.js?$/,
                loader: "eslint-loader",
                enforce: "pre",
                exclude: /node_modules/,
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    // ignore external .babelrc file
                    babelrc: false,
                    presets: [
                        ["es2015", {
                            "modules": false
                        }],

                        "stage-2"
                    ],
                    "plugins": [
                        [
                            "transform-runtime",
                            {
                                "helpers": false, // defaults to true
                                "polyfill": false, // defaults to true
                                "regenerator": false, // defaults to true
                            }
                        ]
                    ]
                }
            },
            {
                // https://github.com/webpack-contrib/file-loader
                // https://github.com/webpack-contrib/url-loader
                test: /\.(jpe?g|png|gif|ttf|woff|eot|svg)$/i,
                loader: 'url-loader',
                options: {
                    limit: '10000000'
                }
            }
        ]
    },
    plugins: [
        // https://webpack.js.org/plugins/commons-chunk-plugin/
        new webpack.optimize.CommonsChunkPlugin({
            names: ['common', 'vendor', 'webpackBootstrap'],
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: false
        })
    ]
};

module.exports = webpackConfig;