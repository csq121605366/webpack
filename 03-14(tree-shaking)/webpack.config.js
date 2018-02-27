const path = require('path');

const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const glob = require('glob-all');
const PurifyCSS = require('purifycss-webpack');
const webpack = require('webpack');
module.exports = {
    entry: {
        app: path.join(__dirname, './src/app.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        chunkFilename: '[name].chunk.js',
        filename: '[name].bundle.js'
    },
    resolve: {
        alias: {
            jquery$: path.resolve(__dirname, './src/js/jquery3.3.1.min.js')
        }
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: {
                        loader: "style-loader",
                        options: {
                            singleton: true,
                            transform: './css.transform.js'
                        }
                    },
                    use: [
                        {
                            loader: "css-loader",
                            // options: {    minimize: true,     modules: false,     localIdentName:
                            // '[path][name]__[local]--[hash:base64:5]' }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('postcss-sprites')({spritePath: 'assets/images/sprites/', retina: true})
                                    // require('postcss-cssnext')({warnForDuplicates: false}), require('cssnano')()
                                ]
                            }
                        }, {
                            loader: 'less-loader'
                        }
                    ]
                })
            }, {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [ // {     loader: 'file-loader',     options: {         name: '[hash:5].[ext]',
                    //       publicPath: '',         outputPath: 'dist/',         useRelativePath:
                    // true     } }
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[hash:5].[ext]',
                            limit: 3e2,
                            publicPath: '',
                            outputPath: 'dist/assets/images/',
                            useRelativePath: true
                        }
                    }, {
                        loader: 'img-loader',
                        options: {
                            mozjpeg: {
                                quality: 30,
                                progressive: true,
                                arithmetic: false,
                                smooth: 50
                            }
                        }
                    }
                ]
            }, {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // name: 'fonts-[hash:5].[ext]',
                            limit: 5e3,
                            publicPath: '',
                            outputPath: 'assets/fonts/',
                            useRelativePath: false
                        }
                    }
                ]
            }, {
                test: path.resolve(__dirname, 'src/app.js'),
                use: [
                    {
                        loader: 'imports-loader',
                        options: {
                            $:'jquery',
                            jQuery:'jquery'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: '[name].min.css', //生成的文件名
            allChunks: false
        }),
        new PurifyCSS({
            paths: glob.sync([
                path.resolve(__dirname, './*.html'),
                path.resolve(__dirname, './src/*.js')
            ])
        }),
        new UglifyJsPlugin(),
        // new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery'})
    ]
}
