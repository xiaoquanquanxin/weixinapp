import React from 'react'
import Route from 'react-router-dom/Route'
import router from './router'
import {Provider} from 'mobx-react';
import ReactChildrenMap from 'LibComponents/ReactChildrenMap'

function setDefaultPage(Component, routePath){
    let key = routeList.length;
    routeList.push({component: Component, path: routePath, exact: true, key})
    //console.log('routeList:',routeList)
}

//重写
/*console.log=function () {
    //console.warn('----debug---')
    console.warn.apply(console,arguments)
}*/
//对页面组件路由做一些公共处理
window.pub__pageComptentCompose = function (routeList, routePath, key, Component){
    if (routePath instanceof Array) {
        for (var i = 0; i < routePath.length; i++) {
            var item = routePath[i];
            routeList.push({
                key: key + i,
                exact: true,
                component: Component,
                path: item
            })
        }
    } else if (typeof routePath == "string") {
        routeList.push({
            key,
            exact: true,
            component: Component,
            path: routePath
        })
    } else {
        console.error("compose 传入的routePath 不是字符串也不是数组,注：name为" + name)
    }
};
//----mbox状态管理--------start
let store = {};
let actions = {};
let routeList = [];
window.ctx_actions = actions;

//如果是生成环境就不出初始化demo
//微信测试
import {compose as composeWXTest} from './Components/Demo/WXTest'

composeWXTest({routeList, routePath: '/Demo/WXTest'});
import {compose as composeSoundToWord} from './Components/Demo/SoundToWord'

composeSoundToWord({routeList, routePath: '/Demo/SoundToWord'});
import {compose as composeUpLoadFileTest} from './Components/Demo/UpLoadFileTest'

composeUpLoadFileTest({routeList, routePath: '/Demo/UpLoadFileTest'});
import {compose as composeWXImagePickerTest} from './Components/Demo/WXImagePickerTest'

composeWXImagePickerTest({routeList, routePath: '/Demo/WXImagePickerTest'});
import {compose as composeWXImagePickerTestone} from './Components/Demo/WXImagePickerTestone'

composeWXImagePickerTestone({routeList, routePath: '/Demo/WXImagePickerTestone'});
import {compose as composeRichUploadAttachDisplayTest} from './Components/Demo/RichUploadAttachDisplayTest'

composeRichUploadAttachDisplayTest({routeList, routePath: '/Demo/RichUploadAttachDisplayTest'});
//嵌套mbox组件测试
import {compose as composeNestingMboxTest} from './Components/Demo/NestingMboxTest'

composeNestingMboxTest({store, actions, routeList, name: 'NestingMboxTest', routePath: '/Demo/NestingMboxTest'});
//批量增删查改测试
//               测试例子路由
import {compose as composeCURDListTest} from './Components/Demo/CURDListTest'

composeCURDListTest({routeList, routePath: '/Demo/CURDListTest'})
//                列表用了mbox，所以需要加入到全局的store里
import {compose as composeCURDList} from './Components/Demo/CURDListTest/CURDList'

composeCURDList({store, actions, name: "CURDList"})
/*Demo*/
//

import {compose as composeAllPageList} from './Components/Demo/AllPageList'

composeAllPageList({store, actions, routeList, name: 'AllPageList', routePath: '/Demo/AllPageList'});
import {compose as composeLinkBarTest} from './Components/Demo/LinkBarTest'

composeLinkBarTest({routeList, routePath: '/Demo/LinkBarTest'});
import {compose as composeListViewTest1} from './Components/Demo/ListViewTest1'

composeListViewTest1({store, actions, routeList, name: 'ListViewTest1', routePath: '/Demo/ListViewTest1'});
import {compose as composeCounter} from './Components/Demo/Counter'

composeCounter({store, actions, routeList, name: 'Counter', routePath: '/Demo/Counter'});
import {compose as composenoMbox} from './Components/Demo/noMbox'

