import {action } from 'mobx';
// 定义对数据的操作
class Actions {
    constructor(store) {
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
    Listfun = async()=>{
        let cformData = { 
            activityTime: this.store.timeValues,
            status: this.store.status
        };
        console.log(5566,cformData)
        let result = await window.GET({ url: 'user/activity/activitiApplyList', cformData });
        if (!result.isSucess) return;
        this.store.Listdata = result.data
    }
    @action
    statusfun=(v)=>{
        console.log(v)
        this.store.status= v[0]
        this.Listfun()
    }
    @action
    timefun = (v) => {
        console.log(v)
        this.store.timeValues= v
        this.Listfun()
    }
}
export default Actions;
