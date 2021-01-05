import {observable, action} from 'mobx';

// 定义数据结构
class Store {
    // 收费标准
    @observable rates = false;
    // 自定义
    @observable custom = false;
    @observable feeName = "";
    // 费项列表
    @observable feeInfo = [];
    // 房间列表
    @observable roomList = [];
    @observable roomName = "实地-遵义蔷薇国际";
    @observable feeId = '';
    // 数据来源：房间号、表具编号、车位号
    @observable itemsourcename = "";
    // 专项预缴费项订单明细列表
    @observable feeItems = [];
    // 房间id
    @observable roomID = "4a7477c8-7a28-46ce-bfc9-678e6dd71aaa";
    // 是否有欠缴
    @observable isFrozen = 0;
    // 账单周期模型
    @observable calcTimeUint = "";
    // 允许缴纳最大月数
    @observable maxMonth = 12;
    // 快捷支付列表
    @observable paymentList = [];
    // 费项余额
    @observable balanceAmount = "";
    // 暂存款日期
    @observable enoughDeductionDate = "";
    // 收费标准
    @observable feeCharge = [];
    @observable customObj = {
        type: 1,
        checked: null,
        paymentMonth: null,
        perUnit: null,
    };

}

export default Store;
