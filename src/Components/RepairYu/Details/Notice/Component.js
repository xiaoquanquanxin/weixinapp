/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';
/*antd-mobile*/
import tel from '../tel.png';

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
		return <div className={'Components-Repair-Details-Notice-container'} >
			<p >{label} </p >
			<div className={'tel'} >{CustomerService} </div >
		</div >;
	}
}