import {observable} from 'mobx';

//  定义数据结构
class Store {
    //  收费标准是否展示
    @observable ratesPickerShow = false;
    //  自定义弹框
    @observable customPickerShow = false;

    //  房间列表
    @observable roomList = [];
    //  当前选择的房间
    @observable currentRoom = {};

    //  费项列表
    @observable feeList = [];
    //  当前选择的费项
    @observable currentFee = {};

    //  收费标准列表
    @observable feeCharge = [];

    //  queryFeeitemDetails接口的数据
    @observable queryFeeitemDetails = {
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
    };

    //  快捷支付列表-渲染的主要的块
    @observable paymentList = [];
    //  被选中的index
    @observable activeIndex = -1;
    //  自定义块
    @observable customFeeItem = {
        paymentMonth: 0,
        perUnit: 0,
    };
}

export default Store;
