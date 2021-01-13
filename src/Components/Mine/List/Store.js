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
        {ico: addFamily, test: "用户认证    √", link: router.FamilyMembers, renzhen: 1, unverifiedShow: true,},
        {ico: addFamily, test: "添加家属    √√", link: router.FamilyMembers, renzhen: 1},
        {ico: myActivity, test: "我的活动   ?、有列表，具体需要验证", link: "/PhasetwoActivitySignUpList"},
        {ico: myQuestionnaire, test: "我的问卷   ×无法验证，后台不对", link: "/PhasetwoMyQuestionnaireList/1"},
        {ico: myRepair, test: '我的报修 ?、有列表，具体需要验证', link: router.RepairList[0]},
        {ico: changePhone, test: "同步房产  √√", type: 'synchronous'},
        {ico: changePhone, test: "更换号码  √√", type: 'changePhone'},
        {ico: changePhone, test: "退出登录  x等待接口", type: 'layout'},
        //  todo    多余
        {ico: changePhone, test: "↓↓说明↓↓↓↓说明↓↓↓↓说明↓↓↓↓说明↓↓"},
        {ico: myRepair, test: '房屋报修 ?、AddRepair', link: `${router.AddRepair[0]}/1`},
        {ico: changePhone, test: "城市资讯  √√", link: '/PhasetwoCityInformationList'},
        {ico: changePhone, test: "社区文化  √√subjectId=33", link: '/PhasetwoHomeLetterList?subjectId=33'},
        {ico: changePhone, test: "活动报名  ?、有列表，具体需要验证"},
        {ico: changePhone, test: "投诉建议  √", link: router.ComplaintSuggestions},
        {ico: changePhone, test: "社区通知  √√subjectId=35", link: '/PhasetwoHomeLetterList?subjectId=35'},
        {ico: changePhone, test: "物业缴费", link: '/wechat-pay/PayIndex'},
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
