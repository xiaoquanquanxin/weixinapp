import { observable, action } from 'mobx';
// 定义数据结构
class Store {
    //使用 observable decorator
    @observable DetailsData={};
    @observable userType = [0,"业主","家属","租客"]

    @observable getOrderDetailQrcode=""
    @observable getOrderDetailQrcodeval=false
}
export default Store;
