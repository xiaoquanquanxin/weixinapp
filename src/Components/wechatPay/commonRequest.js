import {ipUri} from "../../config";

//  获取房间信息
export const requestGetPmdRoomsFn = async () => {
    return await new Promise(function (resolve, reject){
        const userInfo = JSON.parse(window.getLocalData('userInfo') || '{}');
        window.JQ.ajax({
            type: "POST",
            url: `${ipUri["/bpi"]}/getPmdRooms.do`,
            contentType: "application/x-www-form-urlencoded",
            data: {
                //  微信的用户id-从微信的登录后的数据里取
                wxUserID: userInfo.id,
            },
            success: (result) => {
                resolve(result);
            }
        })
    });
};

//  获取未缴账单列表
export const requestGetUnpaidBillFn = async (roomIDs, userID) => {
    return await new Promise(function (resolve, reject){
        window.JQ.ajax({
            crossDomain: true,
            type: "post",
            url: `${ipUri["/bpi"]}/getUnpaidBill.do`,
            contentType: "application/x-www-form-urlencoded",
            data: {'json': JSON.stringify({roomIDs, userID})},
            success: (result) => {
                resolve(result);
            }
        });
    })
};

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
export const requestWeChatPayAdvanceFn = async (mchOrderNo, amount) => {
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


//  获取订单状态
export const requestGetTranStatusFn = async (json) => {
    return await new Promise((resolve, reject) => {
        window.JQ.ajax({
            crossDomain: true,
            type: "post",
            url: `${ipUri["/bpi"]}/getTranStatus.do`,
            contentType: "application/x-www-form-urlencoded",
            data: {'json': JSON.stringify(json)},
            success: (response) => {
                resolve(response);
            },
        })
    });
};

//  完成订单
export const requestCompletePaidOrderFn = async (transactionId, store) => {
    return {code: 2000};
    //  下面好像是多余的
    return await new Promise((resolve, reject) => {
        const updateTime = new Date().format('yyyy-MM-dd hh:mm:ss');
        store.updateTime = updateTime;
        const data = {
            transactionId,
            updateTime,
            //  服务端处理
            payMethod: '600'
        };
        console.log('completePaidOrder的参数是', data);
        window.JQ.ajax({
            crossDomain: true,
            type: "post",
            url: `${ipUri["/bpi"]}/completePaidOrder.do`,
            contentType: "application/x-www-form-urlencoded",
            data: {'json': JSON.stringify(data)},
            success: (result) => {
                resolve(result);
            },
        })
    });
};

//  转json
const transformWechatPayData = (data) => {
    return JSON.parse(data.payParams);
    const {appid: appId, nonce_str: nonceStr, prepay_id, paySign, signType} = data;
    return {
        timeStamp: new Date().getTime(),
        package: `prepay_id=${prepay_id}`,
        nonceStr,
        signType,
        paySign,
        appId,
    }
};

//  唤醒微信
export const getBrandWCPayRequestFn = async (payParams) => {
    payParams = transformWechatPayData(payParams);
    console.log('payParams是', payParams);
    return await new Promise((resolve, reject) => {
        if (typeof WeixinJSBridge != "undefined") {
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest',
                payParams,
                (res) => {
                    console.log('唤醒微信后的res', res);
                    resolve(res.err_msg === "get_brand_wcpay_request:ok");
                }
            );
            return;
        }
        resolve(false);
    });
};
