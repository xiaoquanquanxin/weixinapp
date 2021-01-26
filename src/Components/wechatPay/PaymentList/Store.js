import {observable} from 'mobx';
//  费用筛选的全部费用
export const BILL_NAME = '全部费用';
// 定义数据结构
class Store {
    //  房间列表
    @observable roomList = [];
    //  当前选中的房间
    @observable currentRoom = {};
    //  true：未缴账单、false：已缴账单
    @observable active = true;
    //  未缴总费用-头部展示
    @observable totalMoney = 0;
    //  冻结状态
    @observable isFrozen = false;
    //  已缴账单列表
    @observable paidInList = [];
    //  是否全选
    @observable allChecked = false;
    //  未缴账单列表
    @observable paidOutList = [];
    //  筛选过的未缴账单列表--用于展示
    @observable paidOutListFilter = [];
    //  费项列表-前端自己组织
    @observable costPickerList = [];
    //  费项名称
    @observable billName = BILL_NAME;
    //  总金额-真正支付的金额
    @observable totalMoneyForPay = 0;
}

export default Store;
