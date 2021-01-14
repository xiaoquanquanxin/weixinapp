import {observable, action} from 'mobx';
class Store {
    //  图片地址，多个以逗号分隔
    @observable imageCollection = "";
    @observable recordCollection = "";

    //  验证成功
    @observable isValidated = false;
    //  房间列表
    @observable roomList = [];
    //  房间下的客户列表
    @observable contactList = [];

    //  添加报修
    @observable AddRepair = {
        //  房间id
        roomId: "",
        //  房间主数据id
        pkDoor: "",
        roomName: "",

        //  联系人
        contactId: '',
        contactName: '',
        //  手机号
        phoneNo: '',

        //  预约时间
        appointmentTime: new Date(),

        //  问题描述
        problemDescription: "",

    };
}

export default Store;