composenoMbox({store, actions, routeList, name: 'noMbox', routePath: '/Demo/noMbox'});
import {compose as composeTemplate} from './Components/Demo/Template'

composeTemplate({store, actions, routeList, name: 'Template', routePath: '/Template'});
import {compose as composeRemTest} from './Components/Demo/RemTest'

composeRemTest({store, actions, routeList, name: 'RemTest', routePath: '/Demo/RemTest'});
import {compose as composeImgTest} from './Components/Demo/ImgTest'

composeImgTest({store, actions, routeList, name: 'ImgTest', routePath: '/Demo/ImgTest'});
import {compose as composeHttpTest} from './Components/Demo/HttpTest'

composeHttpTest({store, actions, routeList, name: 'HttpTest', routePath: '/Demo/HttpTest'});
import {compose as composeTransitionTest} from './Components/Demo/TransitionTest'

composeTransitionTest({store, actions, routeList, name: 'TransitionTest', routePath: '/Demo/TransitionTest'});
import {compose as composeSubComponentsTest} from './Components/Demo/SubComponentsTest'

composeSubComponentsTest({store, actions, routeList, name: 'SubComponentsTest', routePath: '/Demo/SubComponentsTest'});
import {compose as composeSubComponentsTest2} from './Components/Demo/SubComponentsTest2'

composeSubComponentsTest2({
    store,
    actions,
    routeList,
    name: 'SubComponentsTest2',
    routePath: '/Demo/SubComponentsTest2'
});
import {compose as composePerformanceTest} from './Components/Demo/PerformanceTest'

composePerformanceTest({store, actions, routeList, name: 'PerformanceTest', routePath: '/Demo/PerformanceTest'});
import {compose as composePerformanceTestMbox} from './Components/Demo/PerformanceTestMbox'

composePerformanceTestMbox({
    store,
    actions,
    routeList,
    name: 'PerformanceTestMbox',
    routePath: '/Demo/PerformanceTestMbox'
});
import {compose as composeFormTest} from './Components/Demo/FormTest'

composeFormTest({store, actions, routeList, name: 'FormTest', routePath: '/Demo/FormTest'});
//
import {compose as composeTemplateCDemo} from './Components/Demo/TemplateCDemo'

composeTemplateCDemo({store, actions, routeList, name: 'TemplateCDemo', routePath: '/Demo/TemplateCDemo'});
import {compose as composeTemplateComponentMbox} from './Components/Demo/TemplateComponentMbox'

composeTemplateComponentMbox({store, actions, name: 'TemplateComponentMbox'});

import {compose as composeVScreen} from './Components/CloudPayment/pub/VScreen/'

composeVScreen({store, actions, routeList, name: 'VScreen', routePath: '/Demo/VScreen'});

//所有页面列表

import {compose as composeDemoButton} from './Components/PageList/DemoButton'

composeDemoButton({store, actions, routeList, name: 'DemoButton', routePath: '/test/DemoButton'});
//布局容器
import {compose as composeDemoLayout} from './Components/PageList/DemoLayout'

composeDemoLayout({store, actions, routeList, name: 'DemoLayout', routePath: '/test/DemoLayout'});

//按纽提交后状态提示
import {compose as composeDemoStatusTips} from './Components/PageList/DemoStatusTips'

composeDemoStatusTips({store, actions, routeList, name: 'DemoStatusTips', routePath: '/test/DemoStatusTips'});

//获取教验码
import {compose as composeDemoGetVerificationCode} from './Components/Demo/GetVerificationCode'

composeDemoGetVerificationCode({
    store,
    actions,
    routeList,
    name: 'GetVerificationCode',
    routePath: '/test/GetVerificationCode'
});
//复选框
import {compose as composeDemoCheckbox} from './Components/PageList/DemoCheckBox'

composeDemoCheckbox({store, actions, routeList, name: 'DemoCheckbox', routePath: '/test/DemoCheckBox'});

//图片弹窗
import {compose as composeDemoImgZoomHOC} from './Components/PageList/DemoPopUP'

