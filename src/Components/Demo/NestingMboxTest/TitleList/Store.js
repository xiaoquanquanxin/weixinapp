import { observable} from 'mobx';
// 定义数据结构
class Store {
    //使用 observable decorator
    @observable tip='storeTemplateComponentMbox';
}
export default Store;
