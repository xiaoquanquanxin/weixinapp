/*共用的*/
import React from 'react';
import {observer, inject} from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle';
/*antd-mobile*/
import {List, InputItem, Checkbox, Flex, WhiteSpace, Picker, Toast} from 'antd-mobile';
import Mybutton from '../../pub/MyButton/index';
import StatusTips from '../../pub/StatusTips/index';
import VerificationCode from '../../pub/VerificationCode/index';

const CheckboxItem = Checkbox.CheckboxItem;
import LayoutContainerOne from '../../pub/LayoutContainersOne';
/*当前页面用到的*/
import header from './header.png';
import addIcon from './add.png';
import editIcon from './edit.png';
import deleteIcon from './delete.png';
import xiaIcon from '../img/xia_icon.png';
import router from '../../../router';

const alert = Modal.alert;
/*自定义类*/
import './Component.less';
import {Modal} from 'antd-mobile/lib/index';

@inject('store', 'actions')
@observer
export default class Template extends React.Component {
    state = {
        // telNumber: false
        array: [],
        editStatus: false
    };

    componentDidMount(){
        const {store, actions} = this.props;
        const {actionsFamilyMembers} = actions;
        window.setWindowTitle('我的');

        /* 用户信息*/
        //const useInfo = { sessionKey: 'a8e19cc85f6779758c6d004cf22bb28b' };
        actionsFamilyMembers.userInfo();
        // o.then((txt) => {
        // 	if (txt == 0) {
        //	actionsFamilyMembers.getRoomInfo(useInfo)
        // 	}
        // });

        /*家庭成员信息*/
        // const body = {
        // 	sessionKey: 'a8e19cc85f6779758c6d004cf22bb28b'
        // };
        // actionsFamilyMembers.userFamily(body);
    }


    /*编辑成员*/
    editFamily = (item, index) => {
        const {store, actions, history} = this.props;
        const {storeFamilyMembers} = store;
        const {userFamily} = storeFamilyMembers;
        history.push(`${router.AddFamilyMembers[0]}?id=${item.memberId}&authUserId=${item.authUserId}`)
        console.log("item", item);
        window.setLocalData("editFamily", item);
        //userFamily[index].editStatus=true;
    };
    /*删除成员*/
    deleteFamily = (ele, index) => {
        const {store, actions} = this.props;
        const {storeFamilyMembers} = store;
        const {actionsFamilyMembers} = actions;
        const {userFamily} = storeFamilyMembers;
        alert('提示', '确定要删除？', [
            {text: '关闭', onPress: () => console.log('cancel')},
            {
                text: '确定', onPress: () => {

                    /*删除操作*/
                    userFamily.forEach((item, indx) => {
                        if (ele.id == item.id) {
                            userFamily.splice(index, 1)
                        }
                    });

                    /*删除操作-服务端请求*/
                    const o = actionsFamilyMembers.delFamilyUser(ele.authUserId);
                    o.then((txt) => {
                        if (txt == 0) {
                            Toast.info(`删除成功!`, 1);
                        }
                    });
                }
            },
        ]);

    };


    render(){
        const {store, actions} = this.props;
        const {storeFamilyMembers} = store;
        const {actionsFamilyMembers} = actions;
        const {useInfo, userFamily, getRoomInfo, roomName, userType} = storeFamilyMembers;
        const {topfunproject} = actionsFamilyMembers;
        // console.log('getRoomInfo___________', getRoomInfo, userFamily)
        return (
            <div className={'Components-FamilyMembers-container'}>
                <div className={'Components-DemoLayout-container '}>
                    <LayoutContainerOne height={144}>
                        <div type="header">
                            <header>
                                <Picker
                                    data={getRoomInfo}
                                    cols={1}
                                    onOk={(v) => {
                                        topfunproject(v[0])
                                    }}
                                >
                                    <div className={"headproject"}>
                                        <div className={"name"}><span>{roomName}</span><img src={xiaIcon}/></div>
                                    </div>
                                </Picker>

                                <Flex className={'OwnerComment-header'}>
                                    <div className={'header-img'}>
                                        <img src={useInfo.userLogo || header}/>
                                    </div>
                                    <div className={'info'}>
                                        <p className={'owner'}>
                                            <span>{useInfo.fullName || useInfo.nickName || '某某某'}</span><span
                                            className={'hasCheck'}>{useInfo.authStatus && useInfo.authStatus == '1' ? '已认证' : '未认证'}</span>
                                        </p>
                                        <p className={'smallFont'}>{useInfo.phoneNo || ''}</p>
                                    </div>
                                </Flex>
                            </header>
                        </div>
                        <div type="content">
                            {
                                // (userFamily && userFamily.length>0 && userFamily.peek()) .map((item, index) => {
                                userFamily && userFamily.length > 0 && userFamily.map((item, index) => {
                                    if (userFamily[index].fullName) {
                                        return (<ul className={'list-item'} key={index}>
                                            <li>
                                                <div className={"padbox"}>
                                                    <div>
                                                        <span
                                                            className={'use-name'}>{userFamily[index].fullName}  </span>
                                                    </div>
                                                    <div className={'grayColor'}>
                                                        <Flex>
                                                            <Flex.Item> <span>性别：{item.sex == 1 ? '男' : '女'} </span>
                                                                &nbsp;&nbsp;&nbsp; &nbsp;
                                                            </Flex.Item>
                                                            <Flex.Item>
                                                                <span>电话：{item.phoneNo}</span>
                                                            </Flex.Item>
                                                        </Flex>
                                                    </div>
                                                </div>
                                                {userType == 1 && <Flex className={'editInfo'}>
                                                    <Flex.Item onClick={() => {
                                                        this.editFamily(item, index);
                                                    }}><img src={editIcon}/> 编辑</Flex.Item>
                                                    <Flex.Item onClick={() => {
                                                        this.deleteFamily(item, index);
                                                    }}><img src={deleteIcon}/> 删除</Flex.Item>
                                                </Flex>}

                                            </li>
                                        </ul>);
                                    }
                                })
                            }
                            <WhiteSpace size="lg"/>
                            <WhiteSpace size="lg"/>
                            {+userType === 1 && <Flex onClick={() => {
                                this.props.history.push(`${router.AddFamilyMembers[0]}`);
                            }}>
                                <div className={'addFamily grayColor'}><p><img src={addIcon} alt=''/></p> <p
                                    className={'m_top10'}>添加家庭成员</p></div>
                            </Flex>}
                        </div>
                    </LayoutContainerOne>
                </div>
            </div>
        );
    }

    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}
