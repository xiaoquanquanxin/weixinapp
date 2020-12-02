/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle'
import PropTypes from 'prop-types'
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/
import imgLogo from './logo.png';
/*自定义类*/
import './Component.less'
const pageTitle='当前页面标题';
/*@inject('store', 'actions')
@observer*/
class __C extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        /*拆分store,actions*/
        /* const { store, actions } = this.props;
         const { storeCounter } = store;
         const { actionsCounter } = actions;*/

        return <div className={"Components-ImgTest-container"}>
            <WingBlank>
                <Button type="warning" onClick={()=>this.props.history.push('/Demo/AllPageList')}>返回</Button>
            </WingBlank>
            <h3>插入图片方式1</h3>
            <img src={imgLogo}/>
            <h3>插入图片方式2</h3>
            <img src={require('./logo.png')}/>
            <h3>css定义图片背景</h3>
            <div className="imgbak"></div>
        </div>
    }
}
//React组件属性类--propTypes https://blog.csdn.net/yangjian_666/article/details/50579459
/*__C.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
}*/
export default withSetTitle(__C,pageTitle)