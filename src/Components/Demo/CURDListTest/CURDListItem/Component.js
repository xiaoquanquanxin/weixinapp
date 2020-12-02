/*共用的*/
import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react';
/*antd-mobile*/
//import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/
import CU from "../CU/Component"
import R from "../R/Component"
/*自定义类*/
import './Component.less'
@inject('store', 'actions')
@observer
export default class CURDListItem extends React.Component {
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
    static propTypes = {
        mboxindex: PropTypes.number.isRequired,
     }
    /*state = {
        state1: ''
    }*/
    render() {
        const { store } = this.props;
        const { storeCURDList} = store;
        var mboxindex=this.props.mboxindex
        let data=storeCURDList.list[mboxindex]
        let {type}=data;
        //const { actionsTemplateComponentMbox} = actions;
        return <div className={"Components-CURDListItem-container"}>
            {type =="c"&&<CU mboxindex={mboxindex}/>}
            {type =="u"&&<CU mboxindex={mboxindex}/>}
            {type =="r"&&<R mboxindex={mboxindex}/>}
            </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}