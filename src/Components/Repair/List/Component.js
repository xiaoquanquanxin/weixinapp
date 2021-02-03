/*共用的*/
import React from 'react';
import {observer, inject} from 'mobx-react';
/*antd-mobile*/
import {Flex, WhiteSpace, Tabs, PullToRefresh} from 'antd-mobile';
import './Component.less';
import phoneimg from "../img/phone.png";
import addimg from "../img/add.png";
import {STATUS_CLASS_MAP, STATUS_MAP} from "../../../../lib/utils/const";
import noMessage from "../../wechatPay/PaymentRecords/img/noMessage.png";
/*当前页面用到的*/
/*自定义类*/
@inject('store', 'actions')
@observer
export default class RepairList extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        window.setWindowTitle('房屋报修-列表');
        const {store, actions} = this.props;
        const {actionsRepairList} = actions;
        const {storeRepairList} = store;
        actionsRepairList.init();
        actionsRepairList.getHachiUserInfoByRoom(this.props);
    }

    render(){
        const {store, actions, history} = this.props;
        const {storeRepairList} = store;
        const {actionsRepairList} = actions;
        const {repairList, refreshing} = storeRepairList;
        const {onRefreshfun} = actionsRepairList;
        const ste = STATUS_MAP;
        const stu = STATUS_CLASS_MAP;

        //状态，1~3 待受理 ，4 处理中 ，5 待评价 6~7已完成
        return (
            <div className={'Components-Repair-List-container'}>
                <PullToRefresh
                    damping={100}
                    direction={'up'}
                    refreshing={refreshing}
                    style={{
                        height: '100vh',
                        overflow: 'auto',
                    }}
                    onRefresh={() => {
                        onRefreshfun()
                    }}
                >
                    <div className={'Repair-list'}>
                        {
                            repairList && repairList.length ? (
                                repairList.map((v, i) => {
                                    return (
                                        <div className={"listitem"} key={i} onClick={() => {
                                            history.push(`RepairDetails/${v.id}`)
                                        }}>
                                            <p className='list-room-name'>{v.roomName + v.roomName}</p>
                                            <div className={"pad"}>
                                                <div className={"orderTime"}>预约时间：{v.appointmentTime}</div>
                                                <div className={"orderTime text"}>报修内容：{v.problemdescription}</div>
                                            </div>
                                            <Flex justify="between" className={"time"}>
                                                <Flex.Item>{v.createtime}</Flex.Item>
                                                <Flex.Item>
                                                    <div style={{textAlign: 'right'}}>来源：{v.receptionMethod}</div>
                                                </Flex.Item>
                                            </Flex>
                                            <div className={`state ${stu[v.status]}`}>{ste[v.status]}</div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="no-message">
                                    <img src={noMessage} alt=''/>
                                    <p>暂无报修记录</p>
                                </div>
                            )
                        }
                    </div>
                </PullToRefresh>
                {/*按纽*/}
                <div className={'submit-btn'} style={{display: 'none'}}>
                    <div className={"btn"} onClick={() => {
                        history.push('/ComplaintSuggestions?phone=1')
                    }}>
                        <img src={phoneimg}/>
                    </div>
                    <div className={"btn"} onClick={() => {
                        history.push('/AddRepair/1')
                    }}>
                        <img src={addimg}/>
                    </div>
                    {/* <MyButton callback={this.submit.bind(this)} type={'blueButton'} label={'新 增'} /> */}
                </div>
            </div>
        );
    }
}