composeDemoImgZoomHOC({store, actions, routeList, name: 'DemoImgZoomHOC', routePath: '/test/DemoImgZoomHOC'});

//单选框
import {compose as composeDemoRadioBox} from './Components/PageList/DemoRadioBox'

composeDemoRadioBox({store, actions, routeList, name: 'DemoRadioBox', routePath: '/test/DemoRadioBox'});


//表单较验
import {compose as DemoVerificationForm} from './Components/PageList/DemoVerificationForm'

DemoVerificationForm({
    store,
    actions,
    routeList,
    name: 'DemoVerificationForm',
    routePath: '/test/DemoVerificationForm'
});

//较验手机号码
import {compose as DemoVerificationMobile} from './Components/PageList/DemoVerificationMobile'

DemoVerificationMobile({
    store,
    actions,
    routeList,
    name: 'DemoVerificationMobile',
    routePath: '/test/DemoVerificationMobile'
});


//*/
//---------公共组件初始化
//全局
import {compose as composeGlobal} from './Components/Global'

composeGlobal({store, actions, name: 'Global'});
//---------具体页面
import {compose as composePageList, Component as PageList} from './Components/PageList'

composePageList({store, actions, routeList, name: 'PageList', routePath: '/test/PageList'});
//第一期
//房产认证-------------
import {
    compose as composRepairHouseAuthentication,
    Component as HouseAuthentication
} from './Components/Certification/Authentication'

composRepairHouseAuthentication({
    store,
    actions,
    routeList,
    name: 'HouseAuthentication',
    routePath: '/HouseAuthentication'
});
//提交认证
import {
    compose as composRepairSubmitCertification,
    Component as SubmitCertification
} from './Components/Certification/SubmitCertification'

composRepairSubmitCertification({
    store,
    actions,
    routeList,
    name: 'SubmitCertification',
    routePath: '/SubmitCertification'
});
//认证成功
import {
    compose as composCertificationStatus,
    Component as CertificationStatus
} from './Components/Certification/CertificationStatus'

composCertificationStatus({
    store,
    actions,
    routeList,
    name: 'CertificationStatus',
    routePath: '/Certification/CertificationStatus'
});
//更换电话号码
import {
    compose as composChangeTelNumber,
    Component as ChangeTelNumber
} from './Components/Certification/ChangeTelNumber'

composChangeTelNumber({store, actions, routeList, name: 'ChangeTelNumber', routePath: '/ChangeTelNumber'});
//更改号码成功
import {
    compose as composChangeTelNumberSuccess,
    Component as ChangeTelNumberSuccess
} from './Components/Certification/ChangeTelNumberSuccess'

composChangeTelNumberSuccess({
    store,
    actions,
    routeList,
    name: 'ChangeTelNumberSuccess',
    routePath: '/Certification/ChangeTelNumberSuccess'
});

//家庭成员列表
import {compose as composFamilyMembers, Component as FamilyMembers} from './Components/Certification/FamilyMembers'

composFamilyMembers({store, actions, routeList, name: 'FamilyMembers', routePath: '/Certification/FamilyMembers'});
//添加家庭成员
import {
    compose as composAddFamilyMembers,
    Component as AddFamilyMembers
} from './Components/Certification/AddFamilyMembers'

composAddFamilyMembers({
    store,
    actions,
    routeList,
    name: 'AddFamilyMembers',
    routePath: '/Certification/AddFamilyMembers'
});


//个人中心-------------
import {compose as composMineList, Component as MineList} from './Components/Mine/List'

composMineList({store, actions, routeList, name: 'MineList', routePath: router.MineList});


// 页面建设中
import {compose as composDeveloping, Component as Developing} from './Components/Developing'

composDeveloping({store, actions, routeList, name: 'Developing', routePath: '/Developing'})

import {compose as composeHome, Component as Home} from './Components/Mine/List'

