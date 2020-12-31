/*共用的*/
import React from 'react'
import {observer, inject} from 'mobx-react';

/*自定义类*/
import './Component.less'
import {PullToRefresh} from "antd-mobile";

@inject('store', 'actions')
@observer
export default class Template extends React.Component {
    componentDidMount(){
        window.setWindowTitle("支付列表");
        this.getPropertyAdvanceHistory();
    }

    //  拿数据
    getPropertyAdvanceHistory(){
        const {actions} = this.props;
        const {actionsPaymentRecords} = actions;
        actionsPaymentRecords.getPropertyAdvanceHistory();
    }

    //  跳转
    goOrderDetail(number, type){
        //  todo    这里，拼接了参数，这可能是有问题的
        this.props.history.push(`/wechat-pay/OrderDetail?orderId=${number}&type=${type}`)
    };

    render(){
        const {store, actions} = this.props;
        const {storePaymentRecords} = store;
        const {refreshing, paymentList, actbottom, height} = storePaymentRecords;
        return <div className="Components-PaymentRecords-container">
            <PullToRefresh
                className="onRefresh"
                damping={60}
                direction='up'
                style={{
                    height,
                    overflow: 'auto',
                }}
                refreshing={refreshing}
                onRefresh={() => {
                    this.getPropertyAdvanceHistory();
                }}
                indicator={
                    {deactivate: '拉动刷新数据', activate: '释放加载数据', finish: '加载数据完成'}
                }
            >
                <div className={"list"}>
                    {
                        paymentList.map((item, index) => {
                            // orderDate: "2020-12-25 03:49:55"
                            // orderMoney: 549
                            // orderNo: "20201225174954962"
                            // orderState: "0"
                            // payFeesType: "1"
                            // payMoney: "549.00"
                            return (
                                <div className="line" key={index}
                                     onClick={() => {
                                         this.goOrderDetail(item.orderNo, item.payFeesType)
                                     }}
                                >
                                    {Number(item.payFeesType) ?
                                        (<div className="type prepay">预 {item.payFeesType}</div>)
                                        : (<div className="type payment">欠 {item.payFeesType}</div>)
                                    }
                                    <div>
                                        <h3>{Number(item.payFeesType) ? '预缴订单' : '缴费订单'}</h3>
                                        <p>下单时间：{item.orderDate}</p>
                                        <p>订单金额：¥{item.payMoney}</p>
                                    </div>
                                    <p className="pay-state">
                                        {+item.orderState === 1 ?
                                            '支付成功' :
                                            (+item.orderState === 2 ? '已取消' : '待支付')
                                        }
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
                {/*{paymentList && paymentList.length === 0 ? < div className={"actbottomgray"}>暂无数据</div> :*/}
                {/*    actbottom ? <div className={"actbottom"}>已经到底部</div> :*/}
                {/*        <div className={"actbottom"}>拉动刷新数据</div>*/}
                {/*}*/}
            </PullToRefresh>

        </div>
    }
}
