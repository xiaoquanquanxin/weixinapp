import React from 'react';
import withSetTitle from 'LibComponents/withSetTitle';
import { List, WhiteSpace, WingBlank,Toast } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
import constant from '../../constant'

/**
 * 所有页面列表
 *
 */
class __C extends React.Component {
    constructor (props) {
        super(props);
        this.dataList = [
            { label: '第一期', url: '/Demo/AllPageList' },
            /*{ label: '---==$$$ 微信菜单跳转 $$$==---', url: '#', noExtra: '' },
           { label: '--==微信菜单跳转==--', url: '#', noExtra: '' },
            { label: '投诉建议-禹州', url: '/AddRepairYu' },
            { label: '房屋报修-禹州', url: `/AddRepairYu`},
            { label: '个人中心', url: '/MyInfo' },*/
            { label: '个人中心', url: '/MineList' },
            { label: '--==认证==--', url: '#', noExtra: '' },
            { label: '没有绑定任何房间房产认证', url: '/HouseAuthentication' },
            { label: '提交认证', url: '/SubmitCertification' },
            { label: '提交认证成功', url: '/Certification/CertificationStatus' },
            { label: '认证家属', url: '/Certification/FamilyMembers' },
            { label: '添加家庭成员', url: '/Certification/AddFamilyMembers' },
            { label: '--==报修==--', url: '#', noExtra: '' },
            // { label: '房屋报修', url: '/AddRepair' },
            { label: '房屋报修', url: `/AddRepair/${constant.REPORTREPAIR}` },
            { label: '房屋报修-禹州', url: `/AddRepairYu/1`},
            { label: '投诉建议', url: `/AddRepair/${constant.COMPLAINSUGGESTIONS}` },
            { label: '投诉建议400', url: `/ComplaintSuggestions` },
            { label: '房屋报修-列表', url: '/RepairList/2' },
            { label: '房屋报修-列表-禹州', url: '/RepairListYu/2' },
            { label: '房屋报修-提交报修提交成功', url: '/SubmitSucess' },
            { label: '房屋报修-详情', url: '/RepairDetails/1/1' },
            { label: '房屋报修-详情-禹州', url: '/RepairDetailsYu/1/1' },
            { label: '业主评价', url: '/OwnerComment' },
            { label: '--==页面分类1==--', url: '#', noExtra: '' },
            { label: '登录', url: '/Login' },
            { label: '注册', url: '/Register' },
            { label: '--==个人中心==--', url: '#', noExtra: '' },
            { label: '个人中心', url: '/MyInfo' },
            { label: '--==活动报名==--', url: '#', noExtra: '' },
            { label: '报名列表', url: '/ActivitySignUpList' },
            { label: '我的列表', url: '/ActivityMyList' },
            { label: '活动列表', url: '/ActivityList' },
            { label: '--==实地家书==--', url: '#', noExtra: '' },
            { label: '列表', url: '/HomeLetterList' },
            { label: '列表详情', url: '/HomeLetterListDetail' },
            { label: '--==城市资讯==--', url: '#', noExtra: '' },
            { label: '列表', url: '/CityInformationList' },
            { label: '列表详情', url: '/CityInformationListDetail' },
            { label: '--==便民信息==--', url: '#', noExtra: '' },
            { label: '列表', url: '/PeopleInfoList' },
            { label: '列表详情', url: '/PeopleInfoListDetail' },


			{ label: '--==问卷调查==--', url: '#', noExtra: '' },
            { label: '列表', url: '/QuestionnaireList' },
            { label: '--=我的==--', url: '#', noExtra: '' },
            { label: '列表', url: '/MineList' },
            { label: '我的活动-报名成员', url: '/MineActiveStaff' },
            { label: '我的活动-我的活动', url: '/Myactive' },
            { label: '我的活动-添加报名成员', url: '/AddActiveStaff'},
            { label: '我的活动-取消报名成员', url: '/CancelApply' },
            { label: '--==预约签到==--', url: '#', noExtra: '' },
            { label: '签到成功', url: '/Autograph' },
			{ label: '委托交付', url: '/DelegatedDelivery' },
			{ label: '委托选房', url: '/EntrustedHouseSelection' },
			{ label: '委托人上传资料', url: '/EntrustedUploadSelfInfo' },


			{ label: '--==云支付==--', url: '#', noExtra: '' },
			{ label: '交付须知', url: '/CloudPayment/PaymentKnow' },


			{ label: '--==公共组件==--', url: '#', noExtra: '' },
			{ label: '云支付实例', url: '/CloudPayment/Demo' },
			{ label: '按钮', url: '/test/DemoButton' },
			{ label: '按纽提交后状态提示', url: '/test/DemoStatusTips' },
			{ label: '获取教验码', url: '/test/GetVerificationCode' },
			{ label: '图片弹窗', url: '/test/DemoImgZoomHOC' },
			{ label: '表单验证', url: '/test/DemoVerificationForm' },
			{ label: '验证手机号码', url: '/test/DemoVerificPageListationMobile' },
            { label: '布局容器', url: '/test/DemoLayout' },
            { label: '复选框', url: '/test/DemoCheckBox'},
            { label: '单选框', url: '/test/DemoRadioBox' }
        ];
        this.goto.bind(this);

    }
    goto (url) {
        this.props.history.push(url);
    }
    render () {
        return <WingBlank style={{height:"100%",overflow:"scroll"}}>
            <List renderHeader={() => '所有页面列表'} >
                {
                    this.dataList.map((item, index) => {
                        let arrow = typeof item.noExtra != 'undefined' ? 'empty' : 'horizontal';
                        return <Item arrow={arrow} key={index}
                                     onClick={() => {this.goto(item.url);}} >{item.label}</Item >;
                    })
                }
            </List ></WingBlank >;
    }
    componentDidMount(){
    }
}

export default withSetTitle(__C, '测试：所有页面列表');
