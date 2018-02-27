const webpack = require('webpack');
const opn = require('opn');
const express = require('express');
const config = require('./webpack.common.conf')('development');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const proxyMiddleware = require('http-proxy-middleware');
const historyApiFallback = require('connect-history-api-fallback');
const compiler = webpack(config);
const port = 3000;
const app = express();

const proxyTable = require('./dev.server.conf.js')['proxy'];
const historyfallback = require('./dev.server.conf.js')['historyApiFallback'];

for (let context in proxyTable) {
    app.use(proxyMiddleware(context, proxyTable[context]));
}

app.use(historyApiFallback(historyfallback));

app.use(devMiddleware(compiler, {publicPath: config.output.publicPath}));

app.use(hotMiddleware(compiler));

app.listen(port, () => {
    console.log('Example app listening on port ' + port);
    opn('http://localhost:' + port);
});
