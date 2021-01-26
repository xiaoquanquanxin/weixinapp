/*共用的*/
import React from 'react'
import {observer, inject} from 'mobx-react';

/*自定义类*/
import './Component.less'
import {Modal, Picker, Toast} from "antd-mobile";
import calcTimeUint from './img/calcTimeUint.png';

@inject('store', 'actions')
@observer
export default class Template extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        window.setWindowTitle("预缴账单");
        const {actions} = this.props;
        const {actionsPrepayment} = actions;
        actionsPrepayment.getRoomList()
    }

    //  跳转
    goPayment(){
        const {actions} = this.props;
        const {actionsPrepayment} = actions;
        const url = actionsPrepayment.goPayment();
        console.log(url);
        this.props.history.push(url);
    }

    render(){
        const {actions, store} = this.props;
        const {actionsPrepayment} = actions;
        const {storePrepayment} = store;

        const {
            paymentList, queryFeeitemDetails,
            customPickerShow, ratesPickerShow, customFeeItem, currentRoom,
            roomList, currentFee, feeList, feeCharge,
            activeIndex
        } = storePrepayment;
        return (
            <div className="Components-Prepayment-container">
                <div className="container">
                    <Picker
                        data={roomList}
                        cols={1}
                        value={[currentRoom.roomId]}
                        onOk={(v) => {
                            //  赋值给选择的room
                            roomList.forEach((item, index) => {
                                if (item.roomId === v[0]) {
                                    storePrepayment.currentRoom = item;
                                }
                            });
                            //  请求数据
                            //  获取当前房间下有没有预缴订单
                            actionsPrepayment.getFeeItem();
                        }}
                    >
                        <div className="header world bg">房间: {currentRoom.roomName}</div>
                    </Picker>

                    <Picker
                        data={feeList}
                        cols={1}
                        value={[currentFee.itemSourceName]}
                        onOk={(v) => {
                            //  赋值给选择的room
                            feeList.forEach((item, index) => {
                                if (item.itemSourceName === v[0]) {
                                    storePrepayment.currentFee = item;
                                }
                            });

                            //  请求数据
                            //  获取当前房间下有没有预缴订单
                            actionsPrepayment.setCurrentFee();
                        }}
                    >
                        <div className="payment line">
                            <div>预缴费项</div>
                            <div className="bg payment-name">{currentFee.label}</div>
                        </div>
                    </Picker>

                    <div className="payment-box">
                        <div className="payment-list line">
                            <h3>预缴余额</h3>
                            <div>
                                <p className="paymen-name">{currentFee.label}</p>
                                <p className="payment-money">￥{(+queryFeeitemDetails.balanceAmount).toFixed(2)}</p>
                            </div>
                            {queryFeeitemDetails.enoughDeductionDate ? (
                                <div>
                                    <p className="paymen-name">暂存款可扣至</p>
                                    <p className="payment-money">{queryFeeitemDetails.enoughDeductionDate}</p>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className="payment line">
                        <div>费项缴纳</div>
                        <div className="bg payment-name" onClick={() => {
                            storePrepayment.ratesPickerShow = true;
                        }}>收费标准
                        </div>
                    </div>
                    {(currentFee.calcTimeUint) ? (
                        <div className='content'>
                            {(+currentFee.calcTimeUint === 2) ? (
                                <div className="pay">
                                    {(paymentList.length) ?
                                        (<div className="pay-list">
                                            {paymentList.map((item, index) => {
                                                return (
                                                    <div key={index}
                                                         className={`${queryFeeitemDetails.hasOutstandingBill ? 'isFrozen' : ''}`}>
                                                        {(item === customFeeItem) ? (
                                                            <div className={`${index === activeIndex ? 'checked' : ''}`}
                                                                 data-msg='自定义的块'
                                                                 onClick={() => {
                                                                     actionsPrepayment.customClick(index);
                                                                 }}
                                                            >
                                                                {(item.paymentMonth) ? (
                                                                    <p className="month">
                                                                        {item.paymentMonth}个月<span>自定义</span>
                                                                    </p>
                                                                ) : (
                                                                    <p className="month">
                                                                        自定义
                                                                    </p>
                                                                )}
                                                                {(item.paymentMonth) ? (
                                                                    <p className="price">
                                                                        <span>¥</span>{item.perUnit.toFixed(2)}</p>
                                                                ) : null}
                                                            </div>
                                                        ) : (
                                                            <div className={`${index === activeIndex ? 'checked' : ''}`}
                                                                 data-msg='普通列表块'
                                                                 onClick={() => {
                                                                     actionsPrepayment.choosePayment(index);
                                                                 }}
                                                            >
                                                                <p className="month">{item.paymentMonth}个月</p>
                                                                <p className="price">
                                                                    <span>¥</span>{item.perUnit.toFixed(2)}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>) : (<div className="calcTimeUint">
                                                <img src={calcTimeUint} alt=''/>
                                                <p>该费项没有收费设置</p>
                                            </div>
                                        )
                                    }
                                </div>
                            ) : (
                                <div className="calcTimeUint">
                                    <img src={calcTimeUint} alt=''/>
                                    <p>抱歉，暂不支持“季度”和年预缴</p>
                                </div>
                            )}
                            {queryFeeitemDetails.hasOutstandingBill ?
                                (
                                    <div className="footer is-freeze">您有已出账单未结算，不能预缴</div>
                                ) : (
                                    <div className={`footer ${customPickerShow ? 'is-custom' : ''}`} onClick={() => {
                                        this.goPayment();
                                    }}> 立即缴费 </div>
                                )
                            }
                        </div>
                    ) : null}
                    {/*收费标准*/}
                    {(ratesPickerShow) ? (
                        <div onClick={() => {
                            storePrepayment.ratesPickerShow = false;
                        }}
                             className={`rates olay ios-select-widget-box one-level-box fadeInUp ${!ratesPickerShow ? 'fadeOutDown' : ''}`}
                        >
                            <div className="layer" style={{height: '194px'}} onClick={(e) => {
                                e.stopPropagation();
                            }}>
                                <header className="iosselect-header">
                                    <a onClick={() => {
                                        storePrepayment.ratesPickerShow = false;
                                    }}
                                       className="sure">取消</a>
                                    <div className="iosSelectTitle">收费标准</div>
                                </header>
                                <section className="iosselect-box">
                                    <div className="one-level-contain oneLevelContain">
                                        <ul className="select-one-level"
                                            style={{transform: 'translate(0px, 0px) translateZ(0px)'}}>
                                            {
                                                feeCharge.map((item, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <p>{item.startDate} 至 {item.endDate}</p>
                                                            <p>{item.amount}元</p>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </section>
                            </div>
                        </div>
                    ) : null}
                    {/*自定义*/}
                    {customPickerShow ? (
                        <div
                            className={`custom olay ios-select-widget-box one-level-box fadeInUp ${!customPickerShow ? 'fadeOutDown' : ''}`}
                            onClick={() => {
                                actionsPrepayment.closeCustomFee();
                            }}
                        >
                            <div className="layer" style={{height: '2.48rem', background: '#FFFFFF'}}
                                 onClick={(e) => {
                                     e.stopPropagation();
                                 }}>
                                <header className="iosselect-header">
                                    <span style={{lineHeight: '44px'}}
                                          onClick={() => {
                                              actionsPrepayment.closeCustomFee();
                                          }}
                                          className="sure"/>
                                    <div className="iosSelectTitle">费用预算</div>
                                </header>
                                <section className="iosselect-box">
                                    <div className="one-level-contain oneLevelContain"
                                         style={{fontSize: '16px', height: '150px'}}>
                                        <ul className="select-one-level"
                                            style={{transform: 'translate(0px, 0px) translateZ(0px)'}}>
                                            <li>
                                                <p>预缴月数</p>
                                                <p className="choose-price">
                                                    <span onClick={() => {
                                                        if (customFeeItem.paymentMonth === 1) {
                                                            return;
                                                        }
                                                        actionsPrepayment.changeCustomMonth(customFeeItem.paymentMonth - 1);
                                                    }}
                                                          style={{
                                                              opacity: ((customFeeItem.paymentMonth === 1 || !customFeeItem.paymentMonth || isNaN(customFeeItem.paymentMonth)) ? 0.5 : 1)
                                                          }}
                                                          className="monthRed"
                                                    />
                                                    <span className="price">
                                                        <input type="text" value={customFeeItem.paymentMonth}
                                                               onChange={(value) => {
                                                                   actionsPrepayment.changeCustomMonth(value.currentTarget.value);
                                                               }}
                                                        />
                                                    </span>
                                                    <span onClick={() => {
                                                        if (customFeeItem.paymentMonth === queryFeeitemDetails.maxMonth) {
                                                            return;
                                                        }
                                                        actionsPrepayment.changeCustomMonth(customFeeItem.paymentMonth + 1);
                                                    }}
                                                          style={{
                                                              opacity: ((customFeeItem.paymentMonth === queryFeeitemDetails.maxMonth || !customFeeItem.paymentMonth || isNaN(customFeeItem.paymentMonth)) ? 0.5 : 1)
                                                          }}
                                                          className="monthAdd"/>
                                                </p>
                                            </li>
                                            <li>
                                                <p>实际金额</p>
                                                <p className="money">￥{customFeeItem.perUnit.toFixed(2)}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </section>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}
