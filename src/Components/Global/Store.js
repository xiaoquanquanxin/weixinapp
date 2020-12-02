import { observable} from 'mobx';
class Store {
    //使用 observable decorator
    //@observable xxxx=0;
    @observable activityList = [];
}
export default Store;
