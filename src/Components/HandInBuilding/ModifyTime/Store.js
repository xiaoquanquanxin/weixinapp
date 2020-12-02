import { observable, action } from 'mobx';
// 定义数据结构
class Store {
    //使用 observable decorator
    @observable tip='我是模板';
    @observable selectTimeval=-1
    @observable ModifyTimeData={}
    @observable wordTimeSlot=""
   // @observable itemclass=""
    @observable itemclassval=-1
    @observable timeSlot=[]
    @observable calendarId=-1
    @observable day=[]
    @observable TotalNum=42
}
export default Store;