composeHome({store, actions, routeList, name: 'Home', routePath: '/Home'});
//登录Login
import {compose as composLogin, Component as Login} from './Components/Login'

composLogin({store, actions, routeList, name: 'Login', routePath: '/Login'});
//注册Register
import {compose as composRegister, Component as Register} from './Components/Register'

composRegister({store, actions, routeList, name: 'Register', routePath: '/Register'});

//房屋报修--列表
import {compose as composRepairList, Component as RepairList} from './Components/Repair/List/'

composRepairList({store, actions, routeList, name: 'RepairList', routePath: '/RepairList'});
//房屋报修--详情
import {compose as composRepairDetails, Component as RepairDetails} from './Components/Repair/Details'

composRepairDetails({store, actions, routeList, name: 'RepairDetails', routePath: '/RepairDetails/:id'});
//房屋报修--新增报修

//房屋报修-- 评论
import {compose as composRepairOwnerComment, Component as OwnerComment} from './Components/Repair/OwnerComment'

composRepairOwnerComment({store, actions, routeList, name: 'OwnerComment', routePath: '/OwnerComment/:id/:edit'});
//报修，投诉提交成功
import {compose as composRepairSubmitSucess, Component as SubmitSucess} from './Components/Repair/SubmitSucess'

composRepairSubmitSucess({store, actions, routeList, name: 'SubmitSucess', routePath: '/SubmitSucess'});


//签名
import {compose as composAutograph, Component as Autograph} from './Components/Sign/Autograph'

composAutograph({store, actions, routeList, name: 'Autograph', routePath: router.Autograph});

//委托交付
import {compose as composDelegatedDelivery, Component as DelegatedDelivery} from './Components/Sign/DelegatedDelivery'

composDelegatedDelivery({store, actions, routeList, name: 'DelegatedDelivery', routePath: router.DelegatedDelivery});

//委托交付
import {
    compose as composEntrustedHouseSelection,
    Component as EntrustedHouseSelection
} from './Components/Sign/EntrustedHouseSelection'

composEntrustedHouseSelection({
    store,
    actions,
    routeList,
    name: 'EntrustedHouseSelection',
    routePath: router.EntrustedHouseSelection
});
//委托人上传自己信息
import {
    compose as composEntrustedUploadSelfInfo,
    Component as EntrustedUploadSelfInfo
} from './Components/Sign/EntrustedUploadSelfInfo'

composEntrustedUploadSelfInfo({
    store,
    actions,
    routeList,
    name: 'EntrustedUploadSelfInfo',
    routePath: router.EntrustedUploadSelfInfo
});
// //投诉建议
// import {compose as composComplaintSuggestions,Component as ComplaintSuggestions} from './Components/RepairYu/ComplaintSuggestions'
// composComplaintSuggestions({store,actions,routeList,name:'ComplaintSuggestions',routePath: router.ComplaintSuggestions});
//问卷调查Questionnaire
//问卷调查--列表
import {compose as composQuestionnaireList, Component as QuestionnaireList} from './Components/Questionnaire/List'

composQuestionnaireList({store, actions, routeList, name: 'QuestionnaireList', routePath: '/QuestionnaireList'});

//我的--活动-报名成员
import {compose as composMineActiveStaff, Component as MineActiveStaff} from './Components/Mine/ActiveStaff'

composMineActiveStaff({store, actions, routeList, name: 'MineActiveStaff', routePath: '/MineActiveStaff'});
//我的--活动-我的活动
import {compose as composMineMyactive, Component as MineMyactive} from './Components/Mine/Myactive'

composMineMyactive({store, actions, routeList, name: 'Myactive', routePath: '/Myactive'});
//我的--活动-添加报名成员
import {compose as composAddActiveStaff, Component as AddActiveStaff} from './Components/Mine/AddActiveStaff'

composAddActiveStaff({store, actions, routeList, name: 'AddActiveStaff', routePath: '/AddActiveStaff'});
//我的--活动-取消报名
import {compose as composCancelApply, Component as CancelApply} from './Components/Mine/CancelApply'

