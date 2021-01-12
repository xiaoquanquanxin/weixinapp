/*共用的*/
import React from 'react'
import {observer, inject} from 'mobx-react';

/*自定义类*/
import './Component.less'

@inject('store', 'actions')
@observer
export default class Template extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        window.setWindowTitle("物业缴费");
        window.setWindowTitle("欠缴确认订单");
        const {actions} = this.props;
        const {actionsWeChatPayIndex} = actions;
        actionsWeChatPayIndex.userInfo();
    }

    //  跳转
    goPage(url){
        this.props.history.push(url);
    }

    render(){
        return <div className="Components-WeChatPay-container">
            <div className="banner"/>
            <div className="payment right-button paid-out">
                <div onClick={() => {
                    this.goPage('/wechat-pay/PaymentList');
                }}>
                    物业缴费
                    欠缴 - 0
                </div>
            </div>
            <div className="payment right-button prepayment">
                <div onClick={() => {
                    this.goPage('/wechat-pay/Prepayment');
                }}>
                    预缴费用
                    预交 - 1
                </div>
            </div>
            <div className="payment right-button paymentRecords">
                <div onClick={() => {
                    this.goPage('/wechat-pay/PaymentRecords');
                }}>
                    缴费记录
                </div>
            </div>
        </div>;
    }
}
