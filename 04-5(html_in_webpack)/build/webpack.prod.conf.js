const webpack = require('webpack');
const glob = require('glob-all');
const path = require('path');
const PurifyCSSPlugin = require('purifycss-webpack');
const HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// 清除dist文件夹内容(必备)
const cleanDir = new CleanWebpackPlugin(['./dist'], {
    root: path.join(__dirname, '../')
});

// 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。(必备)
const named = new webpack.NamedModulesPlugin();
// 创建公共块(必备)
const commonchunkwebpack = new webpack
    .optimize
    .CommonsChunkPlugin({
        names: ['manifest']
    });

// 将代码块插入html
const htmlinlinechunkwebpack = new HtmlInlineChunkPlugin({inlineChunks: ['manifest']});
// 清除css中未使用的类名
const purifycss = new PurifyCSSPlugin({
    // 提供使用该插件的html的绝对路径
    paths: glob.sync(['./*.html', './src/*.js'])
});
const uglify = new UglifyJsPlugin();

module.exports = {
    plugins: [
        named,
        cleanDir,
        purifycss,
        commonchunkwebpack,
        htmlinlinechunkwebpack,
        uglify,
        cleanDir
    ]
}
