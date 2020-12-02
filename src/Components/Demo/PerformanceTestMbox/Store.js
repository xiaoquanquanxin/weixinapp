import { observable, action } from 'mobx';
// 定义数据结构
class Store {
    //使用 observable decorator
    @observable tip='Mbox性能测试例子1';
    @observable data=[{title:"标题1"},
        {title:"标题2"},
        {title:"标题3"}
    ];
}
export default Store;
