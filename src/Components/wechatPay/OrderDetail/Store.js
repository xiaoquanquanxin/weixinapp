import {observable} from 'mobx';

// 定义数据结构
class Store {
    //  当前时间-分钟
    @observable minutes = 15;
    //  当前时间-秒钟
    @observable seconds = 0;
    //  最大时间
    @observable maxtime = 15 * 60 - 1;
    //  定时器
    @observable timer = null;
    //  欠缴列表
    @observable paymentList = [];
    //  总费用
    @observable totalMoney = 0;
    //  取消信息
    @observable memo = "";
    //  订单时间
    @observable tranDate = "";
    //  是否为超时取消
    @observable isType = "1";
    //  支付状态    0:待支付
    @observable tranStatus = "0";
    //  预缴费项名称
    @observable feeName = "";
    //  预缴费项价格
    @observable payMoney = "0";
    //  预缴或欠缴
    @observable type = "";
    //  订单id
    @observable transactionid = null;
    //  房间信息
    @observable roomInfo = {};
}

export default Store;
