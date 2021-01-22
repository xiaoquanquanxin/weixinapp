//  2020年12月29日19:41:37，新增接口配置
export const ipUri = {
    //  '/life-web': 'http://asm-test.seedland.cc:8084/life-web/',

    //  服务端源码接口
    '/mpi': 'https://hachiseedland-dev.hachi-tech.com/wechat-mobile/',
    // '/mpi': 'http://192.168.100.208:5080/wechat-mobile/',
    //  少杰 端口
    '/opi': 'http://hachi-pay.mynatapp.cc/api',

    //  todo    wechat-pay
    '/bpi': 'http://192.168.100.208:3080',
    // '/bpi': 'https://hachiseedland-dev.hachi-tech.com/v3/api',
};

const host = ipUri["/mpi"];
console.log(`api前面的静态资源前缀 ${host}`);
const obj = {
    siteHost: host,
    urlPrefix: host
};

obj.format = function (obj){
    let str = '';
    for (let [key, value] of Object.entries(obj)) {
        if (!Number(key)) {
            str = str + key + '=' + value + '&'
        }
    }
    return str.slice(0, str.length - 1);
};
export default obj;
