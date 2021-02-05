import VConsole from 'vconsole';
//  2020年12月29日19:41:37，新增接口配置
export const ipUri = {
    //  服务端源码接口
    // '/mpi': 'http://192.168.100.208:5080/wechat-mobile/',
    // '/mpi': '/mpi',

    //  少杰 端口
    // '/opi': 'http://hachi-pay.mynatapp.cc/api',
    // '/opi': '/opi',

    // '/bpi': 'http://192.168.100.208:3080',
    // '/bpi': '/bpi',

    //  todo    wechat-pay
    // '/workorder': 'http://asm-test.seedland.cc:8084/life-web/sso/api/workorder',
    '/workorder': '/workorder',
};
if (IS_CLIENT) {
    new VConsole();
    ipUri['/mpi'] = 'https://wygzh-test.seedland.cc/wechat-mobile/';
    ipUri['/opi'] = 'https://wygzh-test.seedland.cc/v3/api';
    ipUri['/bpi'] = 'https://wygzh-test.seedland.cc/v3/api';
}


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
