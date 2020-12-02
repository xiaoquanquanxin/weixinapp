import { observable, action } from 'mobx';
// 定义对数据的操作
class Actions {
    constructor(store, mainStore) {
        this.store = store;
        //this.storeNotice = mainStore.storeNotice
    }
    @action
    setnoticeDetail = async (noticeId) =>{
        let cformData = {
            noticeId: noticeId
        }
        // console.log(55,body)
        this.store.setnoticeDetail=""
        let result = await window.GET({ url: "notice/noticeDetails", cformData })
        if (!result.isSucess) return;
        console.log(result.data)
        this.store.setnoticeDetail = result.data
        //JSON.parse(window.getLocalData('setnoticeDetail'))
        //JSON.parse(jsonstr); //可以将json字符串转换成json对象 
        //JSON.stringify(window.getLocalData('setnoticeDetail'))
    }
}
export default Actions;
