module.exports = {
    devServer: {
        host: '192.168.100.128',
        port: 8088,
        proxy: {
            "/wpi": {
                target: 'http://asm-test.seedland.cc:8084/life-web/sso/api/workorder',
                changeOrigin: true,
                pathRewrite: {
                    '^/wpi': ''
                }
            },
            "/opi": {
                target: 'https://hachiseedland-dev.hachi-tech.com/v3/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/opi': ''
                }
            }
        }
    },
};
