import {observable} from 'mobx';

// 定义数据结构
class Store {
    //  房间列表
    @observable params = {
        //  0欠缴
        type: 0,
        orderId: "",
        orderMoney: "",
        updateTime: "",
    };

}

export default Store;

