/*共用的*/
import React from 'react';
import {observer, inject} from 'mobx-react';
/*antd-mobile*/
import {Flex, Picker} from 'antd-mobile';
import {toJS} from 'mobx'
import LayoutContainerOne from '../../../pub/LayoutContainersOne';
import MyButton from "../../../pub/MyButton"
/*当前页面用到的*/
import addIcon from './add.png';
import editIcon from './edit.png';
import deleteIcon from './delete.png';
import xiaIcon from '../img/xia_icon.png';
import build from '../img/build.png';

/*自定义类*/
import './Component.less';
import {Modal} from 'antd-mobile/lib/index';

@inject('store', 'actions')
@observer
export default class PhasetwoActivityUserList extends React.Component {
    state = {
        // telNumber: false
        array: [],
        editStatus: false,
        sValue: ""
    };

    componentDidMount(){
        const {store, actions} = this.props;
        const {actionsPhasetwoActivityUserList} = actions;
        window.setWindowTitle('报名成员');
        actionsPhasetwoActivityUserList.userInfo();
    }

    componentWillUnmount(){
        //console.log(212121)
        //this.props.actions.actionsPhasetwoActivityUserList.out();
    }

    render(){
        const {store, actions, history} = this.props;
        const {storePhasetwoActivityUserList} = store;
        const {actionsPhasetwoActivityUserList} = actions
        const {useInfo, userFamily, getRoomInfo, roomName, roomList, userList, Interestselects, UserInfodata} = storePhasetwoActivityUserList;
        const {topfunproject, Interestfun, submitfun} = actionsPhasetwoActivityUserList
        let sex = ["未知", "男", "女"]
        console.log('getRoomInfo___________', getRoomInfo, userFamily)
        return (
            <div className={'Components-FamilyMembers-container'}>
                <div className={'Components-DemoLayout-container '}>
                    <LayoutContainerOne height={115}>
                        <div type="header">
                            <header>

                                <Flex className={'OwnerComment-header'}>
                                    <div className={'header-img'}>
                                        <img src={build}/>
                                    </div>
                                    <div className={'info'}>
                                        <div className={'owner'}>
                                            {/* <span >无关联房产信息</span > */}
                                            {
                                                getRoomInfo.length > 0 ?
                                                    <Picker
                                                        data={getRoomInfo}
                                                        cols={1}
                                                        onOk={(v) => {
                                                            topfunproject(v[0])
                                                        }}
                                                    >
                                                        <div className={"headproject"}>
                                                            <div className={"name"}><span>{roomName}</span><img
                                                                src={xiaIcon}/></div>
                                                        </div>
                                                    </Picker>
                                                    : <span>无关联房产信息</span>
                                            }


                                        </div>
                                    </div>
                                </Flex>
                            </header>
                        </div>

                        <div type="content">
                            <div className={"userlist"}>
                                {
                                    userList && userList.map((subItem, i) => {
                                            //console.log(21212, subItem, subItem.paramArr)
                                            return (
                                                <div className={"user"} key={i} onClick={() => {
                                                    Interestfun(subItem.wxUserId)
                                                }}>
                                                    <div className="checkboxFive">
                                                        <div
                                                            className={`${Interestselects.includes(subItem.wxUserId) ? "li on" : 'li'}`}/>
                                                    </div>
                                                    <div className={"info"}>
                                                        <div className={"name"}>
                                                            <span>{subItem.name}【{subItem.userType == 1 ? "业主" : (subItem.userType == 3 ? "家属" : '租户')}】</span>
                                                        </div>
                                                        <div className={"phone"}>
                                                            <span>性别：{subItem.sex == 1 ? "男" : "女"}</span><span>电话：{subItem.phoneNo}</span>
                                                        </div>
                                                        {
                                                            subItem.paramArr && subItem.paramArr.map((vv, ii) => {
                                                                let ext = ""
                                                                if (Array.isArray(toJS(vv.extValues))) {
                                                                    console.log(2222, vv.extValues)
                                                                    ext = vv.extValues.join(',')
                                                                } else {
                                                                    ext = vv.extValues
                                                                }
                                                                return (
                                                                    <div key={ii}>
                                                                        <div className={"phone"}>
                                                                            <span>{vv.extTitle}：{ext}</span></div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>

                                                </div>
                                            )
                                        }
                                    )
                                }

                                {
                                    getRoomInfo.length == 0 && UserInfodata && UserInfodata.map((subItem, i) => {
                                            //console.log(21212, subItem.paramArr)
                                            return (
                                                <div className={"user"} key={i} onClick={() => {
                                                    Interestfun(subItem.wxUserId)
                                                }}>
                                                    <div className="checkboxFive">
                                                        <div
                                                            className={`${Interestselects.includes(subItem.wxUserId) ? "li on" : 'li'}`}></div>
                                                    </div>
                                                    <div className={"info"}>
                                                        {/* <div className={"name"}><span>{subItem.name}</span></div>
													<div className={"phone"}><span>性别：{sex[subItem.sex]}</span><span>电话：{subItem.phoneNo}</span></div> */}
                                                        {
                                                            subItem.paramArr && subItem.paramArr.map((vv, ii) => {
                                                                let ext = ""
                                                                if (Array.isArray(toJS(vv.extValues))) {
                                                                    //console.log(2222,vv.extValues)
                                                                    ext = vv.extValues.join(',')
                                                                } else {
                                                                    ext = vv.extValues
                                                                }
                                                                return (
                                                                    <div key={ii}>
                                                                        <div className={"phone"}>
                                                                            <span>{vv.extTitle}：{ext}</span></div>
                                                                    </div>
                                                                )
                                                            })
                                                        }

                                                    </div>
                                                </div>
                                            )
                                        }
                                    )
                                }


                            </div>
                            {
                                getRoomInfo.length == 0 ?
                                    <div className={'addFamily grayColor'}
                                         onClick={() => {
                                             history.push('/PhasetwoActivityUserInfo?auth=-1')
                                         }}>
                                        <p><img src={addIcon}/></p>
                                        <p className={"adduser"}>添加报名成员</p>
                                    </div>
                                    :
                                    <div className={'addFamily grayColor'}
                                         onClick={() => {
                                             history.push('/Certification/AddFamilyMembers')
                                         }}>
                                        <p><img src={addIcon}/></p>
                                        <p className={"adduser"}>添加家庭成员</p>
                                    </div>
                            }

                        </div>

                    </LayoutContainerOne>
                    <div>
                        <div className="fixedheight"></div>
                        <div className={"fixed"}>
                            <div className={"center"} onClick={() => {
                                Interestselects.length > 0 ? submitfun(history) : ""
                            }}>
                                <MyButton type={Interestselects.length > 0 ? "blue" : "grey"} label={"确认报名"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}
