import { observable, action } from 'mobx';
// 定义数据结构
class Store {
    //使用 observable decorator
    @observable tip='我是模板';
    @observable companyName = [
        {
            label: '实地·广州常春藤',
            value: '实地·广州常春藤',
        },
        {
            label: '实地·北京常春藤',
            value: '实地·北京常春藤',
        },
    ];

    @observable refreshing = false

    // @observable cityId = ""
    // @observable cityName = ""
    // @observable cityList = []
    // @observable listdata = []
    // @observable provincesList = []
    // @observable provincesId = ""
    // @observable provincesName = ""
    // @observable col = 1;//列数
    // @observable allList = [];


    @observable projectId = ""
    @observable projectName = ""
    @observable projectList = []
    @observable newListdata = []
    @observable actbottom = 2
    @observable height = +document.documentElement.clientHeight;
}
export default Store;
