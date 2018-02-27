const path = require('path');

var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: path.join(__dirname, './src/app.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        chunkFilename: '[name].chunk.js',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /^(.(?!\.useable))+\.(css||less)$/,
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
                            options: {
                                // minimize: true,
                                modules: true,
                                localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('postcss-cssnext')(),
                                    // require('cssnano')()
                                ]
                            }
                        }, {
                            loader: 'less-loader'
                        }
                    ]
                })
            }, {
                test: /\.useable\.css$/,
                use: [
                    {
                        loader: "style-loader/useable"
                    }, {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    },
    plugins: [new ExtractTextWebpackPlugin({
            filename: '[name].min.css', //生成的文件名
            allChunks: false
        })]
}