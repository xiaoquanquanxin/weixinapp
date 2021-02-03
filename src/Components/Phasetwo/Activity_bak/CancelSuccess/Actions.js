import {action } from 'mobx';
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
    }
    @action
    Noticefun = async () => {
        // let uObj = window.getQueryString();
        // console.log(uObj.orderDetailId)
        // window.setLocalData("orderDetailId", uObj.orderDetailId)
        // let cformData = {
        //     orderDetailId: uObj.orderDetailId
        // }
        // let result = await window.GET({ url: "auth/orderNotice", cformData });
        // if (!result.isSucess) return;
        // this.store.NoticeData = result.data
        this.store.NoticeData=""
    }
}
export default Actions;
