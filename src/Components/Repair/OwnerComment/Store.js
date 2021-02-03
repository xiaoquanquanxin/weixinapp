import {observable, action} from 'mobx';

class Store {
    //  满意度问题列表
    @observable satisfactionList = [];
    //  单选问题列表
    @observable questionList = [];
    //  文本域问题列表
    @observable textareaList = [];
    //  查看评价状态
    @observable viewUpdate = false;
}

export default Store;
