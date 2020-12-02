import { observable, action } from 'mobx';
// 定义数据结构
class Store {
    //使用 observable decorator

    @observable questionDetailDta=[]
    @observable showbtn = false
    @observable isDone=""
    @observable is_uploadMediaIds={}
}

export default Store;
