import {action } from 'mobx';
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
    }
    
    @action
    init = () => {
    }
    @action
    repairDetailfun = async (id) => {
        this.store.repairDetaildata=[]
        let cformData = {
            id: id,
        };
        let result = await window.GET({ url: "auth/repairDetail", cformData });
        if (!result.isSucess) return;
        //this.store.repairDetaildata = this.store.data11
        this.store.repairDetaildata = result.data
        //console.log(result.data)
    }
}
export default Actions;
