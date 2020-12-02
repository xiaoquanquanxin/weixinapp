import {action } from 'mobx';
class Actions {
    constructor(store) {
        this.store = store;
    }
    @action
    activityList = (value) => {
        console.log("登陸活动列表数据", value)
        this.store.activityList = value
    }
    
}
export default Actions