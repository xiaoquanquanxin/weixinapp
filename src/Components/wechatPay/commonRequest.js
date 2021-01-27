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

//  拿微信缴费签名
export const weChatPayAdvanceFn = async (mchOrderNo, amount) => {
    return await new Promise((resolve, reject) => {
        const userInfo = JSON.parse(window.getLocalData('userInfo') || '{}');
        const params = {
            //  自定义商户ID，公众号支付传10000000
            mchId: '10000000',
            //  商户订单号-从物管接口返回的数据取
            mchOrderNo,
            //  渠道id,公众号传"WX_JSAPI"
            channelId: "WX_JSAPI",
            //  金额
            amount,
            //  任意ip
            clientIp: "192.168.100.128",
            //  设备
            device: (window.OSInfo() === "ios") ? 'ios' : 'Android',
            //  openId-从微信授权数据里取
            openId: userInfo.openId,
        };
        console.log('wechatPayAdvance的参数是', params);
        window.JQ.ajax({
            type: "post",
            url: `${ipUri["/opi"]}/live/wechatPayAdvance`,
            data: {params: JSON.stringify(params)},
            success: (result) => {
                resolve(result);
            },
        })
    });
};

//  转json
export const transformWechatPayData = (data) => {
    return data;
    const {appid, nonce_str, prepay_id, sign} = data;
    return {
        timeStamp: new Date().getTime(),
        package: `prepay_id=${prepay_id}`,
        nonceStr: nonce_str,
        signType: 'MD5',
        appId: appid,
        paySign: sign,
    }
};
