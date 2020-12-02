/*共用的*/
import React from 'react'
//import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react';
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/
import CURDListItem from '../CURDListItem/Component.js'
/*自定义类*/
import './Component.less'
@inject('store', 'actions')
@observer
export default class TemplateComponentMbox extends React.Component {
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
    add(){
        const { actions } = this.props;
        const { actionsCURDList } = actions;
        actionsCURDList.add({title:"",type:"c"})
    }
    render() {
        const { store, actions } = this.props;
        const { storeCURDList} = store;
        //const { actionsTemplateComponentMbox} = actions;
        const {list}=storeCURDList;
        // console.log("render list...",JSON.stringify(list))
        return <div className={"Components-CURDList-container"}>
            {list.map((data,index)=>{
                return <CURDListItem key={index} mboxindex={index}/>
            })}
            <Button type="primary" onClick={this.add.bind(this)}>增加</Button>
            </div>;
    }
}