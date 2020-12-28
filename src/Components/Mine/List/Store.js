import {observable} from 'mobx';
import router from '../../../router'
import zizhubaoxui from './img/zizhubaoxui.png';
import jianyi from './img/jianyi.png';
import addFamily from './img/add-family.png';
import myActivity from './img/my-activity.png';
import myQuestionnaire from './img/my-questionnaire.png';
import myRepair from './img/my-repair.png';
import changePhone from './img/change-phone.png';

// 定义数据结构
class Store {
    //使用 observable decorator
    @observable IconList = [
        {"ico": zizhubaoxui, test: "自助报修", link: "/RepairList", renzhen: 1},
        {"ico": jianyi, test: "投诉建议", link: "/ComplaintSuggestions"},
    ];
    @observable list1 = [
        {ico: addFamily, test: "用户认证", link: `${router.FamilyMembers}`, renzhen: 1},
        {ico: addFamily, test: "添加家属", link: `${router.FamilyMembers}`, renzhen: 1},
    ];
    @observable list2 = [
        {ico: myActivity, test: "我的活动", link: "/PhasetwoActivitySignUpList",},
        {ico: myQuestionnaire, test: "我的问卷", link: "/PhasetwoMyQuestionnaireList/1"},
        {ico: myRepair, test: '我的报修 有列表，具体需要验证', link: router.RepairList[0]},
    ];
    @observable list3 = [
        {ico: changePhone, test: "更换号码  √", type: 'changePhone'}
    ];
    @observable type = "blue";
    @observable label = "退出";
    @observable useInfo = {
        //  可能的key-value
        // "id": 9,
        // "authStatus": 0,
        // "authTime": null,
        // "birthday": null,
        // "createTime": "2020-12-28 13:56:49",
        // "createUserId": null,
        // "deleteStatus": 1,
        // "disabledStatus": 1,
        // "firstFocusTime": "2020-07-10 15:08:42",
        // "focusStatus": 1,
        // "focusTime": "2020-07-10 15:08:42",
        // "fullName": null,
        // "identityNo": null,
        // "nickName": "权鑫",
        // "openId": "ouxLS1G1Y2ZMQ81vz3KZJe0oyieQ",
        // "phoneNo": null,
        // "sex": 1,
        // "unionId": null,
        // "updateTime": "2020-12-28 13:56:58",
        // "updateUserId": null,
        // "userLogo": "http://wx-life.seedland.cc/file-service/other/20201228//91148ed312314334b0b179ca54801d1f.png",
        // "wxNo": null,
        // "wxSubId": 3,
        // "country": "中国",
        // "province": "",
        // "city": ""
    }
}

export default Store;
