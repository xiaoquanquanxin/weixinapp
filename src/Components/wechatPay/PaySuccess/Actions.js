import {action} from "mobx";

class Actions {
    constructor(store){
        this.store = store;
    }

    //  解析参数
    @action
    getParams(){
        const {params} = this.store;
        const _params = window.getQueryString();
        params.orderId = _params.orderId;
        params.type = _params.type;
        params.orderMoney = _params.orderMoney;
        params.updateTime = _params.updateTime;
        console.log('url params:', this.store.params);
    }
}

export default Actions;
