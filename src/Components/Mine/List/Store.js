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
        {ico: myRepair, test: '我的报修', link: "xxx"}
    ];
    @observable list3 = [
        {ico: changePhone, test: "更换号码", type: 'changePhone'}
    ];
    @observable type = "blue";
    @observable label = "退出";
    @observable useInfo = {};
}

export default Store;
