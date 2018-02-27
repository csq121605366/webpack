var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: {
        'pageA': './src/pageA',
        'pageB': './src/pageB',
        'vendor': ['lodash']
    },
    output: {
        filename: "[name].bundle.js",
        chunkFilename: '[name].chunk.js', 
        path: path.resolve(__dirname, './dist')
    },
    plugins: [
        new webpack
            .optimize
            .CommonsChunkPlugin({
                name: 'common',
                minChunks: 2,
                chunks: ['pageA', 'pageB']
            }),
        new webpack
            .optimize
            .CommonsChunkPlugin({names: ['vendor','manifest'], minChunks: Infinity})
    ]
}