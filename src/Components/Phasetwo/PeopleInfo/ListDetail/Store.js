import { observable, action } from 'mobx';
// 定义数据结构
class Store {
    //使用 observable decorator
    @observable tip='公告页面';
    @observable setnoticeDetail={};
}
export default Store;
