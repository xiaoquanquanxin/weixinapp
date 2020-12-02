/*共用的*/
import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react';
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, InputItem  } from 'antd-mobile';
/*当前页面用到的*/

/*自定义类*/
import './Component.less'
@inject('store', 'actions')
@observer
export default class R extends React.Component {
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
    getData(){
        const { store} = this.props;
        const { storeCURDList} = store;
        var mboxindex=this.props.mboxindex
        let data=storeCURDList.list[mboxindex]
        return data
    }
    render() {
        const { store, actions } = this.props;
        const { storeCURDList} = store;
        const { actionsCURDList} = actions;
        var myStore=storeCURDList
        var myActions=actionsCURDList
        var mboxindex=this.props.mboxindex
        let data=storeCURDList.list[mboxindex]
        let {title,type}=data;
        //const { actionsTemplateComponentMbox} = actions;
        return <div className={"Components-R-container"}>
                <h3>{title}</h3>
                <Button onClick={(e)=>{e.preventDefault();myActions.gotoUpdate(this.getData())}}>修改</Button>
                <Button onClick={(e)=>{e.preventDefault();myActions.del(this.getData())}}>删除</Button>
            </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}