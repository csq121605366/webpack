

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


















# webpack-better

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