composCancelApply({store, actions, routeList, name: 'CancelApply', routePath: '/CancelApply'});

//收楼通知书
import {
    compose as composHandInBuildingNotice,
    Component as HandInBuildingNotice
} from './Components/HandInBuilding/Notice'

composHandInBuildingNotice({
    store,
    actions,
    routeList,
    name: 'HandInBuildingNotice',
    routePath: '/HandInBuildingNotice'
});
//收楼通知详情
import {
    compose as composHandInBuildingDetails,
    Component as HandInBuildingDetails
} from './Components/HandInBuilding/Details'

composHandInBuildingDetails({
    store,
    actions,
    routeList,
    name: 'HandInBuildingDetails',
    routePath: '/HandInBuildingDetails'
});
//收楼签到成功
import {
    compose as composHandInBuildingSignInSuccess,
    Component as HandInBuildingSignInSuccess
} from './Components/HandInBuilding/SignInSuccess'

composHandInBuildingSignInSuccess({
    store,
    actions,
    routeList,
    name: 'HandInBuildingSignInSuccess',
    routePath: '/HandInBuildingSignInSuccess'
});
//收楼修改时间
import {
    compose as composHandInBuildingModifyTime,
    Component as HandInBuildingModifyTime
} from './Components/HandInBuilding/ModifyTime'

composHandInBuildingModifyTime({
    store,
    actions,
    routeList,
    name: 'HandInBuildingModifyTime',
    routePath: '/HandInBuildingModifyTime'
});
//收楼修改时间成功
import {
    compose as composHandInBuildingTimeSuccess,
    Component as HandInBuildingTimeSuccess
} from './Components/HandInBuilding/TimeSuccess'

composHandInBuildingTimeSuccess({
    store,
    actions,
    routeList,
    name: 'HandInBuildingTimeSuccess',
    routePath: '/HandInBuildingTimeSuccess'
});
//确认到访成功
import {
    compose as composHandInBuildingConfirmVisitSuccess,
    Component as HandInBuildingConfirmVisitSuccess
} from './Components/HandInBuilding/ConfirmVisitSuccess'

composHandInBuildingConfirmVisitSuccess({
    store,
    actions,
    routeList,
    name: 'HandInBuildingConfirmVisitSuccess',
    routePath: '/HandInBuildingConfirmVisitSuccess'
});
//未进入交付
import {
    compose as composDelegatedDeliveryNoEntry,
    Component as DelegatedDeliveryNoEntry
} from './Components/DelegatedDelivery/NoEntry'

composDelegatedDeliveryNoEntry({
    store,
    actions,
    routeList,
    name: 'DelegatedDeliveryNoEntry',
    routePath: '/DelegatedDeliveryNoEntry'
});
//委托选房
import {
    compose as composDelegatedDeliveryHouseSelection,
    Component as DelegatedDeliveryHouseSelection
} from './Components/DelegatedDelivery/HouseSelection'

composDelegatedDeliveryHouseSelection({
    store,
    actions,
    routeList,
    name: 'DelegatedDeliveryHouseSelection',
    routePath: '/DelegatedDeliveryHouseSelection'
});
//上傳信息
import {
    compose as composDelegatedDeliveryUploadSelfInfo,
    Component as DelegatedDeliveryUploadSelfInfo
} from './Components/DelegatedDelivery/UploadSelfInfo'

composDelegatedDeliveryUploadSelfInfo({
    store,
    actions,
    routeList,
    name: 'DelegatedDeliveryUploadSelfInfo',
    routePath: '/DelegatedDeliveryUploadSelfInfo'
});

// 二期
//活动列表
import {
    compose as composPhasetwoActivityList,
    Component as PhasetwoActivityList
} from './Components/Phasetwo/Activity/List'

