import {observable, action} from 'mobx';

//          定义数据结构


class Store {
    //使用 observable decorator
    @observable tip = '我是模板';
    @observable soundToWordSHOW = false;
    //  图片列表-hachi，存放真正的图片地址
    @observable imageFile = [];
    //上传图片列表-实地，存放图片id
    @observable uppimg = [];
    //添加报修
    @observable AddRepair = {
        type: 1,//1-报事，2-投诉
        roomId: "",//房间id
        custName: "",//联系人
        custPhone: "",//手机号码
        appointmentTime: "",//预约时间
        questionDesc: "",//问题描述
        //imageCollection: "",//图片地址，多个以逗号分隔
    };

    @observable colorStyle = false
    @observable imageCollection = ""
    //房间下拉框的数据
    //[{ label: '广州常春藤-G1-1-2802', value: '1', }, { label: '广州常春藤-G1-1-28022', value: '2', },]
    @observable roomData = [];
    //认证信息
    @observable userAuthInfo = {};
    //使用 observable decorator

    @observable test = 0
    //业主ID
    @observable custId = 0
    //业主信息。保存获取的数据
    @observable custInfo = {};
    @observable getUserInfoData = []
}

export default Store;
