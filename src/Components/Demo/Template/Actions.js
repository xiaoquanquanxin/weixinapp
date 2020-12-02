import {action} from 'mobx';
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
    }
    /*
    @action
    incA = () => {
        this.store.xxxxx++;
    }*/
    @action
    init=()=>{
        //初始化store变量，都放这里
    }
}
export default Actions;
