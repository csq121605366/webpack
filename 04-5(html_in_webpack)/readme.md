
使用middleware搭建开发环境

> cnpm install --save-dev opn webpack-dev-middleware webpack-hot-middleware http-proxy-middleware connect-history-api-fallback


影响打包速度

文件多？
依赖多？
页面多？


分开vendor和app    可以利用DllPlugin和DllReferencePlugin 
UglifyJsPlugin  parallel: true(多线程) cache(缓存) 
HappyPack   loader的并行处理
babel-loader    options.cacheDirectory(缓存) include exclude
resolve 减少
Devtool 去除sourcemap
cache-loader
node    升级
webpack 升级
