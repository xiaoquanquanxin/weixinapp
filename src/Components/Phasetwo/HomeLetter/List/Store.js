import { observable, action } from 'mobx';
// 定义数据结构
class Store {
    //使用 observable decorator
    // @observable tip='我是模板';
    // @observable companyName = [
    //     {
    //         label: '实地·广州常春藤',
    //         value: '实地·广州常春藤',
    //     },
    //     {
    //         label: '实地·北京常春藤',
    //         value: '实地·北京常春藤',
    //     },
    // ];


    @observable projectId = ""
    @observable projectName = ""
    @observable projectList = []
    @observable listdataval = []

    @observable refreshing = false
    @observable actbottom = 2
    @observable height = document.documentElement.clientHeight - 0
}
export default Store;
