/*共用的*/
import React from 'react'
//import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react';
/*antd-mobile*/
//import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/

/*自定义类*/
import './Component.less'
@inject('store', 'actions')
@observer
export default class TitleList extends React.Component {
    /*static propTypes = {
        xxxx: PropTypes.object//.isRequired
        xxxx: PropTypes.array//.isRequired,
        xxxx: PropTypes.bool//.isRequired,
        xxxx: PropTypes.func//.isRequired,
        xxxx: PropTypes.number//.isRequired,
        xxxx: PropTypes.object//.isRequired,
        xxxx: PropTypes.string//.isRequired,
        xxxx: PropTypes.symbol//.isRequired
    }*/
    /*state = {
        state1: ''
    }*/
    render() {
        const { store, actions } = this.props;
        const { storeTemplateComponentMbox} = store;
        //const { actionsTemplateComponentMbox} = actions;
        const {tip}=storeTemplateComponentMbox;
        return <div className={"Components-TemplateComponentMbox-container"}>
                <h3>{tip}</h3>
            </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}