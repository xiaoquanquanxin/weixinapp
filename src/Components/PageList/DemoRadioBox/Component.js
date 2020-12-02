/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle'
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/
import RadioBoxItem from "../../pub/RadioBoxItem"
import ActiveStaffItem from "../../pub/ActiveStaffItem"
/*自定义类*/
import './Component.less'
@inject('store', 'actions')
@observer
class DemoCheckBox extends React.Component {
   constructor(props){
        super(props);
        this.state={
            radioItem:[
                "","",""
            ],
            radioValue:""
        }
   }
    componentDidMount() {
        //console.log('[Template] componentDidMount..')
        window.setWindowTitle("页面名称")
    }
    render() {
        const { store, actions } = this.props;
        const { storeTemplate } = store;
        //const { actionsTemplate} = actions;
        const { tip } = storeTemplate;
        console.log("下标是",this.state.radioValue);
        return <div className={"Components-DemoRadioBox-container"}>
                    <div>单选框</div>
                    {
                        this.state.radioItem.map((item,index)=>{
                            return (
                                <RadioBoxItem key={index} radioKeys={index+1} check={this.state.radioValue} onChange={(v) => { console.log("v",v);this.setState({ radioValue:v})}}>
                                    <ActiveStaffItem isedit={true} hasIdCard={false} />
                                </RadioBoxItem>
                            )
                        })
                    }
               </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}
export default withSetTitle(DemoCheckBox, '布局容器');