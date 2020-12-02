/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle'
/*antd-mobile*/
import {WhiteSpace, WingBlank } from 'antd-mobile';
/*当前页面用到的*/
import MyButton from "../../pub/MyButton"
/*自定义类*/
import './Component.less'
@inject('store', 'actions')
@observer
class __C extends React.Component {
    constructor(props) {
        super(props);
    }
    submit(){
        alert("1234");
    }
    render() {
        const { store, actions } = this.props;
        const { storeDemoButton } = store;
        const { actionsDemoButton} = actions;
        const {tip}=storeDemoButton;
        return <div className={"Components-DemoButton-container"}>
            <WingBlank><h3>{tip}</h3></WingBlank>
            <WhiteSpace size="lg" />
            <WingBlank size="md"> 
                <MyButton callback={this.submit} type={"blue"} label={"确认报名"}/>
                <WhiteSpace size="lg" />
                <MyButton callback={this.submit} type={"green"} label={"注册"}/>
                <WhiteSpace size="lg" />
                <MyButton callback={this.submit} type={"grey"} label={"提交"}/>
                <WhiteSpace size="lg" />
                <MyButton callback={this.submit} type={"white"} label={"提交"}/>
                <WhiteSpace size="lg" />
                <MyButton callback={this.submit} type={"blue"} label={"确认报名"} />
                <WhiteSpace size="lg" />
                <MyButton callback={this.submit} type={"blue"} label={"短按钮"} width={163}/>
            </WingBlank>
            </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}
export default withSetTitle(__C, '页面1')