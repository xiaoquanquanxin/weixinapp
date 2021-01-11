import {observable, action} from 'mobx';
//          定义数据结构
import temp from './temp.png';
import temp2 from './11.jpg';

class Store {
    //上传图片列表
    @observable array = [temp, temp2, temp, temp2];
    @observable type = "";//状态 1.报修 2.投诉
    //添加报修
    @observable AddRepair = {
        //type: "",//1-报事，2-投诉
        pkRoom: "",//房间id
        appealNature: "",//室内1；室外0；投诉2；咨询3；建议4；表扬5
        problemDescription: "",//问题描述
    };
    @observable imageCollection = "";//图片地址，多个以逗号分隔
    @observable recordCollection = "";
    //单选框数据
    @observable radioData = []
    //房间下拉框的数据
    //[{ label: '广州常春藤-G1-1-2802', value: '1', }, { label: '广州常春藤-G1-1-28022', value: '2', },]
    @observable roomData = [];
    //认证信息
    @observable userAuthInfo = {};
    @observable colorStyle = false;
    //使用 observable decorator

    @observable test = 0
    //业主ID
    @observable custId = 0
    //业主信息。保存获取的数据
    custInfo;
}

export default Store;
