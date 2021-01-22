/*共用的*/
import React from 'react'
import {observer, inject} from 'mobx-react';

/*自定义类*/
import './Component.less'
import {Toast} from "antd-mobile";

//  订单信息
const OrderInformationRender = ({transactionid, tranDate}) => {
    return (
        <div className="payment">
            <div className="room line">订单信息</div>
            <div className="payment-box">
                <div className="payment-list pay-message line">
                    <div>
                        <p className="paymen-name">订单号码</p>
                        <p className="payment-money">{transactionid}</p>
                    </div>
                    <div>
                        <p className="paymen-name">下单时间</p>
                        <p className="payment-money">{tranDate}</p>
                    </div>
                    <div>
                        <p className="paymen-name">支付方式</p>
                        <p className="payment-money">在线支付</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

//  订单状态信息
const OrderStatusInfoRender = ({type, tranDate, spaceTime}) => {
    return (
        <div className="banner">
            <div>
                <p className="type">{type}</p>
                <p className="name">{tranDate}</p>
            </div>
            <div className="spaceTime">{spaceTime}</div>
        </div>
    )
};

//  欠缴账单-0
const OutstandingBills = ({tranStatus, minutes, seconds, memo, tranDate, roomInfo, paymentList, totalMoney, transactionid}) => {
    let type = '';
    let spaceTime = '';
    switch (+tranStatus) {
        case 0:
            type = '待支付';
            spaceTime = `${minutes}分${seconds}秒后订单自动关闭`;
            break;
        case 3:
            type = '已取消';
            spaceTime = memo;
            break;
        default:
            type = '支付成功';
            spaceTime = '感谢您使用在线缴费！';
            break;
    }
    return (
        <div className="content">
            <OrderStatusInfoRender
                data-msg='订单状态信息'
                type={type}
                tranDate={tranDate}
                spaceTime={spaceTime}
            />
            <div className="orderList">
                <div className="payment">
                    <p className="room world line">房间: {roomInfo.roomName}</p>
                    {/*欠缴订单*/}
                    <div>
                        {
                            paymentList.map((item, index) => {
                                return (
                                    <div className="payment-box"
                                         key={index}>
                                        <div className="payment-list line">
                                            <h3>【{item.billMonth}】</h3>
                                            {
                                                item.billDetails.map((_item, _index) => {
                                                    return (
                                                        <div key={_index}>
                                                            <p className="paymen-name">{_item.paidName}</p>
                                                            <p className="payment-money">￥{_item.paidTotal}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <p className="payMoney">实付：<span>¥{totalMoney}</span></p>
                    </div>
                </div>
                <OrderInformationRender
                    data-msg='订单信息'
                    transactionid={transactionid}
                    tranDate={tranDate}
                />
            </div>
        </div>
    )
};

//  预缴账单-1
const AdvancePaymentBills = ({tranStatus, minutes, seconds, memo, tranDate, roomInfo, feeName, payMoney, transactionid,}) => {
    let type = '';
    let spaceTime = '';
    //  0待支付  1支付成功  2 已取消
    switch (+tranStatus) {
        case 0:
            type = '待支付';
            spaceTime = `${minutes}分${seconds}秒后订单自动关闭`;
            break;
        case 1:
            type = '支付成功';
            spaceTime = '感谢您使用在线缴费！';
            break;
        case 2:
            type = '已取消';
            spaceTime = memo;
            break;
        case -1:
            //  初始化
            break;
        default:
            throw new Error(`错误的类型${tranStatus}`)
    }
    return (
        <div className="content">
            <OrderStatusInfoRender
                data-msg='订单状态信息'
                type={type}
                tranDate={tranDate}
                spaceTime={spaceTime}
            />
            <div className="orderList">
                <div className="payment">
                    <p className="room world line">房间: {roomInfo.roomName}</p>
                    <div className="prepay">
                        <p className="paymen-name">{feeName}</p>
                        <p className="payMoney">实付：<span>¥{payMoney}</span></p>
                    </div>
                </div>
                <OrderInformationRender
                    data-msg='订单信息'
                    transactionid={transactionid}
                    tranDate={tranDate}
                />
            </div>
        </div>
    )
};


@inject('store', 'actions')
@observer
export default class Template extends React.Component {
    componentDidMount(){
        window.setWindowTitle("订单详情");
        const {actions} = this.props;
        const {actionsOrderDetail} = actions;
        //  设置url的值
        actionsOrderDetail.setInfoByUrl();
        //  请求
        actionsOrderDetail.getOrderDetail();
    }

    //  离开页面清除定时器
    componentWillUnmount(){
        const {actions, store} = this.props;
        const {actionsOrderDetail} = actions;
        actionsOrderDetail.resetData(true);
    }

    //  取消订单
    cancellationOfOrderFn(){
        const {actions} = this.props;
        const {actionsOrderDetail} = actions;
        actionsOrderDetail.cancellationOfOrderFn();
    }

    //  去支付
    getTranStatusFn(){
        (async () => {
            const {actions, store} = this.props;
            const {actionsOrderDetail} = actions;
            const {storeOrderDetail} = store;
            //  这与直接支付不同，需要先验证是否已经支付、是否已经过期等等
            const result = await actionsOrderDetail.getTranStatusFn();
            console.log(result);
            const {orderId} = storeOrderDetail;
            //  下单失败
            if (result === false) {
                Toast.info('下单失败', 1);
                //  重新定时
                actionsOrderDetail.getTime();
                return;
            }
            if (result === true) {
                console.log('可以跳转了');
                Toast.hide();
                debugger;
                const {updateTime, type, totalMoney: orderMoney,} = storeOrderDetail;
                this.props.history.push(`/wechat-pay/PaySuccess?orderId=${orderId}&orderMoney=${orderMoney}&updateTime=${updateTime}&type=${type}`);
            }
            //  其他情况在具体的await里处理，他们中的大部分不需要跳转
        })()
    }

    render(){
        const {store} = this.props;
        const {storeOrderDetail} = store;
        const {
            type,
            tranStatus,
            minutes,
            seconds,
            memo,
            tranDate,
            feeName,
            payMoney,
            paymentList,
            totalMoney,
            roomInfo,
            transactionid,
        } = storeOrderDetail;
        // console.log(`type:${type}, tranStatus:${tranStatus},minutes:${minutes}, seconds:${seconds}, memo:${memo},tranDate:${tranDate}, feeName:${feeName}, payMoney:${payMoney}, paymentList:${paymentList}, totalMoney`);
        return (
            <div className="Components-OrderDetail-container">
                {
                    (+type === 0) ? (
                        // 欠缴账单
                        <OutstandingBills
                            tranStatus={tranStatus} minutes={minutes} seconds={seconds} memo={memo}
                            tranDate={tranDate} roomInfo={roomInfo} paymentList={paymentList}
                            totalMoney={totalMoney} transactionid={transactionid}
                        />) : (
                        // 预交账单
                        <AdvancePaymentBills
                            tranStatus={tranStatus} minutes={minutes} seconds={seconds} memo={memo}
                            tranDate={tranDate} roomInfo={roomInfo} feeName={feeName} payMoney={payMoney}
                            transactionid={transactionid}
                        />
                    )
                }
                {
                    // 底部按钮
                    (+tranStatus === 0) ? (<div className="footer">
                        <div className="cancel" onClick={() => {
                            this.cancellationOfOrderFn();
                        }}>取消订单
                        </div>
                        <div className="gopay" onClick={() => {
                            alert('重新缴费同一单，接口可能待完善');
                            this.getTranStatusFn();
                        }}>去支付
                        </div>
                    </div>) : null
                }
            </div>
        )
    }
}
