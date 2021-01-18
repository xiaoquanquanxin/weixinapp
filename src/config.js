let host;

//  2020年12月29日19:41:37，新增接口配置
export const ipUri = {
    //  '/life-web': 'http://asm-test.seedland.cc:8084/life-web/',

    //  服务端源码接口
    '/mpi': 'https://hachiseedland-dev.hachi-tech.com/wechat-mobile/',
    //  少杰 端口
    '/opi': 'http://hachi-pay.mynatapp.cc/api',

    //  todo    wechat-pay
    '/bpi': 'http://192.168.100.208:3080',
    // '/bpi': 'https://hachiseedland-dev.hachi-tech.com/v3/api',
};

switch (+API_TYPE) {
    case 1:     //测试
        host = ipUri["/mpi"];
        break;
    case 2:     //生产
        host = ipUri["/mpi"];
        break;
    case 3:
        host = "https://211.159.163.183:9090/mock/171/";
        break;
    default:        //模拟接口\
        host = "http://211.159.163.183:9090/mock/94/"
}
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
