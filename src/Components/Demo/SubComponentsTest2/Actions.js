import { observable, action } from 'mobx';
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
    }
    @action
    refresh = () => {
        this.store.isRefresh=!this.store.isRefresh;
    }
}
export default Actions;
