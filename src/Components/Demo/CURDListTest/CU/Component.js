/*共用的*/
import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react';
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, InputItem } from 'antd-mobile';
/*当前页面用到的*/

/*自定义类*/
import './Component.less'
@inject('store', 'actions')
@observer
export default class CU extends React.Component {
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
    state = {
        title: ''
    }
    setInputValue=(key)=>(value)=>{
        const { store } = this.props;
        const { storeCURDList} = store;
        var mboxindex=this.props.mboxindex
        let data=storeCURDList.list[mboxindex]
        data[key]=value
    }
    getData(){
        const { store } = this.props;
        var mboxindex=this.props.mboxindex
        const { storeCURDList} = store;
        //临时生成id
        var item=storeCURDList.list[mboxindex]
        var title=item.title
        var id=item.id
        return {
            title,
            id
        }
    }
    render() {
        const { store, actions } = this.props;
        const { storeCURDList} = store;
        const { actionsCURDList} = actions;
        var myStore=storeCURDList
        var myActions=actionsCURDList
        var mboxindex=this.props.mboxindex
        let data=myStore.list[mboxindex]
        let {title,type}=data;
        //const { actionsTemplateComponentMbox} = actions;
        return <div className={"Components-CU-container"}>
            <InputItem
                onChange={this.setInputValue("title")}
                value={title}
            >用户名</InputItem>
            <Button onClick={(e)=>{e.preventDefault();myActions.addData(mboxindex,this.getData())}}>保存</Button>
            </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}