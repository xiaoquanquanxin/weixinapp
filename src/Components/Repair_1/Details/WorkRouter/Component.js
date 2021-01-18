/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';
import StepsList from '../../../pub/Steps';
import temp from './temp.png';

/*antd-mobile*/
import { Flex, WhiteSpace, Steps, WingBlank, } from 'antd-mobile';

const Step = Steps.Step;

/*当前页面用到的*/

/*自定义类*/
import './Component.less';

@inject('store', 'actions')
@observer
export default class Template extends React.Component {
	state = {
		arrowStatus: true
	};



	render () {
		const { store, actions, label, CustomerService } = this.props;
		const { storeTemplate } = store;
		//const { actionsTemplate} = actions;
		return <div className={'Components-Repair-Details-WorkRouter-container '} >
			<Flex className={'breadNav'} >
				<nav >屋面 / 雨水口 / 雨水口周边未收口</nav >
			</Flex >
			<WhiteSpace size="lg" />
			<WhiteSpace size="lg" />
			<StepsList {...this.props} />

		</div >;
	}
}