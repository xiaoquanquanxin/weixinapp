import { observable, action } from 'mobx';
// 定义数据结构
class Store {
    //使用 observable decorator
    @observable NoticeData = ''
    @observable Interestselects = []
    @observable renList = [{ name: '打篮球' }, { name: 'n2' }, { name: 'n3' }]
}
export default Store;
