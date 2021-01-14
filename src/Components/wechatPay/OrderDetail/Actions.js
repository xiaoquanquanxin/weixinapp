import {action, observable} from "mobx";
import {ipUri} from "../../../config";
import {Modal, Toast} from "antd-mobile";

class Actions {
    constructor(store){
        this.store = store;
    }

    //  设置值通过url
    @action
    setInfoByUrl(transactionid, type){
        this.store.transactionid = transactionid;
        this.store.type = type;
    }

    //  获取
    @action
    getOrderDetail = async () => {
        const store = this.store;
        const {transactionid, type} = store;
        //  清除定时器
        clearTimeout(store.timeout);
        store.timeout = null;
        console.clear();
        if (+type === 0) {
            //  获取欠缴订单详情
            await this.getBillDetailByTrans(transactionid);
        } else {
            //  获取预缴订单详情
            await this.getPaymentInfo(transactionid);
        }
        return this.getRoomList();
    };

    //  获取欠缴订单详情
    @action
    getBillDetailByTrans = async (transactionid) => {
        const result = await new Promise(function (resolve, reject){
            let data = {
                transactionid,
                //  这个是600
                payMethod: '600',
            };
            window.JQ.ajax({
                crossDomain: true,
                type: "post",
                url: `${ipUri["/bpi"]}/getBillDetailByTrans.do`,
                contentType: "application/x-www-form-urlencoded",
                data: {'json': JSON.stringify(data)},
                success: (res) => {
                    resolve(res);
                }
            })
        });
        const {code, data} = result;
        //  请求错误
        if (code !== 2000) {
            return;
        }
        const store = this.store;
        console.log(data);
        console.log('获取欠缴订单详情-请求成功');
        // 支付状态
        store.tranStatus = data.tranStatus;
        // 支付信息
        store.memo = data.memo;
        // 下单时间
        store.tranDate = data.tranDate.substring(0, 16);
        // 订单id
        store.transactionid = data.transactionid;
        // 欠缴总费用
        store.totalMoney = data.totalMoney;
        //  欠缴列表
        store.paymentList = data.billDetail;
        //  房间信息，只有id，注意id和ids
        store.roomInfo.roomId = data.roomIds;
        //  如果不是待支付0
        if (+data.tranStatus !== 0) {
            return;
        }
        // return
        //  待支付，倒计时
        this.getTime();
    };

    //  获取预缴订单详情
    @action
    getPaymentInfo = async (transactionid) => {
        const result = await new Promise(function (resolve, reject){
            let data = {
                // 订单编号
                orderId: transactionid,
            };
            const url = `${ipUri["/bpi"]}/property/prepayment/getPaymentInfo`;
            window.JQ.ajax({
                crossDomain: true,
                type: "post",
                contentType: "application/x-www-form-urlencoded",
                url,
                data,
                success: (res) => {
                    resolve(res);
                }
            })
        });
        const {code, data} = result;
        //  请求错误
        if (code !== 2000) {
            return;
        }
        console.log(data);
        console.log('获取预缴订单详情-请求成功');
        const store = this.store;
        // 支付状态
        store.tranStatus = data.tranStatus;
        // 支付信息
        store.memo = data.memo;
        // 下单时间
        store.tranDate = data.tranDate.substring(0, 16);
        // 订单id
        store.transactionid = data.transactionid;
        // 欠缴总费用
        store.totalMoney = data.totalMoney;
        //  欠缴列表
        store.paymentList = data.billDetail;
        store.payMoney = data.payMoney;
        store.feeName = data.feeName;
        store.roomInfo.roomId = data.roomIds;
        //  如果不是待支付0
        if (+data.tranStatus !== 0) {
            return;
        }
        //  待支付，倒计时
        this.getTime();
    };

    //  获取时间接口
    @action
    getTime = async () => {
        console.log('获取时间接口');
        const store = this.store;
        const {transactionid} = store;
        const result = await new Promise(function (resolve, reject){
            const url = `${ipUri["/bpi"]}/getTime.do`;
            let data = {
                orderID: transactionid,
            };
            window.JQ.ajax({
                crossDomain: true,
                type: "post",
                url,
                contentType: "application/x-www-form-urlencoded",
                data: {'json': JSON.stringify(data)},
                success: (res) => {
                    resolve(res);
                }
            })
        });
        const {code, data, msg} = result;
        //  请求错误
        if (code !== 2000) {
            Toast.info(msg, 1);
            return;
        }
        //  计算出下单到现在的时间 进行倒计时 /s
        store.maxTime = (new Date(data.createTime).getTime() + (15 * 60 - 1) * 1000 - new Date(data.nowTime).getTime()) / 1000;
        if (store.maxTime <= 0) {
            //  重新获取订单详情
            //  todo，暂时不调
            console.log('超时了');
            // this.getOrderDetail();
            return;
        }
        this.CountDown();
        const intervalTime = 5;
        //  5s后继续调用获取时间接口
        if (store.maxTime <= intervalTime) {
            return;
        }
        // //  清除定时器
        // clearTimeout(store.timeout);
        // store.timeout = null;
        setTimeout(() => this.getOrderDetail(), intervalTime * 1000);
    };

    //  定时器计数
    @action
    CountDown(){
        const store = this.store;
        //  清除定时器
        clearTimeout(store.timeout);
        store.timeout = null;
        console.log('CountDown fn');
        if (store.maxTime > 0) {
            let minutes = Math.floor(store.maxTime / 60);
            let seconds = Math.floor(store.maxTime % 60);
            store.minutes = minutes > 9 ? minutes : `0${minutes}`;
            store.seconds = seconds > 9 ? seconds : `0${seconds}`;
            --store.maxTime;
            store.timeout = setTimeout(() => this.CountDown(), 1000);
        } else {
            //  重新获取订单详情
            this.getOrderDetail();
        }
    };

