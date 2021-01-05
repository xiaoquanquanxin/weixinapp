import {action} from "mobx";
import {ipUri} from "../../../config";
import {Toast} from "antd-mobile";
import {retrieveColumnLayout} from "echarts/src/layout/barGrid";

class Actions {
    constructor(store){
        this.store = store;
    }

    //  初始化
    @action
    init(){
        const store = this.store;
        store.billList = [];
        store.currentRoom = {};
        store.totalMoney = 0;
    }

    //  解析url参数
    @action
    getUrlParams = async () => {
        const params = window.getQueryString();
        const {billIDsList: list, roomId} = params;
        const billIDsMap = {};
        const billIDsList = list.split(';');
        for (const key of billIDsList) {
            billIDsMap[key] = true;
        }
        const store = this.store;
        store.billIDsList = billIDsList;
        store.billIDsMap = billIDsMap;
        store.currentRoom = {roomId};
        console.log(billIDsList);
        // console.log(billIDsMap);
        // console.log(roomId);
        //  获取房间信息
        await this.getRoomList();
        //  获取未缴账单
        await this.getPaymentList();
    };

    //  获取房间信息
    @action
    getRoomList = async () => {
        const result = await new Promise((resolve, reject) => {
            window.JQ.ajax({
                type: "POST",
                url: `${ipUri["/bpi"]}/getPmdRooms.do`,
                contentType: "application/x-www-form-urlencoded",
                data: {
                    //  todo    用户的id
                    wxUserID: "5"
                },
                success: (result) => {
                    resolve(result);
                }
            })
        });
        const store = this.store;
        for (const item of result.data) {
            if (item.roomId === store.currentRoom.roomId) {
                store.currentRoom = item;
                break;
            }
        }
    };
    //  获取未缴账单
    @action
    getPaymentList = async () => {
        const store = this.store;
        const {billIDsMap, currentRoom} = store;
        const result = await new Promise((resolve, reject) => {
            const data = {
                roomIDs: currentRoom.roomId,
                userID: currentRoom.cmdsId,
            };
            window.JQ.ajax({
                crossDomain: true,
                type: "post",
                url: `${ipUri["/bpi"]}/getUnpaidBill.do`,
                contentType: "application/x-www-form-urlencoded",
                data: {'json': JSON.stringify(data)},
                success: (result) => {
                    resolve(result);
                }
            })
        });
        const {code, data} = result;
        //  请求错误
        if (code !== 2000) {
            return;
        }
        const {content} = data;
        //  渲染
        const billList = [];
        //  提交
        const billDetails = [];
        let totalMoney = 0;
        content.forEach(({billDetails: detail, billMonth}) => {
            const list = [];
            detail.forEach(item => {
                if (!billIDsMap[item.billIds]) {
                    return;
                }
                item.period = billMonth;
                item.roomID = currentRoom.roomId;
                //  todo    没数据 暂时写死
                item.buildingID = 0;
                item.billId = item.billIds;
                totalMoney += item.paidTotal;
                //  组织渲染
                list.push(item);
                //  提交
                billDetails.push(item);
            });
            if (list.length) {
                billList.push({billMonth, billDetails: list});
            }
        });
        // console.log(billList);
        //  赋值
        store.totalMoney = totalMoney;
        //  渲染
        store.billList = billList;
        //  提交
        store.billDetails = billDetails;
    };

