/*共用的*/
import React from 'react';
/*antd-mobile*/
import { Flex, WhiteSpace, Toast,Steps, WingBlank, } from 'antd-mobile';
import PropTypes from 'prop-types';

const Step = Steps.Step;

import './Component.less';
import { inject, observer } from 'mobx-react/index';

/*自定义类*/

@inject('store', 'actions')
@observer

class StepCloud extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};
	}
	/*点大结点跳入其它页面*/
	jumpPostion = (postion,url,body) =>{
		const HouseOwnerUrl=url.includes('/HouseOwner');
		const DechanHandleUrl=url.includes('/DechanHandle');
		const WuyehandleUrl=url.includes('/Wuyehandle');
		const { actions, store } = this.props;
		let headClick=true;
		//跳出去
		if (HouseOwnerUrl && (postion==2 || postion==3 || postion==4) )  {
			const { actionsHouseOwner } = actions;
			const { storeHouseOwner } = store;
			const { detail } = actionsHouseOwner;
			const { qryHouseOwnerInfo } = storeHouseOwner;
			body.nodeCode= qryHouseOwnerInfo.nodeTree[postion-1].children[0].nodeCode;
			detail(body,this.props.that, headClick);
			return true
		} else {
			//从地产跳进去
			if (DechanHandleUrl)  {
				const { actionsDechanHandle} = actions;
				const {storeDechanHandle } =store;
				const { DechanHandleInfo }=storeDechanHandle;
				body.nodeCode=DechanHandleInfo.nodeTree[postion-1].children[0].nodeCode;
				const { detail } = actionsDechanHandle;
				detail(body,this.props.that,headClick)
				return true
			} else if (WuyehandleUrl) {
				//从物业跳进去
				const { storeWuyehandle } = store;
				const { actionsWuyehandle } = actions;
				const { detail } = actionsWuyehandle;
				const { WuyehandleInfo } = storeWuyehandle;
				body.nodeCode=WuyehandleInfo.nodeTree[postion-1].children[0].nodeCode;
				console.log(body);
				detail(body,this.props.that)
				return true
			}
		}
		return false
	};

	/*
	param:
		n: 0 交付预约
		n: 1 物业办理
		n: 2 地产办理
*/
	handleClickStep = (n) => {
		let name='';
		if (n==1) { Toast.info('请正确选择步骤!', 2); return false;}
		else if (n==2) {
			name='HouseOwner';
		} else if (n==3) {
			name='Wuyehandle';
		} else if (n==4){
			name='DechanHandle';
		}
		// console.log('n',  n);
		// console.log('name',  name);
		/*
		点大结点但还是要传小结点
		* "交付预约": deliveryAppointmentNode
		* 物业办理": propertyNode
		* 地产办理: realEstateNode
		* */
		const rdid=this.props.that.props.store.storeDeliveryAppointment.orderDetailInfo.roomId;
		const rbdid=this.props.that.props.store.storeDeliveryAppointment.orderDetailInfo.orderBuildingId;
		const orderDetailId2=this.props.that.props.store.storeDeliveryAppointment.orderDetailInfo.orderDetailId;
		const orderBuildingId2=this.props.that.props.store.storeDeliveryAppointment.orderDetailInfo.orderBuildingId;


		const roomId = window.getQueryString('roomId') || rdid;
		const orderId = window.getQueryString('orderId') || rbdid;
		const orderDetailId = window.getQueryString('orderDetailId') || orderDetailId2;
		const orderBuildingId = window.getQueryString('orderBuildingId') || orderBuildingId2;

		const add=window.location.href;
		const { store, actions } = this.props;
		let url=add;
		const currentUrl=add.includes('/Wuyehandle');
		const DechanHandle=add.includes('/DechanHandle');
		const body = {
			orderBuildingId: orderBuildingId, //
			orderDetailId: orderDetailId, //
			roomId: roomId, //this.props.roomId,		//房间id
			orderId: orderId, //this.props.orderId,	//预约批次id
			optEnd: 'wx',					 //操作入口(wx, pad)
			nodeCode: ''		//当前tab位置
			// optType: '' //交付办理操作(1:暂不处理 2:确认以上费用)
		};
		/*针对业主跳转*/
		const o=this.jumpPostion(n,url,body);
		if (o) return;
		if (n==3 && currentUrl) {
			//在 Wuyehandle 往下点
			const { store, actions } = this.props;
			const { storeWuyehandle } = store;
			const { actionsWuyehandle } = actions;
			const { detail } = actionsWuyehandle;
			const { WuyehandleInfo } = storeWuyehandle;
			const nodeTree=WuyehandleInfo.nodeTree[2].children[0].nodeCode;
			body.nodeCode=nodeTree;
			detail(body,this.props.that)
		} else if (n==3 && DechanHandle) {
			//在 DechanHandle 往上点
			const { store, actions } = this.props;
			const { actionsDechanHandle} = actions;
			const {storeDechanHandle } =store;
			const { DechanHandleInfo }=storeDechanHandle;
			const nodeTree=DechanHandleInfo.nodeTree[2].children[0].nodeCode;
			const { detail } = actionsDechanHandle;
			body.nodeCode=nodeTree;
			detail(body,this.props.that)
		} else if (n==4 && DechanHandle) {
			//在 DechanHandle 点自己
			const { store, actions } = this.props;
			const { actionsDechanHandle} = actions;
			const {storeDechanHandle } =store;
			const { DechanHandleInfo }=storeDechanHandle;
			const nodeTree=DechanHandleInfo.nodeTree[3].children[0].nodeCode;
			const { detail } = actionsDechanHandle;
			body.nodeCode=nodeTree;
			detail(body,this.props.that)
		} else if (n==4 && currentUrl) {
			//在 DechanHandle 点 Wuyehandle
			const { store, actions } = this.props;
			const { storeWuyehandle } = store;
			const { actionsWuyehandle } = actions;
			const { detail } = actionsWuyehandle;
			const { WuyehandleInfo } = storeWuyehandle;
			const nodeTree=WuyehandleInfo.nodeTree[3].children[0].nodeCode;
			body.nodeCode=nodeTree;
			console.log(body)
			detail(body,this.props.that)
		} else {
			const { store, actions } = this.props;
			const { storeDeliveryAppointment } = store;
			const { actionsDeliveryAppointment } = actions;
			const { detail } = actionsDeliveryAppointment;
			const { DeliveryAppointmentInfo } = storeDeliveryAppointment;
			let nodeTree='';
			if (n==2) {
				nodeTree='ownerCardNode' //DeliveryAppointmentInfo.nodeTree[1].children[0].nodeCode;
			} else if (n==3) {
				 //在DeliveryAppointment页面，跳物业页面
				 nodeTree='propertyContractNode' //DeliveryAppointmentInfo.nodeTree[2].children[0].nodeCode;
			} else if (n==4) {
				//在DeliveryAppointment页面，跳地产页面
				 nodeTree='realEstatePaymentNode'  //DeliveryAppointmentInfo.nodeTree[3].children[0].nodeCode;
			}
			body.nodeCode=nodeTree;
			detail(body,this.props.that)
		}
	};


	/*渲染步骤列表*/
	renderStepList = (StepProps) => {

		/*图标定义*/
		const customIcon = (n) => {
			return <span className="outCir" onClick={(e)=>{this.handleClickStep(n)} }>
				 <i className={'innerCir'} > {n} </i >
				{StepProps.hasNoFish && n - 1 == StepProps.nofinish && <i className={'dot'} />}
			 </span >
		};

		if (StepProps.stepDesr.length>0) {
			return <Steps direction="horizontal" current={StepProps.current} >
				{
					StepProps.stepDesr.map((item, index) => {
						return <Step
							title={item.title}
							key={index}
							icon={customIcon(index + 1)}
						/>;
					})
				}
			</Steps >
		}
	};

	render () {
		let { StepProps,nodeTree } = this.props;
		return (<div className={'Components-StepscloudPayment-container'} >
			{this.renderStepList(StepProps) }

		</div >);
	}
}

export default StepCloud;







