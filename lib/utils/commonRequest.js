import {ipUri} from "../../src/config";

//  获取房间信息
export const getPmdRooms = async () => {
    return await new Promise(function (resolve, reject){
        const userInfo = JSON.parse(window.getLocalData('userInfo') || '{}');
        window.JQ.ajax({
            type: "POST",
            url: `${ipUri["/bpi"]}/getPmdRooms.do`,
            contentType: "application/x-www-form-urlencoded",
            data: {
                wxUserID: userInfo.id,
            },
            success: (result) => {
                resolve(result);
            }
        })
    });
};

//  http://asm-test.seedland.cc:8084/life-web/sso/api/workorder需要的header
export const createHeader = () => {
    const appkey = '7AYzorn2RSbhED2K';
    const appSecret = 'JSWdDBcDY62tL3hrVWTl5EylNnh2FHrY';
    const t = Date.now();
    return {
        appkey,
        t,
        sign: window.md5(`${appkey}_${t}_${appSecret}`).toUpperCase(),
    }
};


