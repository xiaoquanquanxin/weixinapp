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
export default class Template extends React.Component {
    /*state = {
        state1: ''
    }*/
    constructor(props) {
        super(props);
        this.state={
           
        }
    }
    //下一步
    Next(){

    }
    componentDidMount() {
        //console.log('[Template] componentDidMount..')
        window.setWindowTitle("我的报名")
    }
    render() {
        const { store, actions } = this.props;
        const { storeTemplate } = store;
        //const { actionsTemplate} = actions;
        const { tip } = storeTemplate;
        return <div className={"Components-Myactive-container"}>
                    <Layout height={115}>
                        <div type="header">
                            <div className={"Myactive-header"}>
                                <WingBlank>
                                    <ActiveTip />
                                </WingBlank>
                            </div>
                        </div>
                        <div type="content">
                            <ActiveInfo />
                        </div>
                    </Layout>
                    <div className={"Myactive-content"}>
                        <div>
                            <List>
                                <Item thumb={<div className={"leftButton"}></div>}>
                                    {<span>报名信息</span>}
                                    <Brief>
                                    实地中山锦湖城 A1栋0402
                                </Brief>
                                </Item>
                            </List>
                        </div>
                        <div>
                            <ActiveItem hasIDCard={true} statusName={"未签到"} hasstatus={true} color={"#666666"}/>
                            <ActiveItem hasIDCard={true} statusName={"已签到"} hasstatus={true}  color={"#64C433"}/>
                            <ActiveItem hasIDCard={true} statusName={"已发送礼品"} hasstatus={true} color={"#64C433"}/>
                        </div>
                    </div>
               </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}