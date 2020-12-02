/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle'
/*antd-mobile*/
import { List, InputItem, WhiteSpace, WingBlank} from 'antd-mobile';
import Mybutton from "../pub/MyButton"
/*当前页面用到的*/

/*自定义类*/
import './Component.less'
@inject('store', 'actions')
@observer
export default class Template extends React.Component {
    /*state = {
        state1: ''
    }*/
    componentDidMount() {
        //console.log('[Template] componentDidMount..')
        window.setWindowTitle("注册")
    }
    //提交注册
    submit(){
        alert("提交注册");
    }
    getVerificationCode(){
        alert("获取验证码");
    }
    render() {
        const { store, actions } = this.props;
        const { storeTemplate } = store;
        //const { actionsTemplate} = actions;
        //const {tip}=storeTemplate;
        return  <div className={"Components-register-container"}>
                    <WhiteSpace size="lg" />
                    <List>
                        <InputItem type="phone">手机号码</InputItem>
                        <div className={"inputItem"}>
                            <InputItem type="number">验证码</InputItem>
                    <div onClick={this.getVerificationCode.bind(this)}className={"verificationButton"}>获取</div>
                        </div>
                        <InputItem type="password">密码</InputItem>
                    </List>
                    <WhiteSpace size="lg" /> 
                    <WingBlank>
                        <Mybutton callback={this.submit} type="green" label="提交注册" />
                    </WingBlank>
                </div>;
    }
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}