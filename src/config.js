import VConsole from 'vconsole';
// console.log(IS_CLIENT);
if (IS_CLIENT) {
    new VConsole();
}
//  2020年12月29日19:41:37，新增接口配置
export const ipUri = {
    //  todo    wechat-pay
    //  服务端源码接口
    '/mpi': 'https://hachiseedland-dev.hachi-tech.com/wechat-mobile/',
    // '/mpi': 'http://192.168.100.208:5080/wechat-mobile/',

    //  少杰 端口
    //  todo    wechat-pay
    // '/opi': 'http://hachi-pay.mynatapp.cc/api',
    // '/opi': 'https://hachiseedland-dev.hachi-tech.com/v3/api',
    '/opi': '/opi',

    //  todo    wechat-pay
    // '/bpi': 'https://hachiseedland-dev.hachi-tech.com/v3/api',
    '/bpi': 'http://192.168.100.208:3080',

    //  todo    wechat-pay
    // '/wpi': 'http://asm-test.seedland.cc:8084/life-web/sso/api/workorder',
    '/wpi': '/wpi',
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
