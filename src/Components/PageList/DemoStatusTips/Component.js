/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle';
/*antd-mobile*/
import { WhiteSpace, WingBlank,Flex } from 'antd-mobile';

/*当前页面用到的*/
import StatusTips from '../../pub/StatusTips';
/*自定义类*/
import './Component.less';

@inject('store', 'actions')
@observer
class __C extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		const { store, actions } = this.props;
		const { storeDemoButton } = store;
		const { actionsDemoButton } = actions;
		const { tip } = storeDemoButton;

		return (
			<div className={'Components-DemoStatusTips-container'} >
				<WhiteSpace size="lg" />



				<div ><StatusTips
					type={'sucess'}
					label={'您的报名已取消 感谢你的参与！！'}
					describe={''}
				/></div >
				<WhiteSpace size="lg" />




				<div ><StatusTips
					type={'sucess'}
					label={'您的信息已提交成功！！'}
					describe={<div className={'describe'}>
						<p >请及时关注审核状态，我们将在三个工作日内对您的信息进行审核。</p>
					</div>}
				/></div >
				<WhiteSpace size="lg" />






				<div ><StatusTips
					type={'sucess'}
					label={'提交订单成功！'}
					describe={<div className={'describe'}>
						<p >您提交的报修单正在处理，看到后我们派人第一时间与您联系，如有疑问请拨打400电话。</p>
						<p >报修单号：<span className={'blue'}>KG-2014020506</span></p>
					</div>}
				/></div >
				<WhiteSpace size="lg" />




				<div ><StatusTips
					type={'sucess'}
					label={'提交订单成功！'}
					describe={<div className={'describe'}>
						<p >收楼注意事项</p>
						<p >1、产权登记人需要带《收楼通知书》、《购房合同》、身份证复印件、银行卡...</p>
						<p >2、现场需要签到并核实业主的个人材料。双方确认收房流程。</p>
					</div>}
				/></div >

				<WhiteSpace size="lg" />



				<div ><StatusTips
					type={'fail'}
					label={'您还没有绑定任何房间！'}
					describe={<div className={'describe'}>
						<p >收楼注意事项</p>
						<p >1、产权登记人需要带《收楼通知书》、《购房合同》、身份证复印件、银行卡...</p>
						<p >2、现场需要签到并核实业主的个人材料。双方确认收房流程。</p>
					</div>}
				/></div >
				<WhiteSpace size="lg" />


				<div ><StatusTips
					type={'fail'}
					label={'您还没有绑定任何房间！'}
					describe={<div className={'describe'}>
						<p >1、产权登记人使用房产登录手机号注册可自动绑定房间。如需更换手机号码或有疑问请联系客服 <span className={"blue"}>400-53535</span></p>
						<p >2、非产权登记人请联系产权登记人添加授权。</p>
						<p >3、如手机认证无效，请选择房产认证。</p>
					</div>}
				/></div >
				<WhiteSpace size="lg" />


				<div ><StatusTips
					type={'fail'}
					label={'房间未进入交付期！'}
					describe={<div className={'describe'}>
						<p className={"smalllineHeight"}>请留意您合同上的交付时间，如有疑问请联系客服。<span className={"blue"}>400-53535</span></p>
					</div>}
				/></div >

			</div >
		);
	}

	//组件的内部状态和生命周期
	//https://segmentfault.com/a/1190000011776013
}

export default withSetTitle(__C, '页面1');