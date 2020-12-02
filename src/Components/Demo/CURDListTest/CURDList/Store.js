import { observable} from 'mobx';
// 定义数据结构
class Store {
    @observable tip='CURDList';
    /*
    {
    title:"",
    type:"crud"
    }
    */
    @observable list=[];
}
export default Store;
