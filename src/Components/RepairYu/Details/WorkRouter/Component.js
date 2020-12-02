/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';
import StepsList from '../../../pub/StepsYu';
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
		const { data, actions, label, CustomerService } = this.props;
		//const { actionsTemplate} = actions;
		console.log("datadatadata",data)
		return <div className={'Components-Repair-Details-WorkRouter-container '} >
			{/* <Flex className={'breadNav'} >
				<nav >屋面 / 雨水口 / 雨水口周边未收口</nav >
			</Flex > */}
			<WhiteSpace />
			<div className="title">工单详情</div>
			<WhiteSpace />
			<StepsList data={data}/>

		</div >;
	}
}