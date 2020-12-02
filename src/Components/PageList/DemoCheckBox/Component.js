/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle'
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/
import CheckBoxItem from "../../pub/CheckBoxItem"
import ActiveStaffItem from "../../pub/ActiveStaffItem"
/*自定义类*/
import './Component.less'
@inject('store', 'actions')
@observer
class DemoCheckBox extends React.Component {
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
                    <div>复选框</div>
                    <CheckBoxItem>
                        <ActiveStaffItem isedit={true} hasIdCard={false}/>
                    </CheckBoxItem>
               </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}
export default withSetTitle(DemoCheckBox, '布局容器');