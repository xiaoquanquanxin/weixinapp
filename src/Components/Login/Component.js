/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle'
/*antd-mobile*/
import { List, WhiteSpace, WingBlank, InputItem} from 'antd-mobile';
/*当前页面用到的*/
import MyButton from "../pub/MyButton"
/*自定义类*/
import './Component.less'
@inject('store', 'actions')
@observer
export default class Template extends React.Component {
    /*state = {
        state1: ''
    }*/
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount() {
        //console.log('[Template] componentDidMount..')
        window.setWindowTitle("登录")
    }
    //登陆
    login(){

    }
    //前往注册页
    goToRegister(){
        this.props.history.push("/Register");
    }
    //找回密码
    findPassWord(){
        alert("找回密码");
    }
    render() {
        const { store, actions } = this.props;
        const { storeTemplate } = store;
        //const { actionsTemplate} = actions;
        //const {tip}=storeTemplate;
        return <div className={"Components-Login-container"}>
                    <WhiteSpace size="lg" />
                    <List>
                        <InputItem type="phone" placeholder="手机号"></InputItem>
                        <InputItem type="password" placeholder="号码"></InputItem>
                    </List>
                    <WhiteSpace size="lg" />
                    <WingBlank>
                        <MyButton callback={this.login} type="green" label="登陆" />
                        <WhiteSpace size="lg" />
                        <div>
                            <span onClick={this.goToRegister.bind(this)}>立即注册</span>
                            <span onClick={this.findPassWord.bind(this)} className={"pullright"}>找回密码</span>
                        </div>
                    </WingBlank>
                </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}