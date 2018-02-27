const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpack = require('clean-webpack-plugin')
const ExtractTextWebpack = require('extract-text-webpack-plugin')
const InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const generatePage = function ({
    title = '',
    entry = '',
    template = './src/index.html',
    name = '',
    chunks = []
}) {
    return {
        entry,
        plugins: [new HtmlWebpackPlugin({
                title,
                chunks,
                template,
                filename: name + '.html'
            })]
    }
}

const pages = [
    generatePage({
        title: 'page A',
        entry: {
            a: './src/pages/a'
        },
        name: 'a',
        chunks: ['react', 'a']
    }),
    generatePage({
        title: 'page B',
        entry: {
            b: './src/pages/b'
        },
        name: 'b',
        chunks: ['react', 'b']
    }),
    generatePage({
        title: 'page C',
        entry: {
            c: './src/pages/c'
        },
        name: 'c',
        chunks: ['react', 'c']
    })
];
const baseConfig = {
    entry: {
        react: ['react']
    },
    output: {
        path: resolve('dist'),
        filename: 'js/[name].[chunkhash:5].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpack.extract({fallback: 'style-loader', use: 'css-loader'})
            }
        ]
    },
    plugins: [
        new CleanWebpack(resolve('dist')),
        new webpack
            .optimize
            .CommonsChunkPlugin({
                names: ['react']
            }),
        // new InlineChunkWebpackPlugin({inlineChunks: ['manifest']}),
        new ExtractTextWebpack({filename: 'css/[name].[hash:5].css'})
    ]
}

// 多页面多配置 module.exports = pages.map(page => merge(baseConfig, page)) 多页面单配置

module.exports = merge([baseConfig].concat(pages))