    //  去支付，提交订单到物管
    @action
    goPay = async () => {
        const store = this.store;
        const result = await new Promise((resolve, reject) => {
            let json = {
                customerId: store.currentRoom.cmdsId,
                paidIDs: store.billIDsList.join(','),
                //  todo    从哪里取
                contactNumber: "18201538993",
                //  todo    这些参数什么意思
                terminalSource: "0",
                //  todo    这些参数什么意思
                hqUserId: "0",
                //  todo    这些参数什么意思
                projectID: "1"
            };
            window.JQ.ajax({
                crossDomain: true,
                type: "post",
                url: `${ipUri["/bpi"]}/submitOrder.do`,
                contentType: "application/x-www-form-urlencoded",
                data: {'json': JSON.stringify(json)},
                success: (result) => {
                    resolve(result);
                },
            })
        });
        const {code, data, msg} = result;
        //  请求错误
        if (code !== 2000) {
            Toast.info(msg, 1);
            return;
        }
        const a = {
            createTime: "2021-01-05 16:10:07",
            orderId: "20210105161007792",
            orderMoney: 0.1,
            //  0:未缴，type是前端加的
            type: 0
        };
        data.type = 0;
        //  物管接口返回的数据
        store.submitOrderData = data;
        //  创建订单接口，提交到hachi后台
        return this.creatOrder();
    };

    //  创建订单接口，提交到hachi后台
    @action
    creatOrder = async () => {
        const store = this.store;
        const {submitOrderData, billDetails, totalMoney} = store;
        const result = await new Promise((resolve, reject) => {
            let data = {
                //  0 欠缴
                payType: 0,
                orderCode: submitOrderData.orderId,
                billDetails: JSON.stringify(billDetails),
                orderMoney: totalMoney,

                //  todo    這是什麼
                terminalSource: 0,
                //  todo    这是什么
                projectID: 1,
                // todo 微信用户id
                userID: 5,
            };
            window.JQ.ajax({
                crossDomain: true,
                type: "post",
                url: `${ipUri["/bpi"]}/submitCommBill.do`,
                contentType: "application/x-www-form-urlencoded",
                data,
                success: (result) => {
                    resolve(result);
                },
            })
        });
        const {code, msg} = result;
        //  请求错误
        if (code !== 2000) {
            Toast.info(msg, 1);
            return;
        }
        //  创建好订单 先查看订单状态是不是待支付
        return this.getTranStatus();
    };

    //  创建好订单 先查看订单状态是不是待支付
    @action
    getTranStatus = async () => {
        const store = this.store;
        const {submitOrderData} = store;
        const result = await new Promise((resolve, reject) => {
            window.JQ.ajax({
                crossDomain: true,
                type: "post",
                url: `${ipUri["/bpi"]}/getTranStatus.do`,
                contentType: "application/x-www-form-urlencoded",
                data: {'json': JSON.stringify({transactionId: submitOrderData.orderId})},
                success: (result) => {
                    resolve(result);
                },
            })
        });
        const {code} = result;
        //  请求错误
        if (code !== 2000) {
            Toast.info('您的账单已缴纳，请重新选择！', 1);
            return;
        }
        //  console.log(result);
        //  下单支付
        return this.getPay();
    };

    //  下单支付
    @action
    getPay = async () => {
        const store = this.store;
        const {submitOrderData} = store;
        const result = await new Promise((resolve, reject) => {
            const params = {
                // 自定义商户ID，公众号支付传10000000
                mchId: '10000000',
                //  商户订单号
                mchOrderNo: submitOrderData.orderId,
                //  渠道id,公众号传"WX_JSAPI"
                channelId: "WX_JSAPI",
                //  支付金额（单位分）
                //  todo    amount: (submitOrderData.orderMoney * 100) | 0,
                amount: 1,
                //  就传空字符串
                clientIp: "192.168.100.128",
                //  设备
                device: (window.OSInfo() === "ios") ? 'ios' : 'Android',
                //  todo    当前app对应的下openId
                openId: "ouxLS1G1Y2ZMQ81vz3KZJe0oyieQ"
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
                success: (result) => {
                    resolve(result);
                },
            })
        });
        const {data} = result;
        const {tranStatus} = data;
        //  1:待支付;3:已取消
        if (tranStatus !== 1 && tranStatus !== 3) {
            //  完成订单【确实已经支付】
            return this.completePaidOrder();
        }
        const next = new Promise(resolve => {
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
                //  todo    这是什么
                payMethod: submitOrderData.orderMoney
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
