//import {action } from 'mobx';
// 定义对数据的操作
import {ipUri} from "../../../config";

class Actions {
    constructor(store){
        this.store = store;
    }

    //  获取电话数据
    async areaPhoneList(){
        const store = this.store;
        let result = await window.GET({url: '/user/maintain/areaPhoneList'});
        if (!result.isSucess) {
            return;
        }
        store.phoneList = result.data;
    }
}

export default Actions;
