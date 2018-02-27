const path = require('path');
const webpack = require('webpack');
const prodConf = require('./webpack.prod.conf.js');
const devConf = require('./webpack.dev.conf.js');
const merge = require('webpack-merge');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// css不知存在于style中 可以使用该插件放在link中引用
const extractLess = new ExtractTextWebpackPlugin({filename: 'css/[name]-bundle-[hash:5].css'})
// 自动加载模块(必备)
const provide = new webpack.ProvidePlugin({axios: 'axios', fetch: 'axios'})
// html打包插件(必备)
const htmlwebpack = new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    minify: {
        collapseInlineTagWhitespace: false,
        collapseWhitespace: false
    }
});
// 设置公共出口
const publicPath = '';

// 打包分析工具
const analyzerPlugin = new BundleAnalyzer();

const generateConf = (env, analyzer) => {
    // js
    var jsLoader = [
        {
            loader: 'babel-loader'
        }
    ].concat(env === 'production'
        ? []
        : [
            {
                loader: 'eslint-loader',
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            }
        ]);

    const cssLoaders = [
        {
            loader: 'css-loader',
            options: {
                importLoaders: 2,
                sourceMap: env === 'development'
            }
        }, {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                sourceMap: env === 'development',
                plugins: [require('postcss-cssnext')()].concat(env === 'production'
                    ? require('postcss-sprites')({spritePath: 'dist/assets/imgs/sprites', retina: true})
                    : [])
            }
        }, {
            loader: 'less-loader',
            options: {
                sourceMap: env === 'development'
            }
        }
    ];

    // 样式
    var styleLoader = env === 'production'
        ? extractLess.extract({fallback: 'style-loader', use: cssLoaders})
        : [
            {
                loader: 'style-loader'
            }
        ].concat(cssLoaders);

    // 图片 如果为生产环境就要用file-loader 如果为开发环境就用url-loader
    // url-loader只是比file-loader多了文件小于某个值就变为base64编码文件的功能
    var imgLoader = env === 'development'
        ? [
            {
                loader: 'file-loader',
                options: {
                    name: '[name]-[hash:5].[ext]',
                    publicPath: publicPath,
                    outputPath: 'assets/images/'
                }
            }
        ]
        : [
            {
                loader: 'url-loader',
                options: {
                    name: '[name]-[hash:5].[ext]',
                    limit: 1e3,
                    outputPath: 'assets/imgs/'
                }
            }, {
                loader: 'img-loader',
                options: {
                    gifsicle: {
                        interlaced: false
                    },
                    mozjpeg: {
                        progressive: true,
                        arithmetic: false
                    },
                    optipng: false, // disabled
                    pngquant: {
                        floyd: 0.5,
                        speed: 2
                    },
                    svgo: {
                        plugins: [
                            {
                                removeTitle: true
                            }, {
                                convertPathData: false
                            }
                        ]
                    }
                }
            }
        ];
    // 加载字体
    var fontsLoader = [
        {
            loader: 'file-loader',
            options: {
                name: '[name]-[hash:5].[ext]',
                publicPath: publicPath,
                outputPath: 'fonts/'
            }
        }
    ];
    return {
        entry: {
            app: path.join(__dirname, '../src/app.js')
        },
        output: {
            filename: '[name].bundle.[hash:5].js',
            path: path.resolve(__dirname, '../dist'),
            publicPath: publicPath
        },
        resolve: {
            alias: {
                $$: path.resolve(__dirname, '../src/libs/jquery3.3.1.min.js')
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: path.resolve(__dirname, '../src'),
                    exclude: path.resolve(__dirname, '../src/libs'),
                    use: jsLoader
                }, {
                    test: /\.less$/,
                    use: styleLoader
                }, {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: imgLoader
                }, {
                    test: /\.(eot|woff2?|ttf|svg)$/,
                    use: fontsLoader
                }
            ]
        },
        plugins: analyzer
            ? [analyzerPlugin, extractLess, provide, htmlwebpack]
            : [extractLess, provide, htmlwebpack]
    }
}

module.exports = (env) => {
    let config = env.type === 'production'
        ? prodConf
        : devConf;
    console.log(env);
    return merge(generateConf(env.type, env.analyzer), config);
}
