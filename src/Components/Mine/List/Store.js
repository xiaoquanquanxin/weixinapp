import {observable, action} from 'mobx';
import fcrz from "./img/wj-fczm.png";
import qiehuan from './img/qiehuan.png';
import huodong from './img/huodong.png';
import wenjuan from './img/wenjuan.png';
import yuyue from './img/yuyue.png';
import mima from './img/mima.png';
//上面3个圆圈的图片
import baoxiu from './img/fangwubaoxiu.png';
import tousu from './img/tousu.png';
import chanzheng from './img/chanzheng.png';
import router from '../../../router'
import constant from '../../../constant';
import tongbu from './img/tongbu.png';
import zizhubaoxui from './img/zizhubaoxui.png';
import search from './img/search.png';
import jiaofu from './img/jiaofu.png';
import jianyi from './img/jianyi.png';

// 定义数据结构
class Store {
    //使用 observable decorator
    @observable IconList = [
        {"ico": zizhubaoxui, test: "自助报修", link: "/RepairList", renzhen: 1},
        {"ico": jianyi, test: "投诉建议", link: "/ComplaintSuggestions"},
        {"ico": jiaofu, test: "交付问题"},
        {"ico": search, test: "产证查询"},
        {"ico": 'http://himg.bdimg.com/sys/portrait/item/9ea7736d696c654c626af727.jpg', test: "物业缴费"},
    ];
    @observable list1 = [
        // {ico: 'icon-yonghurenzheng', test: "用户认证", link: `${router.FamilyMembers}`, renzhen: 1, color: '#87b0e8'},
        {ico: 'icon-tianjiajiashu', test: "添加家属", link: `${router.FamilyMembers}`, renzhen: 1, color: '#7bcd8d'},
        {ico: 'icon-bangdingfangchan', test: "同步房产", color: '#de8686'},
        // { ico: qiehuan, test: "切换小区" ,link: `/`}
    ];
    @observable list2 = [
        {ico: 'icon-wodehuodong', test: "我的活动", link: "/PhasetwoActivitySignUpList", color: '#e8cb88'},
        {ico: 'icon-wodewenjuan', test: "我的问卷", link: "/PhasetwoMyQuestionnaireList/1", color: '#7bcd8d'},
        //{ ico: wenjuan, test: "我的问卷"},
        // {ico: 'icon-wodeyuyue', test: "我的预约", link: "/CloudPayment/MyAppointment", renzhen: 1, color: '#87b0e8'},
        // { ico: 'icon-wodeyuyue', test: "我的预约", link: "/HandInBuildingList", renzhen: 1 , color: '#87b0e8'},
        // {ico: 'icon-wodexieyi', test: "我的协议", link: "/CloudPayment/MyAgreement/1", renzhen: 1, color: '#7bcd8d'},
        // {ico: 'icon-wodeshouju', test: "我的收据", link: "/CloudPayment/MyAgreement/2", renzhen: 1, color: '#de8686'},

    ];
    @observable list3 = [
        {ico: 'icon-genghuanhaoma', test: "更换号码", link: '/CertificationModifySelfInfo', color: '#87b0e8'}
    ];
    @observable type = "blue";
    @observable label = "退出";


    @observable useInfo = {};
}

export default Store;
