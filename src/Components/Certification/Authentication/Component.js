/*共用的*/
import React from 'react';
import {observer, inject} from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle';
/*antd-mobile*/
import {List, InputItem, WhiteSpace, WingBlank} from 'antd-mobile';
import Mybutton from '../../pub/MyButton/index';
import StatusTips from '../../pub/StatusTips/index';
/*当前页面用到的*/

/*自定义类*/
import './Component.less';
import router from '../../../router';
import constant from '../../../constant';

@inject('store', 'actions')
@observer
export default class Template extends React.Component {
    /*state = {
        state1: ''
    }*/
    componentDidMount(){
        window.setWindowTitle('登录');
        const {store, actions} = this.props;
        const {storeHouseAuthentication} = store;
        const {actionsHouseAuthentication} = actions;
    }

    submit = () => {
        let toUrl = window.getQueryString("url")
        // console.log("toUrl:",toUrl)
        let url = "";
        if (toUrl) {
            url = "?url=" + toUrl
        }
        this.props.history.replace(router.SubmitCertification + url)
    };

    render(){
        const {store, actions} = this.props;
        const {storeTemplate} = store;
        return (<div className={'Components-HouseAuthentication-container'}>
            <WhiteSpace size="lg"/>
            <WhiteSpace size="lg"/>
            <WhiteSpace size="lg"/>
            <div>
                <StatusTips
                    type={'fail'}
                    label={'您的个人资料还未完善'}
                    describe={<div className={'describe'}>
                        <p>完善个人资料（如真实姓名）能让我们更好的处理您的报事报修。</p>
                    </div>}
                /></div>
            <WhiteSpace size="lg"/>
            <WhiteSpace size="lg"/>
            <WhiteSpace size="lg"/>
            <WingBlank>
                <Mybutton callback={this.submit} type="blue" label="立即完善资料"/>
            </WingBlank>
        </div>);
    }
}
