import {action} from 'mobx';

// 定义对数据的操作
class Actions {
    constructor(store){
        this.store = store;
        // this.activityTime="";
        // status
    }

    /*
    @action
    incA = () => {
        this.store.xxxxx++;
    }*/
    @action
    Listfun = async () => {
        let cformData = {
            activityTime: this.store.timeValues,
            status: this.store.status
        };
        console.log('活动列表的请求参数', cformData);
        let result = await window.GET({url: 'user/activity/activitiApplyList', cformData});
        if (!result.isSucess) return;
        this.store.Listdata = result.data
    };
    @action
    statusfun = (status) => {
        console.log(status);
        this.store.status = status[0];
        this.Listfun()
    };
    @action
    timefun = (v) => {
        console.log(v);
        this.store.timeValues = v;
        this.Listfun()
    }
}

export default Actions;
