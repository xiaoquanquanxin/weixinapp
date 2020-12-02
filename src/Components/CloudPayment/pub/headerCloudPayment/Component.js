/*共用的*/
import React from 'react';
/*antd-mobile*/
import { Flex, WhiteSpace, Steps, WingBlank, } from 'antd-mobile';
import PropTypes from 'prop-types';

import buidling from './buidling.png';

import './Component.less';
import { inject, observer } from 'mobx-react/index';

/*自定义类*/
@inject('store', 'actions')
@observer


export default class Header extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};
	}

	static propTypes = {
	};

	componentDidMount () {
		const { store, actions } = this.props;
		const { actionsHeaderCloudPayment } = actions;
		const { orderDetail } = actionsHeaderCloudPayment;
		/*预约详情*/
	 	orderDetail();
	}

	render () {
		const { store, actions } = this.props;
		const { storeHeaderCloudPayment } = store;
		const { userDataInfo } = storeHeaderCloudPayment;
		const headBox = [
			<div className="head" key={Math.random() * 0.1} >
				<div className="head-sub-box" >
					<span className="img" ><img src={buidling} width={45} height={44} /> </span >
					<div className="info" >
						<p >{ (  userDataInfo.userList ?  userDataInfo.userList.length>0: '') ? userDataInfo.userList.peek()[0].fullName:''  }</p >
						<p >{ (  userDataInfo.userList ?  userDataInfo.userList.length>0: '') ? userDataInfo.userList.peek()[0].roomName:''  }</p >

					</div >

				</div >
				<div className="bottom" />
			</div >
		];
		return (<div className={'Components-headerCloudPayment-container'} >
			{headBox}
		</div >);
	}

	componentWillUnmount () {
		const { actions } = this.props;
		const { actionsHeaderCloudPayment } = actions;
		actionsHeaderCloudPayment.init();
	}
}
