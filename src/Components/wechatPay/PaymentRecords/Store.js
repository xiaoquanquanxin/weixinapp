import {observable} from 'mobx';

// 定义数据结构
class Store {
    //  缴费列表
    @observable paymentList = [];
    //  当前页码
    @observable curPage = 0;
    //  每次请求多少页
    @observable pageNum = 10;
    //  屏幕高度
    @observable height = window.document.documentElement.clientHeight;
    //  正在请求
    @observable refreshing = false;
    //  到底部了
    @observable actbottom = true;

}

export default Store;
