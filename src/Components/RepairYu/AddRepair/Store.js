import {observable, action} from 'mobx';
//          定义数据结构
import temp from './temp.png';
import temp2 from './11.jpg';

class Store {
    //上传图片列表
    @observable array = [temp, temp2, temp, temp2];
    @observable type = "";//状态 1.报修 2.投诉
    //  图片地址，多个以逗号分隔
    @observable imageCollection = "";
    @observable recordCollection = "";
    //单选框数据
    @observable radioData = [];
    //认证信息
    @observable userAuthInfo = {};
    @observable colorStyle = false;


    //  房间列表
    @observable roomList = [];
    //  房间下的客户列表
    @observable contactList = [];

    //  预约时间
    @observable appointmentTime = new Date();

    //  添加报修
    @observable AddRepair = {
        //  房间id
        roomId: "",
        roomName: "",

        //  联系人
        contactId: '',
        contactName: '',
        //  手机号
        phoneNo: '',

        //type: "",//1-报事，2-投诉

        appealNature: "",//室内1；室外0；投诉2；咨询3；建议4；表扬5
        problemDescription: "",//问题描述

    };
}

export default Store;
