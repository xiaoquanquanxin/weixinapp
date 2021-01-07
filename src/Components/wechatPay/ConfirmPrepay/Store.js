import {observable} from 'mobx';

//  定义数据结构
class Store {
    //  页面url参数
    @observable params = {};
    //  当前房间
    @observable currentRoom = {};
    //  当前费用
    @observable currentFee = {};
    //  总金额
    @observable perUnit = 0;
    //  费用的列表
    @observable feeItems = [];
}

export default Store;
