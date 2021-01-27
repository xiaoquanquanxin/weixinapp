/*共用的*/
import React from 'react'
import {observer, inject} from 'mobx-react';

/*自定义类*/
import './Component.less'
import {Modal, Picker, Toast} from "antd-mobile";

@inject('store', 'actions')
@observer
export default class Template extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        window.setWindowTitle("预缴确认订单");
        const {actions} = this.props;
        const {actionsConfirmPrepay} = actions;
        Toast.loading('Loading...', 3);
        //  解析参数
        actionsConfirmPrepay.init();
        //  拿房间列表
        actionsConfirmPrepay.getRoomList();
        //  拿费项列表
        actionsConfirmPrepay.getFeeItem();
    }

    //  微信支付
    goPay(){
        const {actions, store} = this.props;
        const {actionsConfirmPrepay} = actions;
        const {storeConfirmPrepay} = store;
        (async () => {
            const result = await actionsConfirmPrepay.goPay();
            console.log(result);
            //  下单失败
            if (result === false) {
                Toast.info('下单失败', 1);
                const {submitOrderData} = storeConfirmPrepay;
                const {orderCode} = submitOrderData;
                this.props.history.push(`/wechat-pay/OrderDetail?orderId=${orderCode}&type=1`);
                return;
            }
            if (result === true) {
                console.log('可以跳转了');
                Toast.hide();
                debugger;
                const {submitOrderData} = storeConfirmPrepay;
                const {orderId, orderMoney, createTime} = submitOrderData;
                this.props.history.push(`/wechat-pay/PaySuccess?orderId=${orderId}&orderMoney=${orderMoney}&createTime=${createTime}&type=1`);
            }
            //  其他情况在具体的await里处理，他们中的大部分不需要跳转
        })();
    }

    //  离开页面清除定时器
    componentWillUnmount(){
        const {store} = this.props;
        const {storeConfirmPrepay} = store;
        clearTimeout(storeConfirmPrepay.timeout);
        storeConfirmPrepay.timeout = null;
        console.log('清除定时器');
    }

    render(){
        const {actions, store} = this.props;
        const {actionsConfirmPrepay} = actions;
        const {storeConfirmPrepay} = store;

        const {
            currentRoom,
            currentFee,
            perUnit,
        } = storeConfirmPrepay;
        return (
            <div className="Components-ConfirmPrepay-container">
                <div className="container">
                    <div className="room world">{currentRoom.roomName}</div>
                    <div className="payment-list line">
                        <div>
                            <p className="paymen-name">{currentFee.label}</p>
                            <p className="payment-money">￥{(perUnit || 0).toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="footer" onClick={() => {
                        this.goPay();
                    }}>微信支付
                    </div>
                </div>
            </div>
        );
    }
}
