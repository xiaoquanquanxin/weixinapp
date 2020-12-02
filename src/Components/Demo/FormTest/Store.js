import { observable, action } from 'mobx';
// 定义数据结构
class Store {
    //使用 observable decorator
    @observable username='';
    @observable phone='';
}
export default Store;
