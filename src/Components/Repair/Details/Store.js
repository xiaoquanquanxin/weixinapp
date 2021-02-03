import {observable, action} from 'mobx';

class Store {
    //  详情
    @observable repairDetaildata = {};
    //  工单状态历史
    @observable workingOrderStatusHistory = [];
    //  工单进度跟踪接口
    @observable progressTrackingList = [];
}

export default Store;
