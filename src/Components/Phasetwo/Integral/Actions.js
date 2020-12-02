import { observable, action } from 'mobx';
// 定义对数据的操作
class Actions {
    constructor(store, mainStore) {
        this.store = store;
        //this.storeNotice = mainStore.storeNotice
    }
    @action
    scoreDetailList = async () =>{
        let cformData = {
        }
        let result = await window.GET({ url: "auth/score/scoreDetailList", cformData })
        if (!result.isSucess) return;
        this.store.scoreDetailList=result.data
        //JSON.parse(window.getLocalData('setnoticeDetail'))
        //JSON.parse(jsonstr); //可以将json字符串转换成json对象 
        //JSON.stringify(window.getLocalData('setnoticeDetail'))
    }
}
export default Actions;
