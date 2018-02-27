const webpack = require('webpack');
const server = require('./dev.server.conf.js');

module.exports = {
    devtool: 'cheap-module-source-map',
    devServer: server,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}
