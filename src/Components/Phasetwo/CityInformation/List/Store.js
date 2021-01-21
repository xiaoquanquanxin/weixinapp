import { observable, action } from 'mobx';
// 定义数据结构
class Store {
    //使用 observable decorator
    @observable tip='我是模板';
    @observable companyName = [
        {
            label: '广州省·广州市',
            value: '广州省·广州市',
        },
        {
            label: '实地·北京常春藤',
            value: '实地·北京常春藤',
        },
    ];
    @observable companyNameValue = '广州省·广州市'
    @observable cityId=""
    @observable cityName = ""
    @observable cityList=[]
    @observable CityListdata=[]
    @observable provincesList=[]
    @observable provincesId = ""
    @observable provincesName = ""
    @observable col=1;//列数
    @observable allList = [];
    @observable refreshing = false
    @observable actbottom = 2
    @observable height = +document.documentElement.clientHeight;
}
export default Store;