    //  重置数据
    @action
    resetData(){
        const store = this.store;
        //  当前时间-分钟
        store.minutes = 15;
        //  当前时间-秒钟
        store.seconds = 0;
        //  最大时间
        store.maxTime = 15 * 60 - 1;
        clearTimeout(store.timeout);
        //  定时器
        store.timeout = null;
        //  欠缴列表
        store.paymentList = [];
        //  总费用
        store.totalMoney = 0;
        //  取消信息
        store.memo = "";
        //  订单时间
        store.tranDate = "";
        //  是否为超时取消
        store.isType = "1";
        //  支付状态    0:待支付
        store.tranStatus = "0";
        //  预缴费项名称
        store.feeName = "";
        //  预缴费项价格
        store.payMoney = "0";
        //  预缴或欠缴
        store.type = "";
        //  房间信息
        store.roomInfo = {};
    }

    //  取消订单
    @action
    cancellationOfOrderFn = async () => {
        Modal.alert('提示', '您确定取消订单？', [
            {text: '取消', onPress: () => console.log('cancel')},
            {
                text: '确定', onPress: async () => {
                    //  清除定时器
                    clearTimeout(this.store.timeout);
                    this.store.timeout = null;
                    this.userBehaviorFun();
                }
            },
        ])
    };

    //  用户取消订单操作
    @action
    userBehaviorFun(){
        Toast.loading('Loading...', 3);
        //  如果为预缴订单
        let url = '';
        const store = this.store;
        let data = {};
        //  预交
        if (+store.type === 1) {
            url = 'property/prepayment/cancelAdvanceOrder';
            data.orderId = store.transactionid;
        } else {
            //  欠缴
            url = 'cancelPaidOrder.do';
            data.transactionId = store.transactionid;
            data.updateTime = store.tranDate;
            //  这个是600
            data.payMethod = '600';
            data = {'json': JSON.stringify(data)};
        }
        window.JQ.ajax({
            crossDomain: true,
            type: "post",
            url: `${ipUri["/bpi"]}/${url}`,
            contentType: "application/x-www-form-urlencoded",
            data,
            success: (res) => {
                const {data, msg, code} = res;
                // //  预交
                // if (+store.type === 1) {
                //     if (code !== 2000) {
                //         Toast.info(msg, 1);
                //         return;
                //     }
                // } else {
                //     if (code !== 2000) {
                //         Toast.info(msg, 1);
                //         return;
                //     }
                //     //  提示成功，重新请求
                //     Toast.info('取消订单成功', 1);
                // }
                if (code !== 2000) {
                    Toast.info(msg, 1);
                    return;
                }
                //  提示成功，重新请求
                Toast.info('取消订单成功', 3);
                this.resetData();
                this.getOrderDetail();
            }
        })
        // this.$router.go(0)
    }

    //  获取房间信息
    @action
    getRoomList = async () => {
        const result = await new Promise((resolve, reject) => {
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
        const store = this.store;
        // console.log(store.roomInfo);
        // console.table(result.data.map(item => item.roomId));
        result.data.forEach((item) => {
            if (item.roomId === store.roomInfo.roomId) {
                store.roomInfo = item;
            }
        });
        return result;
    };

    // 去支付--获取订单状态
    @action
    getTranStatusFn = async () => {
        const store = this.store;
        const result = await new Promise(function (resolve, reject){
            let data = {transactionId: store.transactionid};
            window.JQ.ajax({
                crossDomain: true,
                type: "post",
                url: `${ipUri["/bpi"]}/getTranStatus.do`,
                contentType: "application/x-www-form-urlencoded",
                data: {'json': JSON.stringify(data)},
                success: (res) => {
                    resolve(res);
                }
            })
        });
        const {code, data, msg} = result;
        //  请求错误
        if (code !== 2000) {
            Toast.info(msg, 1);
            return;
        }
        //  其他可能，已冻结啥的
        if (data.status !== 0) {
            Toast.info(data.describe, 1);
            return;
        }
        //  微信支付
        return this.getPay();
    };

    //  下单支付
    @action
    getPay = async () => {
        const store = this.store;
        const result = await new Promise((resolve, reject) => {
            const {transactionid, totalMoney} = store;
            const userInfo = JSON.parse(window.getLocalData('userInfo') || '{}');
            const params = {
                //  自定义商户ID，公众号支付传10000000
                mchId: '10000000',
                //  商户订单号-从 获取订单状态 /getTranStatus.do接口取
                mchOrderNo: transactionid,
                //  渠道id,公众号传"WX_JSAPI"
                channelId: "WX_JSAPI",
                //  支付金额（单位分）   todo    暂时交1分钱
                // amount: (totalMoney * 100) | 0,
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
        const result = await new Promise((resolve, reject) => {
            window.JQ.ajax({
                crossDomain: true,
                type: "post",
                url: `${ipUri["/bpi"]}/getTranStatus.do`,
                contentType: "application/x-www-form-urlencoded",
                data: {'json': JSON.stringify({transactionId: store.transactionid})},
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
        const result = await new Promise((resolve, reject) => {
            const updateTime = new Date().format('yyyy-MM-dd hh:mm:ss');
            store.updateTime = updateTime;
            let data = {
                transactionId: store.transactionid,
                updateTime,
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
