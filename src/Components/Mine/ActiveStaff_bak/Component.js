/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle'
/*antd-mobile*/
import { Flex, WhiteSpace, List, WingBlank } from 'antd-mobile';
import MyButton from "../../pub/MyButton";
import Layout from "../../pub/LayoutContainersOne";
import ActiveStaffItem from "../../pub/ActiveStaffItem";
import AddButton from '../../pub/AddButton';
import CheckBoxItem from '../../pub/CheckBoxItem';
/*当前页面用到的*/
import buildingRoom from "./img/fangchanxinxi.png";
// const data1 = Array.from(new Array(3)).map((_val, i) => ({
//     icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
//     text: `name${i}`,
// }));
const Item = List.Item;
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
        this.state = {

        }
    }
    //下一步
    Next() {

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
        return <div className={"Components-MineActiveStaff-container"}>
            <Layout height={115}>
                <div type="header">
                    <WingBlank>
                        <div className={"header-content"}>
                            <div className="buildingInfo">
                                <img src={buildingRoom}></img>
                                <span className="buildingText">实地广州常春藤·蓝藤花园-S1-A-10</span>
                            </div>
                        </div>
                    </WingBlank>
                </div>
                <div type="content">
                    <div className={"Item-container"}>
                        <CheckBoxItem onChange={() => console.log(1)}>
                            <ActiveStaffItem isedit={true} hasIdCard={false} />
                        </CheckBoxItem>
                    </div>
                    <div className={"Item-container"}>
                        <CheckBoxItem onChange={() => console.log(1)}>
                            <ActiveStaffItem isedit={true} hasIdCard={false} />
                        </CheckBoxItem>
                    </div>
                    <div className={"Item-container"}>
                        <CheckBoxItem onChange={() => console.log(1)}>
                            <ActiveStaffItem isedit={true} hasIdCard={false} />
                        </CheckBoxItem>
                    </div>
                </div>
            </Layout>
            <WingBlank>
                <AddButton />
                <WhiteSpace size="lg" />
                <MyButton callback={this.Next} type={"blue"} label={"下一步"} />
                <WhiteSpace size="lg" />
                <p className="redSpan">需要提交身份证号或年龄，服装尺码</p>
            </WingBlank>
        </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}