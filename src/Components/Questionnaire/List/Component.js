/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle'
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/

/*自定义类*/
import './Component.less'
@inject('store', 'actions')
@observer
export default class Template extends React.Component {
    /*state = {
        state1: ''
    }*/
    componentDidMount() {
        //console.log('[Template] componentDidMount..')
        window.setWindowTitle("问卷调查-列表")
    }
    render() {
        const { store, actions } = this.props;
        const { storeTemplate } = store;
        //const { actionsTemplate} = actions;
        const {tip}=storeTemplate;
        return <div className={"Components-Template-container"}>
                <h3>{tip}</h3>
            </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}