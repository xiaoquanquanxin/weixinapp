/*
模板
不需要noMbox功能
*/
/*共用的*/
import React from 'react'
/*antd-mobile*/
//import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/

/*自定义类*/
import './Component.less'
export default class TemplateNoMbox extends React.Component {
    componentDidMount() {
        //console.log('[TemplateNoMbox] componentDidMount..')
        window.setWindowTitle("页面名称")
    }
    /*state = {
        state1: ''
    }*/
    render() {
        return <div className={"Components-TemplateNoMbox-container"}>
            <h3>模板-不需要noMbox功能页面</h3>
        </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}