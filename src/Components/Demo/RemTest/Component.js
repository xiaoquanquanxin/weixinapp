/*共用的*/
import React from 'react'
import withSetTitle from 'LibComponents/withSetTitle'
/*antd-mobile*/
import { Button,WingBlank,WhiteSpace } from 'antd-mobile';
/*当前页面用到的*/
//https://github.com/ant-design/ant-design-mobile/wiki/HD
/*自定义类*/
import './Component.less'
const pageTitle='RemTest1';
class __C extends React.Component {
    render() {
        return <div className={"Components-RemTest1-container"}>
            <WingBlank>
                <Button type="warning" onClick={()=>this.props.history.push('/Demo/AllPageList')}>返回</Button>
                <WhiteSpace size="sm" />
                <Button type="warning" onClick={()=>alert(document.documentElement.clientWidth)}>获取设备宽度</Button>
                <WhiteSpace size="sm" />
                <div className={"bockWH100"}>
                </div>
            </WingBlank>

        </div>
    }
}
export default withSetTitle(__C,pageTitle)