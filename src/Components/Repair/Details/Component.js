/*共用的*/
import React from 'react';
import {observer, inject} from 'mobx-react';
/*antd-mobile*/
import {Flex, Button, WhiteSpace, WingBlank, Steps, DatePicker, List} from 'antd-mobile';

const Step = Steps.Step;
import Mybutton from '../../pub/MyButton';
/*当前页面用到的*/
import ImgZoomHOC from '../../pub/ImgZoomHOC';
/*自定义类*/
import './Component.less';
import router from '../../../router';
import {STATUS_CLASS_MAP, STATUS_MAP} from "../../../../lib/utils/const";

@ImgZoomHOC('')
@inject('store', 'actions')
@observer
export default class Details extends React.Component {
    componentDidMount(){
        window.setWindowTitle('房屋报修-详情 ');
        const {id} = this.props.match.params;
        const {actionsRepairDetails} = this.props.actions;
        actionsRepairDetails.init();
        (async () => {
            const result = await actionsRepairDetails.getWorkOrder(id);
            // result && await actionsRepairDetails.taskHistory(id);
            result && await actionsRepairDetails.progressTracking(id);
        })()
    }

    callPhoneFn(describe, makeTime){
        const reg = /1[3456789]\d{9}/;
        const match = describe.match(reg);
        if (!match || !match.length) {
            return describe;
        }
        const res = match[0];
        const result = describe.replace(res, `<a href='tel:${res}'>${res} </a>、<span>预计上门时间：${makeTime}</span>`);
        console.log(result);
        return result;
    }

    render(){
        const {store, actions, history, match} = this.props;
        const {id} = match.params;
        const {storeRepairDetails,} = store;
        const {
            repairDetaildata,
            progressTrackingList,
        } = storeRepairDetails;
        const statusCodeMap = STATUS_CLASS_MAP;
        const statusMap = STATUS_MAP;
        const statusExtraMap = [0, '受理', '接单', '完工', '结束', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '备注',];
        return (
            <div className={'Components-Repair-Details-container'}>
                {/*报修详情*/}
                <Flex>
                    <div className={'Components-Repair-Details-container'}>
                        <article className="repair-details">
                            <section className={'repair-item relative_div'}>
                                <p className='detail-room-name'>报修房间 ：{repairDetaildata.roomName} </p>
                                <p style={{paddingRight: '40px'}}>预约时间 ：{repairDetaildata.appointmenttime}</p>
                                <div className={'content'}>报修内容 ：{repairDetaildata.problemdescription}</div>
                                <div className={'m_imgtop10'}>
                                    {
                                        repairDetaildata.imgList && repairDetaildata.imgList.map((v, i) => {
                                            return (
                                                <span key={i} onClick={() => {
                                                    this.props.onClick(v);
                                                }}>
												<img src={v} alt=''/>
                                            </span>
                                            );
                                        })
                                    }
                                </div>
                                <div className={'createTime'}>
                                    <p>提交时间：{repairDetaildata.createtime}</p>
                                    <p>报事单号：{repairDetaildata.code}</p>
                                </div>
                                <div className={`status-flag-g ${statusCodeMap[repairDetaildata.status]}`}>
                                    {statusMap[repairDetaildata.status]}
                                </div>
                            </section>
                        </article>
                    </div>
                </Flex>
                {/*路由*/}
                {
                    statusCodeMap[repairDetaildata.status] !== 's1' &&
                    progressTrackingList && progressTrackingList.map((v, i) => {
                        return (
                            <div className={'Components-Repair-Details-WorkRouter-container '} key={i}>
                                <Flex className={'breadNav'}>
                                    <nav>报事内容：{v.workDescription}</nav>
                                </Flex>
                                <WhiteSpace size="lg"/>
                                <WhiteSpace size="lg"/>
                                <div className={'Components-setp-container'}>
                                    <Steps current={1}>
                                        {
                                            v.workRouteInfo && v.workRouteInfo.map((vv, ii) => {
                                                return (
                                                    <Step key={ii}
                                                          icon={
                                                              <span className={'status'}>{
                                                                  statusExtraMap[vv.routeStatus]
                                                              }</span>
                                                          }
                                                          description={
                                                              <div className={'steps'}>
                                                                  <p className={'content'}>{vv.creatTime}</p>
                                                              </div>
                                                          }
                                                          title={
                                                              <div
                                                                  className={`routerTitle ${ii === 1 && 'routerTitlewidth'}`}>
                                                                  <span
                                                                      dangerouslySetInnerHTML={{__html: this.callPhoneFn(vv.describe, vv.makeTime)}}/>
                                                              </div>
                                                          }
                                                    />
                                                );
                                            })
                                        }
                                    </Steps>
                                </div>
                            </div>
                        );
                    })
                }
                {
                    statusCodeMap[repairDetaildata.status] === 's1' &&
                    (
                        <div className={'Components-Repair-Details-Notice-container'}>
                            <p>您提交的报修单正在处理，看到后我们派人第一时间与您联系，如有疑问请拨打400电话。 </p>
                            {/* <div className={'tel'} ><div key={1}>400电话：<span className={'blue'}>400-2333-432</span></div></div > */}
                        </div>
                    )
                }
                <WhiteSpace size="lg"/><WhiteSpace size="lg"/>
                <WingBlank>
                    {
                        +repairDetaildata.status >= 3 &&
                        (
                            <Mybutton callback={() => {
                                history.push(`/OwnerComment/${id}/${repairDetaildata.evaluate}?reportResponsibility=${repairDetaildata.reportResponsibility}`);
                            }} type="blue" label={repairDetaildata.evaluate === 1 ? '查看评价' : '评 价'}/>
                        )
                    }
                </WingBlank>
            </div>
        );
    }
}
