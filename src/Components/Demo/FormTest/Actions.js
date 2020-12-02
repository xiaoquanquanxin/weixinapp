import { observable, action } from 'mobx';
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
    }
    @action
    setInputValue=(key)=>(value)=>{
        this.store[key]=value
    }
}
export default Actions;
