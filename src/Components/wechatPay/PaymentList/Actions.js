import {action} from "mobx";
import {ipUri} from "../../../config";
import {Toast} from "antd-mobile";

class Actions {
    constructor(store){
        this.store = store;
    }

    //  获取房间列表
    @action
    getRoomList = async () => {
        const result = await new Promise(function (resolve, reject){
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
        const {code, data: roomList} = result;
        //  请求错误
        if (code !== 2000) {
            return;
        }
        //  fixme   这这个地方，需要去重，因为框架支持问题。针对的另一个点是没有cmdsId的问题
        roomList.splice(1, 1);
        roomList.forEach((item) => {
            item.value = item.roomId;
            item.key = item.roomId;
            item.label = item.roomName;
        });
        const store = this.store;
        store.roomList = roomList;
        //  默认第一个房间
        store.currentRoom = roomList[0];
        this.setAct();
    };


    //  获取未缴账单列表
    @action
    getPaymentList = async () => {
        const store = this.store;
        //  所有未缴账单列表
        store.paidOutList = [];
        //  筛选过的未缴账单列表--用于展示
        store.paidOutListFilter = [];
        store.billName = '全部费用';

        const result = await new Promise(function (resolve, reject){
            const data = {
                roomIDs: store.currentRoom.roomId,
                userID: store.currentRoom.cmdsId,
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
        if (data.content) {
            // data.content.forEach(item => {
            //     item.billDetails.forEach(_item => {
            //         //  默认选中所有费项
            //         _item.checked = true;
            //     })
            // });
            //  金额
            store.totalMoney = data.totalMoney;
            //  所有未缴账单列表
            store.paidOutList = data.content;
            // //  todo    for-test
            // store.paidOutList[1].billDetails.push(Object.assign({}, store.paidOutList[0].billDetails[0], {
            //     isFrozen: 1,
            //     billIds: Math.random(),
            //     paidName: "车位管理费"
            // }));
            // store.paidOutList[1].billDetails.push(Object.assign({}, store.paidOutList[0].billDetails[0], {
            //     isFrozen: 1,
            //     billIds: Math.random(),
            //     paidName: 'fjijwafo'
            // }));
            // 根据费项
            store.paidOutListFilter = JSON.parse(JSON.stringify(store.paidOutList));
            // console.log(JSON.parse(JSON.stringify(store.paidOutListFilter)));
            this.initPaidOutListFilter();
            this.setCostPicker();
        }
    };

    //  组织费用筛选
    @action
    setCostPicker(){
        const store = this.store;
        //  费项列表
        store.costPickerList = [];
        //  费项列表映射
        const costItemObj = {};
        store.paidOutListFilter.forEach((item) => {
            item.billDetails.forEach(_item => {
                //  拿到项目名称 添加到costItem数组中 去重
                costItemObj[_item.paidName] = true;
            });
        });
        //  费项筛选picker
        let costPickerList = [];
        Reflect.ownKeys(costItemObj).forEach(item => {
            costPickerList.push({
                value: item,
                key: item,
                label: item,
            })
        });
        store.costPickerList = costPickerList;
        console.log('costPickerList', JSON.parse(JSON.stringify(costPickerList)));
    }

    //  初始化筛选后的未缴账单列表的数据
    @action
    initPaidOutListFilter(){
        const store = this.store;
        //  冻结状态
        store.isFrozen = false;
        //  总金额-真正支付的金额
        let totalMoneyForPay = 0;
        store.paidOutListFilter.forEach((item) => {
            item.billDetails.forEach(_item => {
                //  如果当前账单是冻结的
                if (+_item.isFrozen === 0) {
                    store.isFrozen = true;
                    return;
                }
                //  默认选中所有费项
                _item.checked = true;
                //  计算合计
                totalMoneyForPay += _item.paidTotal;
            });
        });
        console.log('paidOutListFilter', JSON.parse(JSON.stringify(store.paidOutListFilter)));
        store.totalMoneyForPay = totalMoneyForPay;
        //  如果冻结了，就一定不是全勾选了;而既然初始化全部勾选，就可以这样赋值
        store.allChecked = !store.isFrozen;
    }

    //  未缴账单导航点击事件,tab切换
    @action
    setAct = async () => {
        Toast.loading('Loading...', 3);
        this.store.active = true;
        //  获取冻结账单列表-判断是否有冻结账单
        //  await this.getUnpaidBillTran();
        //  获取未缴账单列表
        await this.getPaymentList();
        Toast.hide();
    };


    //  已缴账单导航点击事件,tab切换
    @action
    setUnAct = async () => {
        Toast.loading('Loading...', 3);
        this.store.active = false;
        // 获取已缴账单列表
        await this.getPaidInList();
        Toast.hide();
    };

    // 获取已缴账单列表     √
    @action
    getPaidInList = async () => {
        const store = this.store;
        store.paidInList = [];
        const result = await new Promise(function (resolve, reject){
            const {currentRoom} = store;
            let data = {
                roomIDs: currentRoom.roomId,
                userID: currentRoom.cmdsId,
                //  todo    开始时间、结束时间
                startDate: '2012-02-05',
                endDate: '2020-02-05'
            };
            window.JQ.ajax({
                crossDomain: true,//兼容ie8,9
                type: "post",
                url: `${ipUri["/bpi"]}/getPaidBill.do`,
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
        store.paidInList = data.content;
    };

    //  全选
    @action
    allCheck(){
        const store = this.store;
        const {isFrozen, paidOutListFilter, allChecked} = store;
        // 如果有冻结账单 则不能操作账单列表
        if (isFrozen) {
            return;
        }
        //  全选、取消全选所有的
        for (let {billDetails} of paidOutListFilter) {
            for (let item of billDetails) {
                //  反选
                item.checked = !allChecked;
            }
        }
        //  设置总金额
        store.totalMoneyForPay = allChecked ? 0 : store.totalMoney;
        store.allChecked = !allChecked;
        store.paidOutListFilter = JSON.parse(JSON.stringify(paidOutListFilter));
    }

    //  点击多选框,选择费用
    @action
    choosepaid(item, index, _item, _index){
        const store = this.store;
        const {isFrozen, paidOutListFilter} = store;
        // 如果没有冻结账单 则可以操作账单列表
        if (isFrozen) {
            console.log('有冻结');
            return false;
        }

        let canUpdateChecked = true;
        /**
         * 判断之前月份有没有没勾选，只需要判断前一个就行了，如果前一个月没选，那就是了
         * */
        //  从下往上算，除了同层，如果有一个已勾选的，就不能操作
        LabelNextPaidOutListFilter:for (let i = paidOutListFilter.length - 1; i >= 0; i--) {
            const {billDetails} = paidOutListFilter[i];
            //  当前层有已勾选
            let currentTierIsChecked = false;
            for (const {billIds, checked} of billDetails) {
                if (_item.billIds === billIds) {
                    break LabelNextPaidOutListFilter;
                }
                if (checked) {
                    currentTierIsChecked = true;
                }
            }
            if (currentTierIsChecked) {
                canUpdateChecked = false;
                break;
            }
        }
        // console.log(canUpdateChecked);
        //  从上往下算，除了同层，如果有一个未勾选，就不能勾选
        LabelPrevPaidOutListFilter:for (let i = 0; i < paidOutListFilter.length; i++) {
            const {billDetails} = paidOutListFilter[i];
            //  当前层有未勾选
            let currentTierIsUnChecked = false;
            for (const {billIds, checked} of billDetails) {
                if (_item.billIds === billIds) {
                    break LabelPrevPaidOutListFilter;
                }
                if (!checked) {
                    currentTierIsUnChecked = true;
                }
            }
            if (currentTierIsUnChecked) {
                canUpdateChecked = false;
                break;
            }
        }
        // console.log(canUpdateChecked);
        //  如果不能更新
        if (!canUpdateChecked) {
            Toast.info('不能跳月缴费\n，请把之前的月份账单结清。', 1.5);
            return;
        }
        _item.checked = !_item.checked;

        // console.log(JSON.parse(JSON.stringify(paidOutListFilter)));
        //  判断是否全选
        let allChecked = true;
        //  计算总金额
        let totalMoneyForPay = 0;
        for (let {billDetails} of paidOutListFilter) {
            for (let {checked, paidTotal} of billDetails) {
                if (!checked) {
                    allChecked = false;
                    continue;
                }
                totalMoneyForPay += paidTotal;
            }
        }

        //  赋值
        store.allChecked = allChecked;
        store.totalMoneyForPay = totalMoneyForPay;
        store.paidOutListFilter = JSON.parse(JSON.stringify(paidOutListFilter));
    }

    //  费项筛选
    @action
    feeItemScreening(v){
        const store = this.store;
        store.billName = v[0];
        const paidOutListFilter = JSON.parse(JSON.stringify(store.paidOutList)).filter((item) => {
            item.billDetails = item.billDetails.filter(_item => {
                if (_item.paidName === v[0]) {
                    return true;
                }
            });
            return (item.billDetails && item.billDetails.length);
        });
        console.log(JSON.stringify(paidOutListFilter));
        store.paidOutListFilter = paidOutListFilter;
        this.initPaidOutListFilter();
    }


    // 立即缴费
    @action
    goConfirmPayment(){
        const {paidOutListFilter} = this.store;
        let billIDsList = [];
        for (let {billDetails} of paidOutListFilter) {
            for (let {checked, billIds} of billDetails) {
                if (checked) {
                    billIDsList.push(billIds);
                }
            }
        }
        return billIDsList.join(',');
    };
}

export default Actions;

// 获取冻结账单列表-判断是否有冻结账单
// @action
// getUnpaidBillTran = async () => {
//     const store = this.store;
//     const result = await new Promise(function (resolve, reject){
//         const data = {
//             roomIds: store.currentRoom.roomId,
//             //  todo    合同人的电话？
//             contactNumber: 18201538993
//         };
//         window.JQ.ajax({
//             crossDomain: true,
//             type: "post",
//             url: `${ipUri["/bpi"]}/getUnpaidBillTranV1.do`,
//             contentType: "application/x-www-form-urlencoded",
//             data: {'json': JSON.stringify(data)},
//             success: (result) => {
//                 resolve(result);
//             }
//         })
//     });
//     const {code, data} = result;
//     //  请求错误
//     if (code !== 2000) {
//         return;
//     }
//     console.log(data);
// };


