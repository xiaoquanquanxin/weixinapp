module.exports = {
    devServer: {
        host: '192.168.100.128',
        port: 8088,
        proxy: {
            "/life-web": 'http://asm-test.seedland.cc:8084/',
        }
    },
};
