import { observable, action } from 'mobx';
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
    }
    @action
    incA = () => {
        this.store.a++;
    }
    @action
    decA = () => {
        this.store.a--;
    }
}
export default Actions;
