import {observable, action} from 'mobx';

// 定义数据结构
class Store {
    //使用 observable decorator
    @observable tip = '我是模板';
    @observable actListdata = [];

    @observable refreshing = false;
    @observable tabval = null;
    @observable height = +document.documentElement.clientHeight;
    @observable actbottom = 2;
}

export default Store;
