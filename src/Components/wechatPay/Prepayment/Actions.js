import {action} from "mobx";
import {ipUri} from "../../../config";
import {Modal, Toast} from "antd-mobile";
import {roomRemoveRepeat} from "../../../../lib/utils/number";
import {requestGetFeeItem, requestGetPmdRoomsFn} from "../commonRequest";

class Actions {
    constructor(store){
        this.store = store;
    }

    //  获取房间列表
    @action
    getRoomList = async () => {
        const store = this.store;
        //  清空数据
        store.currentRoom = {};
        store.currentFee = {};
        this.clearQueryFeeitemDetails();
        const result = await requestGetPmdRoomsFn();
        const {code, data} = result;
        //  请求错误
        if (code !== 2000) {
            return;
        }
        //  房间去重复
        const roomList = roomRemoveRepeat(data);
        store.roomList = roomList;
        //  默认第一个房间
        store.currentRoom = roomList[0];
        //  获取当前房间下有没有预缴订单
        this.getFeeItem();
    };

    //  获取当前房间下有没有预缴订单
    @action getFeeItem = async () => {
        const store = this.store;
        //  重置数据
        store.currentFee = {};
        const {currentRoom} = store;
        const result = await requestGetFeeItem(currentRoom.roomId, currentRoom.cmdsId);
        const {code, data, msg} = result;
        if (!data || +code !== 2000) {
            Modal.alert('提示', msg || '费项异常，暂不能进行预缴', [{text: '确定'}]);
            return;
        }
        //  查询预缴费项信息
        this.getFeeInfo()
    };
    //  查询预缴费项信息
    @action
    getFeeInfo = async () => {
        const store = this.store;
        //  清空数据
        store.currentFee = {};
        const result = await new Promise(function (resolve, reject){
            const userInfo = JSON.parse(window.getLocalData('userInfo') || '{}');
            const {currentRoom} = store;
            window.JQ.ajax({
                type: "post",
                url: `${ipUri["/bpi"]}/property/prepayment/queryFeeInfo`,
                contentType: "application/x-www-form-urlencoded",
                data: {
                    pmdsRoomId: currentRoom.roomId,
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
            if (!data || +code !== 2000) {
                Toast.info(msg || '系统异常', 1);
                return;
            }
            return;
        }
        data.forEach((item) => {
            const {feeName, itemSourceName,} = item;
            //  完整的名称
            item.label = `${feeName}(${itemSourceName})`;
            item.value = itemSourceName;
            item.key = itemSourceName;
        });
        const hash = {};
        //  todo    这里做了去重
        store.feeList = data.filter((item) => {
            if (!hash[item.itemSourceName]) {
                hash[item.itemSourceName] = true;
                return item;
            }
        });
        //  默认选择第一个
        store.currentFee = store.feeList[0];
        //  console.log(JSON.parse(JSON.stringify(store.feeList)));
        this.setCurrentFee();
    };

    //  设置费用之后
    @action
    setCurrentFee = async () => {
        const store = this.store;
        //  清空自定义数据
        const {customFeeItem} = store;
        customFeeItem.paymentMonth = 0;
        customFeeItem.perUnit = 0;
        console.log('currentFee', JSON.parse(JSON.stringify(store.currentFee)));
        // 获取费项收费标准
        this.getFeeChargeStandard();
        // 获取专项预缴费项订单明细
        this.getFeeitemDetails()
    };

    //  获取收费标准
    @action
    getFeeChargeStandard = async () => {
        const store = this.store;
        const {currentFee, currentRoom} = store;
        //  清空收费标准
        store.feeCharge = [];
        const result = await new Promise(function (resolve, reject){
            const userInfo = JSON.parse(window.getLocalData('userInfo') || '{}');
            const data = {
                //  当前房间id
                pmdsRoomId: currentRoom.roomId,
                cmdsId: currentRoom.cmdsId,
                // 费项id
                feeId: currentFee.feeId,
                // 数据来源：房间号、表具编号、车位号
                itemSourceName: currentFee.itemSourceName
            };
            window.JQ.ajax({
                type: "post",
                url: `${ipUri["/bpi"]}/property/prepayment/getFeeChargeStandard`,
                contentType: "application/x-www-form-urlencoded",
                data,
                success: (result) => {
                    resolve(result);
                }
            })
        });
        const {code, data: feeCharge} = result;
        //  请求错误
        if (code !== 2000) {
            return;
        }
        console.log('feeCharge', JSON.parse(JSON.stringify(feeCharge)));
        store.feeCharge = feeCharge;
    };
    //  获取专项预缴费项订单明细
    @action
    getFeeitemDetails = async () => {
        const store = this.store;
        const {currentFee, currentRoom, customFeeItem} = store;
        //  清空数据
        this.clearQueryFeeitemDetails();
        store.paymentList = [];
        const result = await new Promise(function (resolve, reject){
            const userInfo = JSON.parse(window.getLocalData('userInfo') || '{}');
            const data = {
                //  当前房间id
                pmdsRoomId: currentRoom.roomId,
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
        console.log(JSON.parse(JSON.stringify(queryFeeitemDetails)));
        const {feeItems} = queryFeeitemDetails;
        const paymentList = [];
        let perUnit = 0;
        const len = feeItems.length;
        //  组织数据，一个列表，1个月、3个月、6个月、12个月的数据的合计
        for (let i = 0; i < len; i++) {
            if (i >= queryFeeitemDetails.maxMonth) {
                break;
            }
            perUnit += +(queryFeeitemDetails.feeItems[i].perUnit);
            if (i === 0 || i === 2 || i === 5 || i === 11) {
                paymentList.push({
                    perUnit,
                    paymentMonth: i + 1,
                })
            }
            if (i > 11) {
                break;
            }
        }
        //  选择3月，或者小于3月的最大的月
        store.activeIndex = Math.min(paymentList.length - 1, 1);
        //  在快捷支付列表中加入自定义块
        paymentList.push(customFeeItem);
        store.queryFeeitemDetails = queryFeeitemDetails;
        store.paymentList = paymentList;
        Toast.hide();
    };

    //  自定义块点击事件
    @action
    customClick(index){
        const store = this.store;
        const {queryFeeitemDetails, paymentList, customFeeItem} = store;
        //  有欠缴
        if (queryFeeitemDetails.hasOutstandingBill) {
            return;
        }
        //  如果自定义块没有价格，那么一定是第一次打开的
        if (!customFeeItem.paymentMonth) {
            Object.assign(customFeeItem, paymentList[store.activeIndex]);
        }
        store.activeIndex = index;
        //  打开弹框
        store.customPickerShow = true;
    }

    //  关闭自定义块
    @action
    closeCustomFee(){
        const store = this.store;
        const {customFeeItem} = store;
        if (customFeeItem.paymentMonth === '') {
            Toast.info('请先填写预缴月数');
            return false;
        }
        store.customPickerShow = false;
        return true;
    }

    //  普通块的点击事件
    @action
    choosePayment(index){
        const store = this.store;
        const {queryFeeitemDetails} = store;
        //  有欠缴
        if (queryFeeitemDetails.hasOutstandingBill) {
            return;
        }
        store.activeIndex = index;
    }

    //  改变自定义费用的月数
    @action
    changeCustomMonth(paymentMonth){
        const store = this.store;
        const {queryFeeitemDetails, customFeeItem} = store;
        const {maxMonth} = queryFeeitemDetails;
        if (paymentMonth === '') {
            customFeeItem.paymentMonth = paymentMonth;
            customFeeItem.perUnit = 0;
            return;
        }
        paymentMonth = +paymentMonth;
        console.log('值得修正的月份是', paymentMonth);
        if (paymentMonth < 1 || isNaN(paymentMonth)) {
            Toast.info('最少预缴1个月', 1);
            customFeeItem.paymentMonth = 1;
            return;
        }
        if (paymentMonth > maxMonth) {
            Toast.info(`最多只能预缴${maxMonth}个月`, 1);
            customFeeItem.paymentMonth = maxMonth;
            return;
        }
        //  求和
        const {feeItems} = queryFeeitemDetails;
        let perUnit = 0;
        for (let i = 0; i < paymentMonth; i++) {
            perUnit += +(feeItems[i].perUnit);
        }
        //  赋值
        customFeeItem.paymentMonth = paymentMonth;
        customFeeItem.perUnit = perUnit;
    }


    //  清空queryFeeitemDetails
    @action
    clearQueryFeeitemDetails(){
        this.store.queryFeeitemDetails = {
            //  是否有欠缴账单 0 没有欠缴账单 1有欠缴账单
            hasOutstandingBill: 1,
            //  允许缴纳最大月数
            maxMonth: 0,
            //  暂存款扣至日期
            enoughDeductionDate: '',
            //  暂存款余额
            balanceAmount: 0,
            //  预缴费项明细-专项预缴费项订单明细列表
            feeItems: [],
        }
    }

    //  跳转
    @action
    goPayment(){
        //  先关闭自定义picker
        if (!this.closeCustomFee()) {
            return;
        }
        const store = this.store;
        const {
            activeIndex,
            paymentList,
            currentFee,
            currentRoom,
        } = store;
        const {label} = currentFee;
        const {roomId} = currentRoom;
        const {paymentMonth} = paymentList[activeIndex];
        console.clear();
        console.log('paymentMonth ：', paymentMonth);
        console.log('label ：', label,);
        console.log('roomId ：', roomId,);
        return `/wechat-pay/ConfirmPrepay?paymentMonth=${paymentMonth}&label=${label}&roomId=${roomId}`
    }
}

export default Actions;
