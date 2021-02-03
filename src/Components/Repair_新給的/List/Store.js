import {observable, action} from 'mobx';
import {type} from 'os';

//          定义数据结构
class Store {
    //使用 observable decorator
    @observable tip = '我是模板';

    @observable repairList = []
    @observable refreshing = false
    @observable subType = 1

    // @observable data = [{
    //     id: 1,
    //     title: 'title',
    //     time: '2019年5月9日 12:56:32',
    //     tel: '400-8888-999',
    //     status: '1',	//处理中
    //     label: '跟管家讲了，让维修工来修下灯泡，半天没人',
    //     src: tel,
    // }, {
    //     id: 2,
    //     title: 'title',
    //     time: '2019年5月9日 12:56:32',
    //     tel: '400-8888-999',
    //     status: '2',	//待受理
    //     label: '跟管家讲了，让维修工来修下灯泡，半天没人',
    //     src: tel
    // }, {
    //     id: 3,
    //     title: 'title',
    //     time: '2019年5月9日 12:56:32',
    //     tel: '400-8888-999',
    //     status: '3',	//已完成
    //     label: '跟管家讲了，让维修工来修下灯泡，半天没人',
    //     src: tel
    // }];
    @observable data = [];
    @observable tabs = [
        // { title: "完成(0)" },
        // { title: "未完成(0)" }
    ]
    listtype = 1;//当前数据的状态1、未完成 2、已完成
    @observable type;//1,报修 2，投诉
    status = {
        open: true,
    }
}

export default Store;
