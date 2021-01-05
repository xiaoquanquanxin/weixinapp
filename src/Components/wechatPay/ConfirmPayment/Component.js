/*共用的*/
import React from 'react'
import {observer, inject} from 'mobx-react';

/*自定义类*/
import './Component.less'
import {Toast} from "antd-mobile";

@inject('store', 'actions')
@observer
export default class Template extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        window.setWindowTitle("欠缴确认订单");
        const {actions} = this.props;
        const {actionsConfirmPayment} = actions;
        actionsConfirmPayment.init();
        //  解析url参数，并拿数据
        actionsConfirmPayment.getUrlParams();
    }

    //  微信支付
    goPay(){
        const {actions, store} = this.props;
        const {actionsConfirmPayment} = actions;
        const {storeConfirmPayment} = store;
        (async () => {
            const result = await actionsConfirmPayment.goPay();
            console.log(result);
            //  下单失败
            if (result === false) {
                Toast.info('下单失败', 1);
                const {submitOrderData} = storeConfirmPayment;
                const {type, orderId} = submitOrderData;
                this.props.history.push(`/wechat-pay/OrderDetail?orderId=${orderId}&type=${type}`);
                return;
            }
            if (result === true) {
                console.log('可以跳转了');
                Toast.hide();
                this.props.history.push(`/wechat-pay/PaySuccess`);
            }
            //  其他情况在具体的await里处理，他们中的大部分不需要跳转
        })()
    };

    render(){
        const {store, actions} = this.props;
        const {storeConfirmPayment} = store;
        const {actionsConfirmPayment} = actions;
        const {currentRoom, billList, totalMoney,} = storeConfirmPayment;
        return (
            <div className='Components-ConfirmPayment-container'>
                <div className="container">
                    <div className="room world">房间：{currentRoom.roomName}</div>
                    <div className="content">
                        <div className="payment-box">
                            {billList.map((item, index) => {
                                return (
                                    <div className="payment-list line" key={index}>
                                        <h3>【{item.billMonth}】</h3>
                                        {item.billDetails.map((_item, index) => {
                                            return (
                                                <div key={_item.billIds}>
                                                    <p className="paymen-name">{_item.paidName}</p>
                                                    <p className="payment-money">￥{_item.paidTotal}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="box-shadow box-footer">
                        <div className="allCheck">
                            <div className="all-box">
                                <label>
                                    待支付:
                                </label>
                                <b>¥ {totalMoney.toFixed(2)}</b>
                            </div>
                            <div className="payment" onClick={() => {
                                this.goPay();
                            }}>微信支付
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
