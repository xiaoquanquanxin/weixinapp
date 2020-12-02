/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle'
/*antd-mobile*/
import { Flex, WhiteSpace, List, WingBlank } from 'antd-mobile';
import MyButton from "../../pub/MyButton";
import CheckBoxItem from "../../pub/CheckBoxItem";
import ActiveStaffItem from "../../pub/ActiveStaffItem";
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
        this.state = {

        }
    }
    submit(){

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
        return <div className={"Components-CancelApply-container"}>
            <WhiteSpace />
            <WingBlank>
                <div className={"cancelcontainer"}>
                    <div className={"cancelItem"}>
                        <CheckBoxItem onChange={()=>console.log(1)}>
                            <ActiveStaffItem isedit={false} hasIdCard={false} />
                        </CheckBoxItem>
                    </div>
                    <div className={"cancelItem"}>
                        <CheckBoxItem onChange={() => console.log(2)}>
                            <ActiveStaffItem isedit={false} hasIdCard={false} />
                        </CheckBoxItem>
                    </div>
                    <div className={"cancelItem"}>
                        <CheckBoxItem onChange={() => console.log(3)}>
                            <ActiveStaffItem isedit={false} hasIdCard={false} />
                        </CheckBoxItem>
                    </div>
                </div>
                <WhiteSpace size="lg"/>
                <MyButton type={"blue"} label={"确定取消"} callback={this.submit}/>
            </WingBlank>
        </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}