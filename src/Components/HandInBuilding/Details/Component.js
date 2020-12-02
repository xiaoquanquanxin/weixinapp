/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle'
/*antd-mobile*/
import { Flex, WhiteSpace, List, WingBlank} from 'antd-mobile';
import MyButton from "../../pub/MyButton";
import Layout from "../../pub/LayoutContainersOne";
import ActiveInfo from "./ActiveInfo";
import ActiveItem from "./StaffStatus";
import ActiveTip from "./ActiveTip";
/*当前页面用到的*/
// const data1 = Array.from(new Array(3)).map((_val, i) => ({
//     icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
//     text: `name${i}`,
// }));
const Item = List.Item;
const Brief = Item.Brief;
/*自定义类*/
import './Component.less'
@inject('store', 'actions')
@observer
export default class HandInBuildingDetails extends React.Component {
    componentDidMount() {
        window.setWindowTitle("收楼通知")
        this.props.actions.actionsHandInBuildingDetails.Detailsfun()
    }
    render() {
        const { store, actions } = this.props;
        const { storeHandInBuildingDetails } = store;
        const { actionsHandInBuildingDetails} = actions;
        const { DetailsData, userType, getOrderDetailQrcode, getOrderDetailQrcodeval } = storeHandInBuildingDetails;
        const { scanQRCode, getOrderDetailQrcodefun, ConfirmVisit, HandInBuildingModifyTimefun} = actionsHandInBuildingDetails
        console.log(1,DetailsData)
        return <div className={"Components-Myactive-container"}>
                    <Layout height={155}>
                        <div type="header">
                            <div className={"Myactive-header"}>
                                <WingBlank>
                                    <ActiveTip ActiveTipdata={DetailsData} />
                                </WingBlank>
                            </div>
                        </div>
                        <div type="content">
                    <ActiveInfo ActiveInfodata={DetailsData}/>
                        </div>
                    </Layout>
                    <div className={"Myactive-content"}>
                        <div className={"rea"}>
                            <List>
                                <Item thumb={<div className={"leftButton"}></div>}>
                                    {<span>报名信息</span>}
                                    <Brief>
                                <div className={"g-width"}>
                                {DetailsData.roomName}
                                </div>
                                </Brief>
                                </Item>
                            </List>
                    <div className={"abs"} onClick={() => { getOrderDetailQrcodefun(true)}}>
                        {getOrderDetailQrcode&&<img src={"data:image/png;base64," +getOrderDetailQrcode} />}
                        </div>
                        </div>
                        <div>
                            {
                                
                        DetailsData.userFamilyInfo&&DetailsData.userFamilyInfo.map((v,i)=>{
                            console.log(v, i) 
                            return (
                                < ActiveItem key={i} ActiveItemdata = { v } hasIDCard = { true} statusName = { userType[v.userType]} hasstatus = { true} color = { "#666666"} />
                            )
                            
                        })
                            }
                        </div>
                    </div>
                    <div className={"btnbox"}>
                {DetailsData.confirmVisit==0 &&
                    <div className={"btn"} onClick={() => { ConfirmVisit(this.props.history) }}>
                        <MyButton type={"blue"} label={"确认到访时间"} width={DetailsData.canChangeDay==1 && 163} />
                    </div>
                        }
                
                        {
                    DetailsData.canChangeDay==1&&
                    <div className={"btn"} onClick={() => { HandInBuildingModifyTimefun(this.props.history) }}>
                        <MyButton type={"white"} label={"修改预约时间"} width={DetailsData.confirmVisit == 0 &&163} />
                    </div>
                        }
               
                    </div>
                {getOrderDetailQrcodeval&&
                    <div className="backgroundcode">
                <div className={"codexx"} onClick={() => { getOrderDetailQrcodefun(false) }}>X</div>
                            <div className={"imgw"}>
                    <img src={"data:image/png;base64,"+getOrderDetailQrcode} />
                            </div>
                        </div>
                    }
               </div>;
    }
}