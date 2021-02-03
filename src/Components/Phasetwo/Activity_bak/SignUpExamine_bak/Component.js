/*共用的*/
import React from 'react'
import {observer, inject} from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle'
/*antd-mobile*/
import {Flex, WhiteSpace, List, WingBlank} from 'antd-mobile';
import MyButton from "../../../pub/MyButton";
import Layout from "../../../pub/LayoutContainersOne";
import ActiveInfo from "./ActiveInfo";
import ActiveItem from "./StaffStatus";
import ActiveTipExamine from "./ActiveTipExamine";

import ActiveTipSuccess from "./ActiveTipSuccess";
import ActiveTipNo from "./ActiveTipNo";
import ActiveTipCancel from "./ActiveTipCancel";
import ActiveTipFished from "./ActiveTipFished";

// const Item = List.Item;
// const Brief = Item.Brief;
/*自定义类*/
import './Component.less'

@inject('store', 'actions')
@observer
export default class PhasetwoActivitySignUpExamine extends React.Component {
    componentDidMount(){
        window.setWindowTitle("报名详情");
        this.props.actions.actionsPhasetwoActivitySignUpExamine.Detailsfun(this.props.match.params.joinerId);
    }

    componentWillReceiveProps(newProps){
        console.log(newProps.match.params.joinerId, 'newProps', this.props.match.params.joinerId, 'old');
        if (this.props.match.params.joinerId !== newProps.match.params.joinerId) {
            this.props.actions.actionsPhasetwoActivitySignUpExamine.Detailsfun(this.props.match.params.joinerId)
        }
    }

    render(){
        const {store, actions, history} = this.props;
        const {storePhasetwoActivitySignUpExamine} = store;
        const {actionsPhasetwoActivitySignUpExamine} = actions;
        const {DetailsData, userType, joinerId, findInfoByJoinerId} = storePhasetwoActivitySignUpExamine;
        const {scanQRCode, modifyfun, cancelfun} = actionsPhasetwoActivitySignUpExamine;
        //console.log(1,DetailsData)
        //（1-待审核，2-报名成功，3-取消报名，4-审核不通过，5-签到完成）
        return <div className={"Components-Myactive-container"}>
            <Layout height={115}>
                <div type="header">
                    <div className={"Myactive-header"}>
                        <WingBlank>
                            {
                                <div>
                                    {DetailsData.status == 1 &&
                                    <ActiveTipExamine ActiveTipdata={DetailsData}/>
                                    }{DetailsData.status == 2 &&
                                <ActiveTipSuccess ActiveTipdata={DetailsData}/>
                                }{DetailsData.status == 3 &&
                                <ActiveTipCancel ActiveTipdata={DetailsData}/>
                                }{DetailsData.status == 4 &&
                                <ActiveTipNo ActiveTipdata={DetailsData}/>
                                }{DetailsData.status == 5 &&
                                <ActiveTipFished ActiveTipdata={DetailsData}/>
                                }
                                </div>
                            }
                        </WingBlank>
                    </div>
                </div>
                <div type="content">
                    <ActiveInfo ActiveInfodata={DetailsData}/>
                </div>
            </Layout>
            {+findInfoByJoinerId.isOpenPic === 1 && (
                <div className="QRcode">
                    <img src={findInfoByJoinerId.picture} alt=''/>
                    <div className="QRtext">{findInfoByJoinerId.txtDescribe}</div>
                </div>
            )}
            <div className={"Myactive-content"}>
                <div>
                    <List>
                        <List.Item thumb={<div className={"leftButton"}></div>}>
                            {<span>报名信息</span>}
                            <List.Item.Brief>
                                {DetailsData.roomName}
                            </List.Item.Brief>
                        </List.Item>
                    </List>
                </div>
                <div>
                    {
                        DetailsData.joinerInfoArr && DetailsData.joinerInfoArr.map((v, i) => {
                            // console.log(v, i,"DetailsData.joinerInfoArr")

                            return (
                                < ActiveItem key={i} ActiveItemdata={v} hasIDCard={true}
                                             statusName={userType[v.userType]} hasstatus={true} color={"#666666"}/>
                            )

                        })
                    }
                </div>
            </div>
            <div className={"btnbox"}>
                {
                    DetailsData.modifyNumber == 0 && DetailsData.status != 5 &&
                    <div className={"btn"} onClick={() => {
                        modifyfun(history)
                    }}>
                        <MyButton type={"blue"} label={"修改信息"}
                                  width={(DetailsData.status == 2 && DetailsData.activityStatus == 1) ? "" : 163}/>
                    </div>
                }
                {
                    DetailsData.status == 2 && DetailsData.activityStatus == 0 &&
                    <div className={"btn"} onClick={() => {
                        scanQRCode(history, joinerId)
                    }}>
                        <MyButton type={"blue"} label={"扫码签到"} width={DetailsData.modifyNumber == 0 && 163}/>
                    </div>
                }
                {DetailsData.status == 1 ?
                    <div className={"btn"} onClick={() => {
                        cancelfun(history)
                    }}>
                        <MyButton type={"white"} label={"取消报名"} width={DetailsData.modifyNumber == 0 && 163}/>
                    </div> : ""
                }
                {DetailsData.status == 3 &&
                <div className={"btn"} onClick={() => {
                    history.push("/PhasetwoActivityList")
                }}>
                    <MyButton type={"blue"} label={"查看其他活动"} width={DetailsData.modifyNumber == 0 && 163}/>
                </div>
                }
                {DetailsData.status == 4 &&
                <div className={"btn"} onClick={() => {
                    history.push("/PhasetwoActivityList")
                }}>
                    <MyButton type={"blue"} label={"查看其他活动"} width={DetailsData.modifyNumber == 0 && 163}/>
                </div>
                }
                {/* <div className={"btn"} onClick={() => { this.props.history.push("/") }}>
                    <MyButton type={"white"} label={"查看其他活动"} width={!!DetailsData.canChangeDay && 163} />
                </div> */}
            </div>
        </div>;
    }
}
