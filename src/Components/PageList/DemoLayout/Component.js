/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle'
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
import LayoutContainerOne from '../../pub/LayoutContainersOne';
/*当前页面用到的*/

/*自定义类*/
import './Component.less'
@inject('store', 'actions')
@observer
class DemoLayout extends React.Component {
    /*state = {
        state1: ''
    }*/
    componentDidMount() {
        //console.log('[Template] componentDidMount..')
        window.setWindowTitle("页面名称")
    }
    render() {
        const { store, actions } = this.props;
        const { storeTemplate } = store;
        //const { actionsTemplate} = actions;
        const { tip } = storeTemplate;
        return <div className={"Components-DemoLayout-container"}>
            <LayoutContainerOne>
                <div type="header">
                    <span>这是头部</span>
                </div>
                <div type="content">
                    <span>第一行</span>
                    <span>第二行</span>
                    <span>第三行</span>
                </div>
            </LayoutContainerOne>
            <div>1234555</div>
            <div>1234555</div>
            <div>1234555</div>
            <div>1234555</div>
        </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}
export default withSetTitle(DemoLayout, '布局容器');