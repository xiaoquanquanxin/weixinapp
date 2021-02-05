/*共用的*/
import React from 'react'
import {observer, inject} from 'mobx-react';

/*自定义类*/
import './Component.less'
//  图片
import noMessagePng from './img/noMessage.png';
import {List, Picker, Toast} from "antd-mobile";

@inject('store', 'actions')
@observer
export default class Template extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        window.setWindowTitle("欠缴账单列表");
        const {actions} = this.props;
        const {actionsPaymentList} = actions;
        actionsPaymentList.getRoomList();
    }

    //  跳转到支付页面
    goConfirmPayment(){
        const {actions, store} = this.props;
        const {storePaymentList} = store;
        const {actionsPaymentList} = actions;
        const billIDsList = actionsPaymentList.goConfirmPayment();
        const {roomId} = storePaymentList.currentRoom;
        // console.log(billIDsList);
        // console.log(roomId);
        this.props.history.push(`/wechat-pay/ConfirmPayment?billIDsList=${billIDsList}&roomId=${roomId}`);
    };


    render(){
        const {store, actions} = this.props;
        const {storePaymentList} = store;
        const {actionsPaymentList} = actions;
        const {
            currentRoom, totalMoney, billName, active, isFrozen, allChecked, totalMoneyForPay, roomList,
            paidInList, paidOutListFilter, costPickerList
        } = storePaymentList;
        return (
            <div className="Components-PaymentList-container">
                <div className="container">
                    <div className="banner">
                        <p>¥{totalMoney.toFixed(2)}</p>
                        <span>未缴总金额</span>
                        <Picker
                            data={roomList}
                            cols={1}
                            value={[storePaymentList.currentRoom.roomId]}
                            onOk={(v) => {
                                //  赋值给选择的room
                                storePaymentList.roomList.forEach((item, index) => {
                                    if (item.roomId === v[0]) {
                                        storePaymentList.currentRoom = item;
                                    }
                                });
                                //  请求数据
                                if (active) {
                                    //  未缴账单
                                    actionsPaymentList.setAct();
                                } else {
                                    //  已缴账单
                                    actionsPaymentList.setUnAct();
                                }
                            }}
                        >
                            <div className="world text-overflow">房间：{currentRoom.roomName}</div>
                        </Picker>
                    </div>
                    <div className="nav line">
                        <div>
                            <a className={`${active ? 'active' : ''} `} onClick={() => {
                                //  不重复点击
                                if (active) {
                                    return;
                                }
                                actionsPaymentList.setAct()
                            }}>未缴账单</a>
                        </div>
                        <div>
                            <a className={`${!active ? 'active' : ''} `} onClick={() => {
                                //  不重复点击
                                if (!active) {
                                    return;
                                }
                                actionsPaymentList.setUnAct();
                            }}>已缴账单</a>
                        </div>
                    </div>
                    {(() => {
                        //  未缴账单
                        if (active) {
                            return (
                                <div className="content">
                                    <div className="screening">
                                        <div>{billName}</div>
                                        <Picker
                                            data={costPickerList}
                                            cols={1}
                                            value={[storePaymentList.billName]}
                                            onOk={(v) => {
                                                actionsPaymentList.feeItemScreening(v);
                                            }}>
                                            <div id="showBank">费项筛选</div>
                                        </Picker>
                                    </div>
                                    <div className="paid-box">
                                        {(() => {
                                            //  console.log(paidOutListFilter.length);
                                            if (paidOutListFilter.length) {
                                                return (
                                                    <div className="form-item item-line"
                                                         style={{marginBottom: '1.3rem'}}>
                                                        <div className={`box ${isFrozen ? 'isFrozen' : ''}`}>
                                                            <PaymentRender
                                                                actionsPaymentList={actionsPaymentList}
                                                                dataMsg='未缴账单'
                                                                paidData={paidOutListFilter}
                                                                isFrozen={isFrozen}
                                                                paidName='paidOut'
                                                            />
                                                        </div>
                                                        {(() => {
                                                            if (!isFrozen) {
                                                                return null;
                                                            }
                                                            return (
                                                                <div className="freeze"
                                                                     onClick={() => {
                                                                         this.props.history.push('/wechat-pay/PaymentRecords');
                                                                     }}
                                                                >您有账单未支付，点击这里去支付或取消订单>></div>
                                                            )
                                                        })()}
                                                        <div
                                                            className={`box-footer ${isFrozen ? 'box-shadow' : ''}`}>
                                                            <div className="allCheck">
                                                                <div
                                                                    className={`all-box ${isFrozen ? 'isFrozen' : ''}`}>
                                                                    <label onClick={() => {
                                                                        actionsPaymentList.allCheck();
                                                                    }}>
                                                                        <span
                                                                            className={`checkbox ${allChecked ? 'isChecked' : ''}`}/>全选:
                                                                    </label>
                                                                    <b>¥ {totalMoneyForPay.toFixed(2)}</b>
                                                                </div>
                                                                {
                                                                    (isFrozen || +totalMoneyForPay === 0) ? (
                                                                        <div className="payment is-freeze">立即缴费</div>
                                                                    ) : (
                                                                        <div className="payment" onClick={() => {
                                                                            this.goConfirmPayment();
                                                                        }}>立即缴费
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return (
                                                <NoBillPaidYetRender noMessagePng={noMessagePng} active={active}/>
                                            )
                                        })()}
                                    </div>
                                </div>
                            )
                        }
                        return (
                            // 已缴账单
                            <div className="content">
                                {(() => {
                                    //  console.log(paidInList.length);
                                    if (paidInList.length) {
                                        return (
                                            <div style={{overflowY: 'auto', height: '100%'}}>
                                                <PaymentRender
                                                    actionsPaymentList={actionsPaymentList}
                                                    dataMsg='已缴账单'
                                                    paidData={paidInList}
                                                    isFrozen={isFrozen}
                                                />
                                            </div>
                                        )
                                    }
                                    return (
                                        <NoBillPaidYetRender noMessagePng={noMessagePng} active={active}/>
                                    )
                                })()}
                            </div>
                        )
                    })()}
                    {/*房间弹框组件*/}
                </div>
            </div>
        )
    }
}

//  暂无已缴账单
const NoBillPaidYetRender = ({noMessagePng, active}) => {
    return (
        <div className="no-message">
            <img src={noMessagePng} alt=''/>
            <p>{active ? '暂无未缴账单' : '暂无已缴账单'}</p>
        </div>
    )
};

//  payment 组件
const PaymentRender = ({paidData, dataMsg, isFrozen, paidName, actionsPaymentList}) => {
    console.log('更新');
    return (
        <div className="form-item payment-component">
            <ul>
                {
                    paidData.map((item, index) => {
                        return (
                            <li key={index} className="line">
                                <div className="year line">{item.billMonth}</div>
                                {
                                    item.billDetails.map((_item, _index) => {
                                        return (
                                            <div key={_item.billIds}
                                                 className={`paid-cont ${isFrozen}`}
                                                 onClick={() => {
                                                     actionsPaymentList.choosepaid(item, index, _item, _index);
                                                 }}>
                                                <div>
                                                    {(() => {
                                                        if (paidName === 'paidOut') {
                                                            // console.log(JSON.parse(JSON.stringify(_item)));
                                                            return (
                                                                <span
                                                                    className={`checkbox ${_item.checked ? 'isChecked' : ''}`}/>
                                                            )
                                                        }
                                                    })()}
                                                    <div className="world">
                                                        {_item.paidName}
                                                        {!(+_item.isFrozen) ? (
                                                            <span className="border">冻结</span>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="paid-pay">￥{_item.paidTotal.toFixed(2)}</div>
                                            </div>
                                        )
                                    })
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};
