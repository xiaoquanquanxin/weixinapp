/*共用的*/
import React from 'react'
import withSetTitle from 'LibComponents/withSetTitle'
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/
import Sub1 from './Sub1'
import SubP1 from './SubP1'
/*自定义类*/
import './Component.less'
class __C extends React.Component {
    constructor(props) {
        super(props);
        let arrSubP1=[];
        for (var i=1;i<=10;i++){
            arrSubP1.push({title:"标题"+i})
        }
        this.state = {arrSubP1};
    }
    render() {
        console.log("PerformanceTest render...")
        let SubArr=[];
        for (var i=0;i<10;i++){
            SubArr.push(<Sub1 key={"sub1"+i} tip={"Sub1-"+i}/>)
        }
        return <div className={"Components-Template-container"}>
                <h3>无mobx状态测试</h3>
            <Button icon="check-circle-o" onClick={()=>this.addTest()}>改变</Button>
            <SubP1 tip={"SubP1-sub"}/>

            <h3>子组件刷新测试</h3>
            {this.state.arrSubP1.map((item,index)=>{
                return <SubP1 key={"SubP1-test-sub"+index} tip={item.title}/>
            })}<br/>
            <h3>循环多个，测性能用</h3>
            {SubArr}<br/>
            </div>;
    }
    addTest(){
        console.log('abc....')
        this.state.arrSubP1[0].title="修改1"
        this.state.arrSubP1[1].title="修改2"
        this.setState({arrSubP1:this.state.arrSubP1})
    }
}
export default withSetTitle(__C, '性能测试页面')