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
        window.setWindowTitle("微信支付")
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
                </div>
            </div>
            <div className="payment right-button prepayment">
                <div onClick={() => {
                    this.goPage('/wechat-pay/PaymentList');
                }}>
                    预缴费用
                </div>
            </div>
            <div className="payment right-button paymentRecords">
                <div onClick={() => {
                    this.goPage('/wechat-pay/PaymentList');
                }}>
                    缴费记录
                </div>
            </div>
        </div>;
    }
}
