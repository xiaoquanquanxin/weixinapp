/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle'
import PropTypes from 'prop-types'
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/
import CURDList from "./CURDList/Component"
/*自定义类*/
import './css.less'
const pageTitle='当前页面标题';
@inject('store', 'actions')
@observer
class CURDListTest extends React.Component {
    sentData(){
        const { store, actions } = this.props;
        const { storeCURDList} = store;

        console.log("sentData:"+JSON.stringify(storeCURDList.list))
    }
    render() {
        /*拆分store,actions*/
       /* const { store, actions } = this.props;
        const { storeCounter } = store;
        const { actionsCounter } = actions;*/

        return <div className={"Components-CURDListTest-container"}>
            <CURDList/>
            <Button type="warning" onClick={this.sentData.bind(this)}>获取数据</Button>
            </div>
    }
}
export default CURDListTest