composPhasetwoActivityList({
    store,
    actions,
    routeList,
    name: 'PhasetwoActivityList',
    routePath: '/PhasetwoActivityList'
});
//活动详情
import {
    compose as composPhasetwoActivityListDetail,
    Component as PhasetwoActivityListDetail
} from './Components/Phasetwo/Activity/ListDetail'

composPhasetwoActivityListDetail({
    store,
    actions,
    routeList,
    name: 'PhasetwoActivityListDetail',
    routePath: '/PhasetwoActivityListDetail/:id'
});
//用户列表，第一版本隐藏
// import { compose as composPhasetwoActivityUserList, Component as PhasetwoActivityUserList } from './Components/Phasetwo/Activity/UserList'
// composPhasetwoActivityUserList({ store, actions, routeList, name: 'PhasetwoActivityUserList', routePath: '/PhasetwoActivityUserList' });
//用户列表替换上个，属于第二版本
import {
    compose as composPhasetwoActivityUserList_new,
    Component as PhasetwoActivityUserList_new
} from './Components/Phasetwo/Activity/UserList_new'

composPhasetwoActivityUserList_new({
    store,
    actions,
    routeList,
    name: 'PhasetwoActivityUserList_new',
    routePath: '/PhasetwoActivityUserList_new/:activityid'
});
//用户信息
import {
    compose as composPhasetwoActivityUserInfo,
    Component as PhasetwoActivityUserInfo
} from './Components/Phasetwo/Activity/UserInfo'

composPhasetwoActivityUserInfo({
    store,
    actions,
    routeList,
    name: 'PhasetwoActivityUserInfo',
    routePath: '/PhasetwoActivityUserInfo'
});
//報名成功
import {
    compose as composPhasetwoActivitySignUpSuccess,
    Component as PhasetwoActivitySignUpSuccess
} from './Components/Phasetwo/Activity/SignUpSuccess'

composPhasetwoActivitySignUpSuccess({
    store,
    actions,
    routeList,
    name: 'PhasetwoActivitySignUpSuccess',
    routePath: '/PhasetwoActivitySignUpSuccess'
});
//CancelSuccess
import {
    compose as composPhasetwoActivityCancelSuccess,
    Component as PhasetwoActivityCancelSuccess
} from './Components/Phasetwo/Activity/CancelSuccess'

composPhasetwoActivityCancelSuccess({
    store,
    actions,
    routeList,
    name: 'PhasetwoActivityCancelSuccess',
    routePath: '/PhasetwoActivityCancelSuccess'
});
//活動列表報名單
import {
    compose as composPhasetwoActivitySignUpList,
    Component as PhasetwoActivitySignUpList
} from './Components/Phasetwo/Activity/SignUpList'

composPhasetwoActivitySignUpList({
    store,
    actions,
    routeList,
    name: 'PhasetwoActivitySignUpList',
    routePath: '/PhasetwoActivitySignUpList'
});
//報名狀態
import {
    compose as composPhasetwoActivitySignUpExamine,
    Component as PhasetwoActivitySignUpExamine
} from './Components/Phasetwo/Activity/SignUpExamine'

composPhasetwoActivitySignUpExamine({
    store,
    actions,
    routeList,
    name: 'PhasetwoActivitySignUpExamine',
    routePath: '/PhasetwoActivitySignUpExamine/:joinerId'
});
//確定簽到
import {
    compose as composPhasetwoActivitySignInConfirm,
    Component as PhasetwoActivitySignInConfirm
} from './Components/Phasetwo/Activity/SignInConfirm'

composPhasetwoActivitySignInConfirm({
    store,
    actions,
    routeList,
    name: 'PhasetwoActivitySignInConfirm',
    routePath: '/PhasetwoActivitySignInConfirm/:activityId'
});
//城市资讯列表
import {
    compose as composPhasetwoCityInformationList,
    Component as PhasetwoCityInformationList
} from './Components/Phasetwo/CityInformation/List'

