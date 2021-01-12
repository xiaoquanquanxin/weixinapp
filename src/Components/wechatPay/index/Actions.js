import {action} from "mobx";

class Actions {
    constructor(store){
        this.store = store;
    }

    /*
    获取用户信息
    * */
    @action
    userInfo = async () => {
        let url = `user/userInfo`;
        let cformData = {};
        //let cformData = config.format(obj);
        let result = await window.GET({url, cformData});
        this.store.useInfo = result.data;
        window.setLocalData('userInfo', result.data);
        return result.resultCode;
    }
}

export default Actions;
