
# 代码分割和懒加载

## 懒加载

webpack使用两种技术

第一种(优先使用)ECMAscript提案的import()语法

> import() 调用会在内部用到 promises。如果在旧有版本浏览器中使用 import()，记得使用 一个 polyfill 库（例如 es6-promise 或 promise-polyfill），来 shim Promise。

第二种webpack特定的require.ensure

> require.ensure(dependencies: String[], callback: function(require), errorCallback: function(error), chunkName: String)


## 代码分割

目的：
分离业务代码和第三方依赖
分离业务代码和业务公共代码和第三方依赖
分离首次加载和访问后加载的代码




output:{
    path(代码输出的地址)
    publicPath(代码发布后的地址)
}