composPhasetwoCityInformationList({
    store,
    actions,
    routeList,
    name: 'PhasetwoCityInformationList',
    routePath: '/PhasetwoCityInformationList'
});
//城市资讯详情
// import { compose as composPhasetwoCityInformationListDetail, Component as PhasetwoCityInformationListDetail } from './Components/Phasetwo/CityInformation/ListDetail'
// composPhasetwoCityInformationListDetail({ store, actions, routeList, name: 'PhasetwoCityInformationListDetail', routePath: '/PhasetwoCityInformationListDetail' });
//家书列表
import {
    compose as composPhasetwoHomeLetterList,
    Component as PhasetwoHomeLetterList
} from './Components/Phasetwo/HomeLetter/List'

composPhasetwoHomeLetterList({
    store,
    actions,
    routeList,
    name: 'PhasetwoHomeLetterList',
    routePath: '/PhasetwoHomeLetterList'
});
//家书列表详情
// import { compose as composPhasetwoHomeLetterListDetail, Component as PhasetwoHomeLetterListDetail } from './Components/Phasetwo/HomeLetter/ListDetail'
// composPhasetwoHomeLetterListDetail({ store, actions, routeList, name: 'PhasetwoHomeLetterListDetail', routePath: '/PhasetwoHomeLetterListDetail' });
//便民列表
import {
    compose as composPhasetwoPeopleInfoList,
    Component as PhasetwoPeopleInfoList
} from './Components/Phasetwo/PeopleInfo/List'

composPhasetwoPeopleInfoList({
    store,
    actions,
    routeList,
    name: 'PhasetwoPeopleInfoList',
    routePath: '/PhasetwoPeopleInfoList'
});
//便民列表详情
import {
    compose as composPhasetwoPeopleInfoListDetail,
    Component as PhasetwoPeopleInfoListDetail
} from './Components/Phasetwo/PeopleInfo/ListDetail'

composPhasetwoPeopleInfoListDetail({
    store,
    actions,
    routeList,
    name: 'PhasetwoPeopleInfoListDetail',
    routePath: '/PhasetwoPeopleInfoListDetail/:id'
});
//文章
import {compose as composPhasetwoArticle, Component as PhasetwoArticle} from './Components/Phasetwo/Article'

composPhasetwoArticle({store, actions, routeList, name: 'PhasetwoArticle', routePath: '/PhasetwoArticle/:id'});
//更换号码
import {
    compose as composCertificationModifySelfInfo,
    Component as CertificationModifySelfInfo
} from './Components/Certification/ModifySelfInfo'

composCertificationModifySelfInfo({
    store,
    actions,
    routeList,
    name: 'CertificationModifySelfInfo',
    routePath: '/CertificationModifySelfInfo'
});
//更换号码成功
import {
    compose as composCertificationModifySelfInfoSucess,
    Component as CertificationModifySelfInfoSucess
} from './Components/Certification/ModifySelfInfo/Sucess'

composCertificationModifySelfInfoSucess({
    store,
    actions,
    routeList,
    name: 'CertificationModifySelfInfoSucess',
    routePath: '/CertificationModifySelfInfoSucess'
});
//我的問題列表
import {
    compose as composPhasetwoMyQuestionnaireList,
    Component as PhasetwoMyQuestionnaireList
} from './Components/Phasetwo/MyQuestionnaireList'

composPhasetwoMyQuestionnaireList({
    store,
    actions,
    routeList,
    name: 'PhasetwoMyQuestionnaireList',
    routePath: '/PhasetwoMyQuestionnaireList/:type'
});

//我的問題
import {
    compose as composPhasetwoMyQuestionnaire,
    Component as PhasetwoMyQuestionnaire
} from './Components/Phasetwo/MyQuestionnaire'

composPhasetwoMyQuestionnaire({
    store,
    actions,
    routeList,
    name: 'PhasetwoMyQuestionnaire',
    routePath: router.PhasetwoMyQuestionnaire
});
// 二期
//默认页Home
// setDefaultPage(PageList,'/');
setDefaultPage(Home, '/');

