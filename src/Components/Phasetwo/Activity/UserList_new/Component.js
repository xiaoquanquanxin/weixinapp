/*共用的*/
import React from 'react';
import {observer, inject} from 'mobx-react';
/*antd-mobile*/
import {List, InputItem, TextareaItem, Flex, Picker} from 'antd-mobile';
import {toJS} from 'mobx'
import LayoutContainerOne from '../../../pub/LayoutContainersOne';
import MyButton from "../../../pub/MyButton"
/*当前页面用到的*/
import addIcon from './add.png';
import editIcon from './edit.png';
import deleteIcon from './delete.png';
import xiaIcon from '../img/arrow.png';
import build from '../img/build.png';
import shanchu from '../img/shanchu.png';

/*自定义类*/
import './Component.less';
import {Modal} from 'antd-mobile/lib/index';

@inject('store', 'actions')
@observer
export default class PhasetwoActivityUserList_new extends React.Component {
    state = {
        // telNumber: false
        array: [],
        editStatus: false,
        sValue: ""
    };

    componentDidMount(){
        const {store, actions} = this.props;
        const {actionsPhasetwoActivityUserList_new} = actions;
        window.setWindowTitle('报名成员');
        actionsPhasetwoActivityUserList_new.userInfo(this.props);
    }

    componentWillUnmount(){
        //console.log(212121)
        //this.props.actions.actionsPhasetwoActivityUserList_new.out();
    }

    render(){
        const {store, actions, history} = this.props;
        const {storePhasetwoActivityUserList_new} = store;
        const {actionsPhasetwoActivityUserList_new} = actions
        const {useInfo, userFamily, getRoomInfo, roomName, roomList, userList, Interestselects, UserInfodata, needCost, citylist} = storePhasetwoActivityUserList_new;
        const {topfunproject, Interestfun, submitfun, inputfun, addfun, shanchufun, pickerfun, pickerareafun} = actionsPhasetwoActivityUserList_new
        let sex = ["未知", "男", "女"]

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
                                            {getRoomInfo.length > 0 &&
                                            <Picker
                                                data={getRoomInfo}
                                                cols={1}
                                                onOk={(v) => {
                                                    topfunproject(v[0])
                                                }}
                                            >
                                                <div className={"headproject"}>
                                                    <div className={"name"}><span>{roomName}</span><img src={xiaIcon}/>
                                                    </div>
                                                </div>
                                            </Picker>
                                            }


                                        </div>
                                    </div>
                                </Flex>
                            </header>
                        </div>

                        <div type="content">
                            {(needCost == 1 || needCost == 2) &&
                            <div className="tips">温馨提示：此次活动需要收取报名费用，签到成功后会原额退款。</div>
                            }

                        </div>


                    </LayoutContainerOne>
                    <div className="UserInfodataclass">
                        {
                            UserInfodata && UserInfodata.map((v, i) => {
                                return (
                                    <div key={i}>
                                        <div className={"h15line"}></div>
                                        <List>
                                            {
                                                v.paramArr && v.paramArr.map((vv, ii) => {
                                                    return (
                                                        <div key={ii}>
                                                            {
                                                                vv.paramType == 1 &&
                                                                <div
                                                                    className={vv.extValues != "" ? "isBirthboder" : "faBirth"}>
                                                                    <Picker
                                                                        extra={vv.extValues != "" ? vv.extValues : '请选择'}
                                                                        data={vv.paramOptions}
                                                                        cols={1}
                                                                        value={[vv.extValues]}
                                                                        onOk={value => {
                                                                            pickerfun(value[0], 'Agedate', i, ii)
                                                                        }
                                                                        }
                                                                    >
                                                                        <List.Item
                                                                            arrow="horizontal">{vv.extTitle}</List.Item>
                                                                    </Picker>
                                                                </div>
                                                            }{
                                                            vv.paramType == 3 &&
                                                            <InputItem
                                                                placeholder={vv.extValues != "" ? vv.extValues : "请输入"}
                                                                maxLength={22}
                                                                onChange={(e) => {
                                                                    inputfun(e, i, "name", ii)
                                                                }
                                                                }
                                                            >{vv.extTitle}</InputItem>
                                                        }{
                                                            vv.paramType == 2 &&
                                                            <div className={"Interest"}>
                                                                <div className={"g-tit"}>{vv.extTitle}</div>
                                                                <div className={"g-text"}>
                                                                    {
                                                                        vv.paramOptions.map((subItem, iv) => (
                                                                            <div key={iv}
                                                                                 className={`${vv.Interestselects.includes(subItem.label) ? "li on" : 'li'}`}
                                                                                 onClick={() => {
                                                                                     Interestfun(subItem.label, i, ii)
                                                                                 }}>{subItem.label}</div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                        }{
                                                            vv.paramType == 4 &&
                                                            <div className={"Interest"}>
                                                                <div className={"g-tit address"}>{vv.extTitle}</div>
                                                                <div className={"g-text"}>
                                                                    <TextareaItem
                                                                        className={"width100"}
                                                                        onChange={(e) => {
                                                                            inputfun(e, i, "name", ii)
                                                                        }}
                                                                        placeholder={vv.extValues != "" ? vv.extValues : "请输入"}
                                                                        clear
                                                                    />
                                                                </div>
                                                            </div>
                                                        }

                                                            {
                                                                vv.paramType == 5 &&
                                                                <div className={"Interest area"}>

                                                                    <Picker
                                                                        extra={vv.extValues != "" ? vv.extValues : '选择地区'}
                                                                        data={citylist}
                                                                        cols={3}
                                                                        value={[vv.extValues]}
                                                                        onOk={value => {
                                                                            console.log(value, "value")
                                                                            pickerareafun(value, 'Agedate', i, ii)
                                                                            // pickerfun(value[0], 'Agedate', i, ii)
                                                                        }
                                                                        }
                                                                    >
                                                                        <List.Item
                                                                            arrow="horizontal">{vv.extTitle}</List.Item>
                                                                    </Picker>

                                                                </div>
                                                            }
                                                            {
                                                                vv.paramType == 6 &&
                                                                <div className={"Interest areadeail"}>
                                                                    <div className={"g-text"}>
                                                                        <TextareaItem
                                                                            className={"width100"}
                                                                            onChange={(e) => {
                                                                                inputfun(e, i, "name", ii)
                                                                            }}
                                                                            placeholder={vv.extValues != "" ? vv.extValues : "请填写详细地址"}
                                                                            clear
                                                                        />
                                                                    </div>
                                                                </div>
                                                            }

                                                        </div>
                                                    )
                                                })
                                            }
                                        </List>
                                        {i !== 0 &&
                                        <div className="sc_split" onClick={() => {
                                            shanchufun(i)
                                        }}>
                                            <div className="sc_img"><img src={shanchu}/></div>
                                            <div className="sc_text">删除报名信息</div>
                                        </div>
                                        }

                                    </div>
                                )
                            })
                        }
                        <div className={'addFamily grayColor'}
                             onClick={() => {
                                 addfun()
                             }}>
                            <div className="radio_box">
                                <p><img src={addIcon}/></p>
                                <p className={"adduser"}>添加报名信息</p>
                            </div>

                        </div>
                    </div>
                    <div>
                        <div className="fixedheight"></div>
                        <div className={"fixed"}>
                            <div className={"center"} onClick={() => {
                                true ? submitfun(history) : ""
                            }}>
                                <MyButton type={true ? "blue" : "grey"} label={"确认报名"}/>
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
