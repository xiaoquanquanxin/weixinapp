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


