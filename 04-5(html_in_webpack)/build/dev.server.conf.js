module.exports = {
    inline: true, // 构建信息是否显示在控制台，false表示显示在页面
    port: 9000,
    overlay: true,
    hot: true,
    hotOnly: true,
    proxy: {
        '/api': {
            target: 'https://m.weibo.cn', // target host
            changeOrigin: true, // needed for virtual hosted sites
            headers: {
                name: 'csq'
            }, // 添加请求头信息
            logLevel: 'debug',
            pathRewrite: {
                '/test': '/comments/show'
            }
        }
    },
    historyApiFallback: {
        htmlAcceptHeaders: [
            'text/html', 'application/xhtml+xml'
        ],
        rewrites: [
            {
                from: /^\/$/,
                to: '/'
            }, {
                from: /^test$/,
                to: (context) => {
                    return 'src/pages/404.html'
                }
            }, {
                from: /./,
                to: 'src/pages/404.html'
            }
        ]
    }
}
