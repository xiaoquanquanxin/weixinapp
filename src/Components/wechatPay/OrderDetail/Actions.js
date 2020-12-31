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
        const {transactionid, type} = this.store;
        if (+type === 1) {
            //  获取预缴订单详情
            await this.getPaymentInfo(transactionid);
        } else {
            //  获取欠缴订单详情
            await this.getBillDetailByTrans(transactionid);
        }
        return this.getRoomList();
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
                crossDomain: true,//兼容ie8,9
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
        this.getTime(data.tranStatus);
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
            const url = `${ipUri["/bpi"]}/getBillDetailByTrans.do`;
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
        this.getTime(data.tranStatus);
    };

    //  定时器计数
    @action
    CountDown(){
        if (this.store.maxtime > 0) {
            this.store.minutes = Math.floor(this.store.maxtime / 60);
            this.store.seconds = Math.floor(this.store.maxtime % 60);
            --this.store.maxtime;
        } else {
            //  重新获取订单详情
            //  todo    先注释掉 因为目前后台没跑定时程序 所以永远都是待支付
            // this.getOrderDetail()

            //  清除定时器
            clearInterval(this.store.timer);
        }
    };

    //  获取时间接口
    @action
    getTime = async (tranStatus) => {
        // 如果支付状态为待支付 则开启倒计时
        if (tranStatus !== 0) {
            return
        }
        const {transactionid} = this.store;
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
                debugger
                const {data} = res;
                // 计算出下单到现在的时间 进行倒计时
                this.maxtime = (new Date(data.createTime) * 1 + (15 * 60 - 1) * 1000 - new Date(data.nowTime) * 1) / 1000;
                this.timer = setInterval(this.CountDown, 1000);
            }
        })
    }

    //  重置数据
    @action
    resetData(){
        const store = this.store;
        //  当前时间-分钟
        store.minutes = 15;
        //  当前时间-秒钟
        store.seconds = 0;
        //  最大时间
        store.maxtime = 15 * 60 - 1;
        clearInterval(store.timer);
        //  定时器
        store.timer = null;
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
        //  订单id
        store.transactionid = null;
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
                    this.userBehaviorFun();
                }
            },
        ])
    };

    //  用户取消订单操作
    @action
    userBehaviorFun(){
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
                const {data} = res;
                //  todo    等于多少才成功？
                if (data.code) {
                    return Toast.info(data.describe, 1.5);
                }
                console.log(res);
                //  提示成功，重新请求
                Toast.info('取消订单成功', 1.5);
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
        console.log(store.roomInfo);
        console.table(result.data.map(item => item.roomId));
        result.data.forEach((item) => {
            if (item.roomId === store.roomInfo.roomId) {
                store.roomInfo = item;
            }
        });

        return result;
    }


    // 去支付--获取订单状态
    @action
    getTranStatusFn = async () => {
        const store = this.store;
        let data = {transactionId: store.transactionid};
        window.JQ.ajax({
            crossDomain: true,
            type: "post",
            url: `${ipUri["/bpi"]}/getTranStatus.do`,
            contentType: "application/x-www-form-urlencoded",
            data: {'json': JSON.stringify(data)},
            success: (res) => {
                const {data} = res;
                if (data.status === 0) {
                    //  微信支付
                    //  todo    没数据
                    return this.getPay();
                }
                Toast.info(data.describe, 1.5);
            }
        })
    }
}

export default Actions;
