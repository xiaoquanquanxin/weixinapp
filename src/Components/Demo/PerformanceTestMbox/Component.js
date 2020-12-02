/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle'
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/
import Sub1 from './Sub1'
import Sub1mbox from './Sub1mbox'
import Sub2 from './Sub2'
import Sub3 from './Sub3'
/*自定义类*/
import './Component.less'
@inject('store', 'actions')
@observer
class __C extends React.Component {
    render() {
        console.log("PerformanceTestMbox render...")
        const { store, actions } = this.props;
        const { storePerformanceTestMbox } = store;
        //const { actionsTemplate} = actions;
        const {tip,data}=storePerformanceTestMbox;
        return <div className={"Components-Template-container"}>
                <h3>{tip}</h3>
            <Button icon="check-circle-o" onClick={()=>this.changeData()}>改变Data</Button>
            <Button icon="check-circle-o" onClick={()=>this.changeTip()}>改变Tip</Button>
            <Sub1 tip={"SubP1-sub"}/>
            {/*<h3>不用修饰符是否可以拿到mbox</h3>
            <Sub2/>*/}
            <h3>直接在内部通过mbox拿store中的tip</h3>
            <Sub3/>
            <h3>循环状态Sub1</h3>
            {data.map((item,index)=>{
                return <Sub1 key={"SubP1-test-sub"+index} tip={item.title}/>
            })}
            <h3>循环状态Sub1mbox</h3>
            {data.map((item,index)=>{
                return <Sub1mbox key={"Sub1mbox-test-sub"+index} tip={item.title}/>
            })}
        </div>
    }
    changeData(){
        const { actions } = this.props;
        const { actionsPerformanceTestMbox} = actions;
        actionsPerformanceTestMbox.changeData(0,'abc')
    }
    changeTip(){
        const { actions } = this.props;
        const { actionsPerformanceTestMbox} = actions;
        actionsPerformanceTestMbox.changeTip('hehe')
    }
}
export default withSetTitle(__C, '性能测试页面mbox')