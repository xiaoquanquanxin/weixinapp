import { observable, action } from 'mobx';
import { type } from 'os';
//          定义数据结构
class Store {
    //使用 observable decorator
    @observable tip='我是模板';
	@observable flag=false
    @observable workDeatail ={}
    @observable routerDeatail =[]
    @observable type;//1报修 2：投诉
}
export default Store;
