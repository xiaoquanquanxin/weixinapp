import { observable, action } from 'mobx';
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
    }
    @action
    changeData = (index,title) => {
        this.store.data[index].title=title
    }
    @action
    changeTip = (tip) => {
        this.store.tip=tip
    }
}
export default Actions;
