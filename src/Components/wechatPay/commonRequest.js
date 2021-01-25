import {ipUri} from "../../config";

//  获取当前房间下有没有预缴订单
export const requestGetFeeItem = async (pmdsRoomId, cmdsId) => {
    return new Promise(function (resolve, reject){
        window.JQ.ajax({
            type: "post",
            url: `${ipUri["/bpi"]}/property/prepayment/hasFeeItem`,
            contentType: "application/x-www-form-urlencoded",
            data: {
                pmdsRoomId,
                cmdsId
            },
            success: (result) => {
                resolve(result);
            }
        })
    })
};


