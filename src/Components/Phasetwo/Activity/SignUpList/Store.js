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
    // @observable statusdata = [
    //     { label: '待审核', value: 1 }, 
    //     { label: '报名成功', value: 2 }, 
    //     { label: '取消报名', value: 3 },
    //     { label: '审核不通过', value: 4}, 
    //     { label: '签到完成',value: 5}     
    // ]

    @observable Listdata=[]

    @observable timeValues=''
    @observable status=''
}
export default Store;
