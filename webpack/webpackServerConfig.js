module.exports = {
    devServer: {
        host: '192.168.100.128',
        port: 8088,
        proxy: {
            "/mpi": {
                target: 'https://wygzh-test.seedland.cc/wechat-mobile/',
                changeOrigin: true,
                pathRewrite: {
                    '^/mpi': '/'
                }
            },

            "/opi": {
                target: 'https://wygzh-test.seedland.cc/v3/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/opi': ''
                }
            },

            "/bpi": {
                target: 'https://wygzh-test.seedland.cc/v3/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/bpi': ''
                }
            },

            "/workorder": {
                target: 'http://asm-test.seedland.cc:8084/life-web/sso/api/workorder',
                changeOrigin: true,
                pathRewrite: {
                    '^/workorder': ''
                }
            },
        }
    },
};
