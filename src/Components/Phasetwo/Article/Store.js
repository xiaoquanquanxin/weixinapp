import {observable, action} from 'mobx';

// 定义数据结构
class Store {
    //使用 observable decorator
    @observable tip = '公告页面';
    @observable setnoticeDetail = {
        authorName: "实地",
        content: "<p><span/></p>",
        noticeTitle: "重庆蔷薇国际不利因素",
        updateTime: "2019-07-02 14:47:47",
    };

    @observable contentdata = "";
}

export default Store;
