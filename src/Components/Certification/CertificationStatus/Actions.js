import {action } from 'mobx';
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
    }
    @action
	init = () => {

    }
}
export default Actions;