// 用户房间信息
import {
    compose as composheaderCloudPayment,
    Component as headerCloudPayment
} from './Components/CloudPayment/pub/headerCloudPayment/index'

composheaderCloudPayment({
    store,
    actions,
    routeList,
    name: 'headerCloudPayment',
    routePath: '/CloudPayment/headerCloudPayment/'
});


//微信
window.__initWX__isReady = false;
//当前浏览器是不是微信
window.isWeiXin = function (){
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

async function initWX(){
    function getCurrentUrl(){
        let url = window.location.href;
        url = url.split('#')[0]
        return url;
    }

    //console.log("getCurrentUrl:",getCurrentUrl())
    let url = "wx/getJsConfig";
    let isShowLoading = false;
    let isAutoError = false;
    let cformData = {
        currUrl: getCurrentUrl()
    }
    console.log(cformData);
    let result = await window.GETNoAuth({url, isShowLoading, isAutoError, cformData});
    if (!result.isSucess) return;
    let data = result.data;
    let jsApiList = [
        // 所有要调用的 API 都要加到这个列表中
        'checkJsApi',
        'hideMenuItems',
        'showMenuItems',
        'getLocalImgData',
        'onMenuShareAppMessage',
        'onMenuShareTimeline',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'chooseImage',
        'scanQRCode',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'onVoicePlayEnd',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'translateVoice',
        'updateAppMessageShareData',
        'updateTimelineShareData'
    ];
    window.__initWX_configData = {
        debug: false,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: jsApiList
    };
    wx.config(window.__initWX_configData);
    wx.ready(function (res){
        // console.log('iniWxConfig ready...',window.__initWX_configData);
        window.__initWX__isReady = true;
    });
    wx.error(function (res){
        console.log('iniWxConfig wx.error..wx.config', window.__initWX_configData);
    });

}

/*
 全局导入less
 */
import './App.less'

class App extends React.Component {

    render(){
        var arg = window.getQueryString();
        var currentUrl = window.location.href;
        if (arg && (arg.sessionKey || arg.sessionkey)) {
            let sessionKey = "";
            if (arg.sessionKey) sessionKey = arg.sessionKey;
            if (arg.sessionkey) sessionKey = arg.sessionkey;
            const org = window.location.protocol;
            if (org.includes('http')) {
                sessionKey = sessionKey.split('#/')[0];
            }
            window.setLocalData("auth", sessionKey);//存儲token值
            if (arg.sessionkey) {
                window.location.href = currentUrl.replace(/sessionkey/g, 'newSessionKey');       //重定向
            }
            if (arg.sessionKey) {
                window.location.href = currentUrl.replace(/sessionKey/g, 'newSessionKey');       //重定向
            }
        }

        return <Provider store={store} actions={actions}>
            <ReactChildrenMap>
                {
                    routeList.map((item) => {
                            return <Route
                                {...item}
                            />
                        }
                    )}
            </ReactChildrenMap>
        </Provider>
    }


    //将要渲染
    componentWillMount(){
        setTimeout(function (){
            //微信 WeixinJSBridge 调用内置图片浏览功能
            window.funcReadImgInfo();
        }, 3000);
        console.log("App componentWillMount");
        var arg = window.getQueryString();
        // newSessionKey=oSuxiwn41M_6q6h3ZTRyyYThytZg
        if (arg && (arg.sessionKey || arg.sessionkey)) {
            console.log('这里说明sessionKye', arg)
            let sessionKey = "";
            if (arg.sessionKey) sessionKey = arg.sessionKey;
            if (arg.sessionkey) sessionKey = arg.sessionkey;

            const org = window.location.protocol;
            if (org.includes('http')) {
                sessionKey = sessionKey.split('#/')[0];
            }
            window.setLocalData("auth", sessionKey);//存儲token值
        }
        initWX();
    }


    //渲染完成
    componentDidMount(){
        console.log("App componentDidMount..")
    }
}

export default App



