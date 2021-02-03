/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
/*当前页面用到的*/
import MyButton from '../../pub/MyButton';
import RichTextDisplay from '../../pub/RichTextDisplay/Component';
import TopBar from '../../CloudPayment/pub/TopBar-cloudPayment';
/*自定义类*/
import './Component.less';
import router from '../../../router';

const title = '交付须知';

@inject('store', 'actions')
@observer
export default class HandInBuildingNotice extends React.Component {
	componentDidMount () {

		this.props.actions.actionsHandInBuildingNotice.Noticefun();
		window.setWindowTitle('交付须知');
		this.props.actions.actionsHandInBuildingNotice.userInfo();
	}

	submit () {
		this.props.history.push('/HandInBuildingDetails');
	}

	render () {
		const { store, actions } = this.props;
		const { storeHandInBuildingNotice } = store;
		const { actionsHandInBuildingNotice } = actions;
		const { NoticeData, currentUseInfo } = storeHandInBuildingNotice;
		const { scanQRCode, qryPersonalCertification } = actionsHandInBuildingNotice;
		const { authStatus,  phoneNo, fddAuthStatus } = currentUseInfo;
		console.log('currentUseInfo______________', authStatus);
		return <div className={'Components-HandInBuildingNotice-container'} >

			<TopBar
				hostry={this.props.history}
				title={title}
				right={null}
			/>

			{NoticeData.orderArticleType == 3 && <div className="info" >{NoticeData.noticeContent}</div >}

			{
				(NoticeData.orderArticleType == 1 || NoticeData.orderArticleType == 2) &&
				<RichTextDisplay >
					{NoticeData.noticeContent && NoticeData.noticeContent.replace(/\n/g, '</br>')}
				</RichTextDisplay >
			}

			<div className={'pd-btn'} onClick={() => {
				/*
				* 是否有登录没有则跳登录页面，如果有则验证认证状态（1-已认证，0-未认证）,如果我们服务器没有认证，则去跳转法大大的认证
				* */
				//自己库认证状态（1-已认证，0-未认证）

				//法大大认证状态：0：未注册；1：已注册未认证；2：已认证',
				 let origin=window.location.origin;
				// let returnUrl = origin + '/index.html?url=/CloudPayment/DeliveryAppointment/';
				let str = origin + '/index.html?url=';
				let uObj = window.getQueryString();
				let othereURL = `/CloudPayment/DeliveryAppointment?orderDetailId=`+uObj.orderDetailId;
				// othereURL = encodeURIComponent(othereURL);
				othereURL = encodeURIComponent(othereURL);
				othereURL = str + othereURL;
				// let origin = window.location.origin;
				// let returnUrl = origin+'/faddMindlepage.html';
				const orderDetailId = window.getQueryString('orderDetailId');
				const body = {
					returnUrl: othereURL,
					orderDetailId:orderDetailId
				};
				if (authStatus == 1) {//自己库认证状态:已认证
					if (fddAuthStatus == 2) { //法大大的已认证
						let uObj = window.getQueryString();
						console.log(uObj.orderDetailId)
						this.props.history.push(router.DeliveryAppointment[0]+'?orderDetailId='+uObj.orderDetailId);
					} else if (fddAuthStatus == 1 || fddAuthStatus == 0) { //法大大的没认证
						actionsHandInBuildingNotice.qryPersonalCertification(body);
					}
				} else {
					actionsHandInBuildingNotice.qryPersonalCertification(body);
				}

			}
			} ><Button className={'submit-btn'} >我已了解，立即办理</Button ></div >


			{/*<div className={"heightbottom"}></div>*/}
			{/* {
                NoticeData && <div className={"fixed"}>

                <div className={"center"}>
                    <div className={"btn"} onClick={() => { this.submit() }}>
                        <MyButton type={"blue"} label={"预约到访"} width={163} />
                    </div>
                    <div className={"btn"} onClick={() => { scanQRCode(this.props.history) }}>
                        <MyButton type={"white"} label={"扫码签到"} width={163} />
                    </div>
                </div>

            </div>
            }*/}

		</div >;
	}
}
