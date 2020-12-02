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
class __C extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className={"Components-noMbox-container"}>
            <WingBlank>
                <Button type="warning">不使用mbox的组件</Button>
            </WingBlank>

        </div>
    }
}
export default withSetTitle(__C, '页面1')