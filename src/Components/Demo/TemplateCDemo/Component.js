/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
/*antd-mobile*/
//import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/
import TemplateComponent from '../TemplateComponent'
//这样引用会报错：import TemplateComponentMbox from '../TemplateComponentMbox'
import TemplateComponentMbox from '../TemplateComponentMbox/Component'
/*自定义类*/


@inject('store', 'actions')
@observer
export default class TemplateCDemo extends React.Component {
    componentDidMount() {
        //console.log('[TemplateCDemo] componentDidMount..')
        window.setWindowTitle("页面名称")
    }
    render() {
        const { store, actions } = this.props;
        const { storeTemplateCDemo} = store;
        //const { actionsTemplateCDemo} = actions;
        const {tip}=storeTemplateCDemo;



        return <div>
                <h3>{tip}</h3>
            <TemplateComponent/>
            <TemplateComponentMbox/>
            </div>;
    }
}