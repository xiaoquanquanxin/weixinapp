import {action} from "mobx";

class Actions {
    constructor(store){
        this.store = store;
    }

    /*
    获取用户信息
    * */
    @action
    userInfo(){
        let url = "auth/getRoomInfo";
        let cformData = {userType: 0};
        window.GET({url, cformData});
    }
}

export default Actions;
