import { observable, action } from 'mobx';
// 定义数据结构
class Store {
    //使用 observable decorator
    @observable selectCompanyShow=false;
    @observable defaultCompanyTitle="禹洲集团";
    @observable defaultCompanyId=-1;
}
export default Store;
