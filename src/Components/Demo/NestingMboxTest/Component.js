/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/
import TitleList from "./TitleList"
/*自定义类*/
import './Component.less'
const pagename="NestingMboxTest"
@inject('store', 'actions')
@observer
export default class NestingMboxTest extends React.Component {
    /*state = {
        state1: ''
    }*/
    componentDidMount() {
        console.log('[NestingMboxTest] componentDidMount..')
        window.setWindowTitle("页面名称")
    }
    render() {
        const { store, actions } = this.props;
        const mystore = store["store"+pagename];
        // const { actionsTemplate} = actions;
        const {tip}=mystore;
        return <div className={"Components-NestingMboxTest-container"}>
                <h3>{tip}</h3>
                <TitleList/>
            </div>;
    }
    /*componentWillUnmount(){
        const { actions } = this.props;
        const { actionsTemplate} = actions;
        actionsTemplate.init()
    }*/
}