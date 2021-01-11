let host = ""

// console.log("环境:",NODE_ENV)
if (API_TYPE == "1") {//测试
    // host ="http://asm-test.seedland.cc/wechat-mobile/"
    // host ="https://asm-test.seedland.cc/wechat-mobile/"
    // host = "http://192.168.100.208:5080/wechat-mobile/"
    host = "https://hachiseedland-dev.hachi-tech.com/wechat-mobile/"
    // host ="http://wx.seedland.cc:8888//wechat-mobile/"   //辉：8888  超:8089
} else if (API_TYPE == "2") {//生产
    host = "https://wx-life.seedland.cc/wechat-mobile/"
} else if (API_TYPE == "3") {
    // host ="https://wxkptest.seedland.cc:7443/"
    //host ="http://211.159.163.183:9090/mock/150/"
    host = "https://211.159.163.183:9090/mock/171/"
} else {//模拟接口\
    host = "http://211.159.163.183:9090/mock/94/"
}
var obj = {
    siteHost: host, //api前面的静态资源前缀
    urlPrefix: host
}

obj.format = function (obj){
    let str = '';
    for (let [key, value] of Object.entries(obj)) {
        if (!Number(key)) {
            str = str + key + '=' + value + '&'
        }
    }
    return str.slice(0, str.length - 1);
}
export default obj;

//  2020年12月29日19:41:37，新增接口配置
export const ipUri = {
    '/mpi': 'https://hachiseedland-dev.hachi-tech.com/wechat-moblie',
    '/opi': 'http://hachi-pay.mynatapp.cc/api',  //  少杰 端口


    //  todo    wechat-pay
    '/bpi':'http://192.168.100.208:3080',
    // '/bpi': 'https://hachiseedland-dev.hachi-tech.com/v3/api',
};

