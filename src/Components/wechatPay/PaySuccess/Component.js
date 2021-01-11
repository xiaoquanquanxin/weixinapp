/*共用的*/
import React from 'react'
import {observer, inject} from 'mobx-react';

/*自定义类*/
import './Component.less'
//  图片
import paysuccessPng from './img/paysuccess.png';
import {Link} from "react-router-dom";

@inject('store', 'actions')
@observer
export default class Template extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        window.setWindowTitle("欠缴账单列表");
        const {actions} = this.props;
        const {actionsPaySuccess} = actions;
        actionsPaySuccess.getParams();
    }

    //  跳转到订单详情
    goOrderDetail(){
        const {store} = this.props;
        const {storePaySuccess} = store;
        const {params} = storePaySuccess;
        const {orderId, type} = params;
        this.props.history.push(`/wechat-pay/OrderDetail?type=${type}&orderId=${orderId}`);
    };

    render(){
        const {store, actions} = this.props;
        const {storePaySuccess} = store;
        const {params} = storePaySuccess;
        const {orderId, createTime, orderMoney} = params;
        return (
            <div className="Components-PaySuccess-container">
                <div className="pay">
                    <img src={paysuccessPng} alt=""/>
                    <p>订单支付成功</p>
                </div>
                <div className="payment-box">
                    <div className="payment-list">
                        <div>
                            <p className="paymen-name">订单号码</p>
                            <p className="payment-money">{orderId}</p>
                        </div>
                        <div>
                            <p className="paymen-name">下单时间</p>
                            <p className="payment-money">{createTime}</p>
                        </div>
                        <div>
                            <p className="paymen-name">订单金额</p>
                            <p className="payment-money">￥{orderMoney}</p>
                        </div>
                    </div>
                </div>
                <div className="goIndex">
                    <Link to={'/wechat-pay/PayIndex'}>返回首页</Link>
                </div>
                <div className="goOrderDetail" onClick={() => {
                    this.goOrderDetail();
                }}>
                    <span>查看订单</span>
                </div>
            </div>
        )
    }
}
