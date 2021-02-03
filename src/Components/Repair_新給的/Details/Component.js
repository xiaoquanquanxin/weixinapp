/*共用的*/
import React from 'react';
import {observer, inject} from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle';
/*antd-mobile*/
import {Flex, Button, WhiteSpace, WingBlank, Steps, DatePicker, List} from 'antd-mobile';

const Step = Steps.Step;
import WorkDeatils from './WorkDetails/Component';
import Notice from './Notice/Component';
import WorkRouter from './WorkRouter/Component';
import Mybutton from '../../pub/MyButton';
import StatusFlag from '../../pub/StatusFlag';
import tel from '../img/tel.png';
import tempImg from '../img/temp.png';
// import temp from './temp.png'
import StepsList from '../../pub/Steps';
import {IconStar} from '../OwnerComment/IconStar/Component';
/*当前页面用到的*/
import ImgZoomHOC from '../../pub/ImgZoomHOC';
/*自定义类*/
import './Component.less';
import router from '../../../router';

@ImgZoomHOC('')
@inject('store', 'actions')
@observer
export default class Details extends React.Component {
    // state = {
    // 	arrowStatus: true
    // };

    componentDidMount(){
        window.setWindowTitle('房屋报修-详情 ');
        //console.log(111, this.props.match.params.id)

        this.props.actions.actionsRepairDetails.repairDetailfun(this.props.match.params.id);
    }

    // submit = () =>{
    // 	 this.props.history.push(`${router.OwnerComment[0]}/${this.props.match.params.type}/${this.props.match.params.status}`)
    // };

    render(){

        // const objCss={
        // 	height:'100vh',
        // 	overflow: 'hidden'
        // };
        // const objCss1={  style={this.props.store.storeRepairDetails.flag ? objCss: objCss1}
        // 	height:'100vh',
        // };this.props.match.params.id
        const {store, actions, history} = this.props;
        const {storeRepairDetails} = store;
        const {actionsRepairDetails} = actions;
        const {repairDetaildata} = storeRepairDetails;
        //const { submit } = actionsRepairDetails;
        //const renderTel=[<div key={1}>400电话：<span className={'blue'}>400-2333-432</span></div>];
        //const { actionsTemplate} = actions;
        //const { tip } = storeTemplate;状态，1~3 待受理 ，4 处理中 ，5 待评价 6~7已完成
        let statusCodeMap = [0, 's1', 's1', 's1', 's2', 's3', 's4', 's4'];
        let statusMap = [0, '待受理', '待受理', '待受理', '处理中', '待评价', '已评价', '已评价'];
        let statusExtraMap = [0, '受理', '接单', '完工', '结束', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '备注',];

        return <div className={'Components-Repair-Details-container'}>
            {/*报修详情*/}
            <Flex>
                <div className={'Components-Repair-Details-container'}>
                    <article className="repair-details">
                        <section className={'repair-item relative_div'}>
                            <p>预约时间 ：{repairDetaildata.appointmentTime} </p>
                            {/* <p className={"font12"} ><img src={tel} className={"imgStyle"} />400-8888-999 </p > */}
                            <div className={'content'}>报修内容 ：{repairDetaildata.problemDescription} </div>
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
                            <div className={'createTime'}>{repairDetaildata.createTime}</div>
                            <div className={`status-flag-g ${statusCodeMap[repairDetaildata.status]}`}>
                                {repairDetaildata.evaluate == 1 ? '已评价' : statusMap[repairDetaildata.status]}
                            </div>
                        </section>
                    </article>
                </div>
            </Flex>
            {/*路由*/}
            {statusCodeMap[repairDetaildata.status] != 's1' &&
            repairDetaildata.workInfo && repairDetaildata.workInfo.map((v, i) => {
                return (
                    <div className={'Components-Repair-Details-WorkRouter-container '} key={i}>
                        <Flex className={'breadNav'}>
                            <nav>{v.workDescription}</nav>
                        </Flex>
                        <WhiteSpace size="lg"/>
                        <WhiteSpace size="lg"/>

                        <div className={'Components-setp-container'}>
                            <Steps current={1}>
                                {
                                    v.routeList && v.routeList.map((vv, ii) => {
                                        return (
                                            <Step
                                                key={ii}
                                                title={<div
                                                    className={`routerTitle ${ii == 0 && 'routerTitlewidth'}`}><span>{vv.describe}
                                                    {
                                                        vv.name && vv.name != '' && <span>
																【服务人：{vv.name} 电话：
																< a href={'tel:' + vv.phone}>{vv.phone} </a> 】
															</span>
                                                    }
														</span></div>
                                                }
                                                icon={<span className={'status'}>{statusExtraMap[vv.workStatus]}</span>}
                                                description={<div className={'steps'}>
                                                    {statusCodeMap[repairDetaildata.status] == 's3' && ii == 0 && repairDetaildata.evaluate == 0 &&
                                                    < span className={'evaluate'}
                                                           onClick={() => {
                                                               history.push(`/OwnerComment/${this.props.match.params.id}/1`);
                                                           }}>评价</span>
                                                    }
                                                    {ii == 0 && repairDetaildata.evaluate == 1 &&
                                                    < span className={'evaluate'}
                                                           onClick={() => {
                                                               history.push(`/OwnerComment/${this.props.match.params.id}/0`);
                                                           }}>查看</span>
                                                    }
                                                    <div className={'content'}>
                                                        {repairDetaildata.evaluate == 1 && ii == 0 &&
                                                        <IconStar startval={vv.score} starisfalse={0}/>
                                                        }
                                                    </div>
                                                    <p className={'content'}>{vv.handleTime}</p>
                                                    <div className={'routeimg'}>
                                                        {

                                                            vv.routeImageUrl && vv.routeImageUrl.split(',').map((vvv, iii) => {
                                                                return (
                                                                    <span onClick={() => {
                                                                        this.props.onClick(vvv);
                                                                    }}
                                                                          key={iii}>
																		<img src={vvv} className={'imgStyle'}/>
																	</span>
                                                                );

                                                            })

                                                        }
                                                    </div>
                                                </div>}
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
                statusCodeMap[repairDetaildata.status] == 's1' && <div className={'Components-Repair-Details-Notice-container'}>
                    <p>您提交的报修单正在处理，看到后我们派人第一时间与您联系，如有疑问请拨打400电话。 </p>
                    {/* <div className={'tel'} ><div key={1}>400电话：<span className={'blue'}>400-2333-432</span></div></div > */}
                </div>
            }
            {/* <Notice
				label={'您提交的报修单正在处理，看到后我们派人第一时间与您联系，如有疑问请拨打400电话。'}
				CustomerService ={renderTel}
			/> */}
            <WhiteSpace size="lg"/><WhiteSpace size="lg"/>
            <WingBlank>
                {statusCodeMap[repairDetaildata.status] == 's3' && repairDetaildata.evaluate == 0 &&
                <Mybutton callback={() => {
                    history.push(`/OwnerComment/${this.props.match.params.id}/1`);
                }} type="blue"
                          label="评 价"/>
                }
            </WingBlank>
        </div>;
    }
}
