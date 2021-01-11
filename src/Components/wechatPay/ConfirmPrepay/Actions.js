import {action} from "mobx";
import {ipUri} from "../../../config";
import {Modal, Toast} from "antd-mobile";

class Actions {
    constructor(store){
        this.store = store;
    }

    //  初始化
    @action
    init(){
        const store = this.store;
        store.currentRoom = {};
        store.currentFee = {};
        store.perUnit = 0;
        store.feeItems = [];
        store.submitOrderData = {};
        //  拿页面url参数
        const params = window.getQueryString();
        params.label = decodeURIComponent(params.label);
        store.params = params;
        console.log('页面参数', JSON.parse(JSON.stringify(params)));
        //  for development
        // this.pollingGetTranStatus();
    }

    //  获取房间列表
    @action
    getRoomList = async () => {
        const result = await new Promise(function (resolve, reject){
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
        const {code, data: roomList} = result;
        //  请求错误
        if (code !== 2000) {
            return;
        }
        const store = this.store;
        const {params} = store;
        const {roomId} = params;
        //  fixme   这这个地方，需要去重，因为框架支持问题。针对的另一个点是没有cmdsId的问题
        roomList.splice(1, 1);
        for (const item of roomList) {
            if (item.roomId === roomId) {
                store.currentRoom = item;
                return
            }
        }
    };

    //  获取当前房间下有没有预缴订单
    @action getFeeItem = async () => {
        const store = this.store;
        const {currentRoom, params} = store;
        const result = await new Promise(function (resolve, reject){
            const userInfo = JSON.parse(window.getLocalData('userInfo') || '{}');
            window.JQ.ajax({
                type: "post",
                url: `${ipUri["/bpi"]}/property/prepayment/hasFeeItem`,
                contentType: "application/x-www-form-urlencoded",
                data: {
                    pmdsRoomId: params.roomId,
                    cmdsId: userInfo.id,
                },
                success: (result) => {
                    resolve(result);
                }
            })
        });
        const {code, data, msg} = result;
        //  请求错误
        //  todo    暂时放开
        // if (!data || +code !== 2000) {
        //     Toast.hide();
        //     Modal.alert('提示', msg || '费项异常，暂不能进行预缴', [{
        //         text: '确定', onPress: async () => {
        //             window.history.back();
        //         }
        //     }]);
        //     return;
        // }
        //  查询预缴费项信息
        this.getFeeInfo();
    };

    //  查询预缴费项信息
    @action
    getFeeInfo = async () => {
        const store = this.store;
        const {params, currentRoom} = store;
        const result = await new Promise(function (resolve, reject){
            const userInfo = JSON.parse(window.getLocalData('userInfo') || '{}');
            window.JQ.ajax({
                type: "post",
                url: `${ipUri["/bpi"]}/property/prepayment/queryFeeInfo`,
                contentType: "application/x-www-form-urlencoded",
                data: {
                    pmdsRoomId: params.roomId,
                    cmdsId: currentRoom.cmdsId,
                },
                success: (result) => {
                    resolve(result);
                }
            })
        });
        const {code, data, msg} = result;
        //  请求错误
        if ((code !== 2000) || !data || !data.length) {
            Toast.info(msg || '系统异常', 1);
            return;
        }

        //  对比出来是哪个费用
        const {label} = params;
        for (const item of data) {
            const {feeName, itemSourceName,} = item;
            //  console.log(`${feeName}(${itemSourceName})`);
            if (`${feeName}(${itemSourceName})` === label) {
                item.label = label;
                store.currentFee = item;
                break;
            }
        }
        // 获取专项预缴费项订单明细
        this.getFeeitemDetails();
    };

    //  获取专项预缴费项订单明细
    @action
    getFeeitemDetails = async () => {
        const store = this.store;
        const {currentFee, currentRoom, params} = store;
        const result = await new Promise(function (resolve, reject){
            const userInfo = JSON.parse(window.getLocalData('userInfo') || '{}');
            const data = {
                //  当前房间id
                pmdsRoomId: params.roomId,
                cmdsId: currentRoom.cmdsId,
                // 费项id
                feeId: currentFee.feeId,
                // 数据来源：房间号、表具编号、车位号
                itemSourceName: currentFee.itemSourceName,
                //  自定义预缴月数，服务端验证必填了，随便传就行
                customMonths: 1,
            };
            window.JQ.ajax({
                type: "post",
                url: `${ipUri["/bpi"]}/property/prepayment/queryFeeitemDetails`,
                contentType: "application/x-www-form-urlencoded",
                data,
                success: (result) => {
                    resolve(result);
                }
            })
        });
        const {code, data: queryFeeitemDetails} = result;
        //  请求错误
        if (code !== 2000) {
            Toast.hide();
            return;
        }
        const {feeItems} = queryFeeitemDetails;
        //  切出来前n项
        feeItems.splice(params.paymentMonth);
        //  计算金额
        store.perUnit = feeItems.reduce((prev, current) => {
            return prev + +current.perUnit;
        }, 0);
        store.feeItems = feeItems;
        Toast.hide();
    };

    /***************************上面应该都没问题*********************************/
    /***************************上面应该都没问题*********************************/
    /***************************上面应该都没问题*********************************/
        //  微信支付
    @action
    goPay = async () => {
        Toast.loading('Loading...', 3);
        const store = this.store;
        const {perUnit, currentFee, currentRoom, feeItems} = store;
        const result = await new Promise(function (resolve, reject){
            const userInfo = JSON.parse(window.getLocalData('userInfo') || '{}');
            const data = {
                //  当前房间数据里的roomId-从getPmdRooms.do接口里取
                pmdsRoomId: currentRoom.roomId,
                //  当前房间数据里的cmdsId-从getPmdRooms.do接口里取
                cmdsId: currentRoom.cmdsId,
                //  微信的用户id-从微信的登录后的数据里取
                userID: userInfo.id,
                //  客户名称-从微信的登录后的数据里取
                userName: userInfo.fullName || userInfo.nickName,
                //  手机号-从微信的登录后的数据里取
                phoneNum: userInfo.phoneNo,
                //  订单明细 json格式-从/property/prepayment/queryFeeitemDetails接口取+前端组织
                feeItems: JSON.stringify(feeItems),
                //  当前房间的belongProject-从getPmdRooms.do接口里取
                villageInfoId: currentRoom.belongProject,
                //  设备
                terminalSource: (window.OSInfo() === "ios") ? '1' : '0',
                //  订单金额-从/property/prepayment/queryFeeitemDetails接口取+前端计算
                totalAmount: perUnit,
                //  费项id-从/property/prepayment/queryFeeInfo接口取+前端计算
                feeId: currentFee.feeId,
            };
            console.log('微信支付第一个接口，穿参 ', data);
            window.JQ.ajax({
                type: "post",
                url: `${ipUri["/bpi"]}/property/prepayment/createAdvanceOrder`,
                contentType: "application/x-www-form-urlencoded",
                data,
                success: (result) => {
                    resolve(result);
                }
            })
        });
        const {code, data, msg} = result;
        //  请求错误
        if (code !== 2000) {
            Toast.info(msg, 2);
            return;
        }
        console.log('submitOrderData', data);
        store.submitOrderData = data;
        // orderCode: "20210107204803703"
        // orderId: "e8dfb66d-81be-4665-b2ad-efabcfb660e2"
        // orderMoney: 350
        //  查看是否是待支付
        return this.getTranStatus();
    };

    //  获取订单状态
    getTranStatus = async () => {
        const store = this.store;
        const {submitOrderData} = store;
        const result = await new Promise(function (resolve, reject){
            window.JQ.ajax({
                type: "post",
                url: `${ipUri["/bpi"]}/getTranStatus.do`,
                contentType: "application/x-www-form-urlencoded",
                data: {'json': JSON.stringify({transactionId: submitOrderData.orderCode})},
                success: (result) => {
                    resolve(result);
                }
            })
        });
        const {data,} = result;
        if (data.status === 0) {
            //  微信支付
            return this.getPay();
        } else {
            Toast.info('您的账单已缴纳，请重新选择！', 2);
        }
    };

    //  下单支付
    @action
    getPay = async () => {
        const store = this.store;
        const {submitOrderData} = store;
        const result = await new Promise((resolve, reject) => {
            const userInfo = JSON.parse(window.getLocalData('userInfo') || '{}');
            const params = {
                //  自定义商户ID，公众号支付传10000000
                mchId: '10000000',
                //  商户订单号-从 获取订单状态 /getTranStatus.do接口取
                mchOrderNo: submitOrderData.orderCode,
                //  渠道id,公众号传"WX_JSAPI"
                channelId: "WX_JSAPI",
                //  支付金额（单位分）   todo    暂时交1分钱
                // amount: (submitOrderData.orderMoney * 100) | 0,
                amount: 1,
                //  任意ip
                clientIp: "192.168.100.128",
                //  设备
                device: (window.OSInfo() === "ios") ? 'ios' : 'Android',
                //  openId-从微信授权数据里取
                openId: userInfo.openId,
            };
            window.JQ.ajax({
                type: "get",
                url: `${ipUri["/opi"]}/pay/create_order`,
                data: {params: JSON.stringify(params)},
                success: (result) => {
                    resolve(result);
                },
            })
        });
        //  result是一个字符串
        const res = JSON.parse(result);
        const {resCode, payParams} = res;
        //  唤起微信支付
        if (resCode === 'SUCCESS') {
            return this.arouseWeChatToPay(payParams);
        } else {
            return false;
        }
    };

    //  唤起微信支付
    @action
    arouseWeChatToPay = async (payParams) => {
        const result = await new Promise((resolve, reject) => {
            if (typeof WeixinJSBridge != "undefined") {
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    payParams,
                    (res) => {
                        resolve(res.err_msg === "get_brand_wcpay_request:ok");
                    }
                );
                return;
            }
            resolve(false);
        });
        console.log('唤起微信支付', result);
        //  如果支付失败
        if (result !== true) {
            return false;
        }
        Toast.loading('正在处理订单', 10000);
        return this.pollingGetTranStatus();
    };

    //  轮训状态
    @action
    pollingGetTranStatus = async () => {
        const store = this.store;
        const {submitOrderData} = store;
        const result = await new Promise((resolve, reject) => {
            window.JQ.ajax({
                crossDomain: true,
                type: "post",
                url: `${ipUri["/bpi"]}/getTranStatus.do`,
                contentType: "application/x-www-form-urlencoded",
                data: {'json': JSON.stringify({transactionId: submitOrderData.orderId})},
                // data: {'json': JSON.stringify({transactionId: '20210108170819078'})},
                success: (result) => {
                    resolve(result);
                },
            })
        });
        const {data} = result;
        const {tranStatus} = data;
        //  预交1是已支付
        if (tranStatus === 1) {
            //  完成订单【确实已经支付】
            return this.completePaidOrder();
        }
        console.log('轮训状态', new Date().getSeconds());
        console.log(data);
        const next = await new Promise(resolve => {
            setTimeout(() => {
                resolve(true);
            }, 3000);
        });
        if (next) {
            return this.pollingGetTranStatus();
        }
    };
    //  完成订单
    @action
    completePaidOrder = async () => {
        const store = this.store;
        const {submitOrderData} = store;
        const result = await new Promise((resolve, reject) => {
            let data = {
                transactionId: submitOrderData.orderId,
                updateTime: submitOrderData.createTime,
                //  服务端处理
                payMethod: ''
            };
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
        const {code} = result;
        return code === 2000;
    }

}

export default Actions;
