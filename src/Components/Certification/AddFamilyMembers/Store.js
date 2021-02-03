import {observable, action} from 'mobx';

// 定义数据结构
class Store {
    //使用 observable decorator
    @observable tip = '我是模板';

    @observable AddFamilyMembers = {
        fullName: '',                 //姓名
        phoneNo: '',                 //电话号码
        sex: '',                //姓别
        birthday: '',              //出生年月
        userType: '',       //客户类型
        roomName: ''
    };
    @observable addFamilyUser = '';
    @observable userFamily = [];

    @observable Foldval = false;
    @observable ProjectSelectval = -1;
    @observable ProjectSelecData = [];

    @observable getRoomInfo = [];
    @observable roomName = "";
    @observable ProjectSelectvalarr = [];
    @observable roomIdarr = [];

    @observable colorStyle = false;
    @observable getUserInfoByParamval = 0;
    //  当前房间的custId
    @observable custId = -1;
}

export default Store;
