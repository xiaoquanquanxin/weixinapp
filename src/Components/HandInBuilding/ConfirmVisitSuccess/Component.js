/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';

/*antd-mobile*/
import {
	WhiteSpace,
} from 'antd-mobile';

import ImgZoomHOC from '../../pub/ImgZoomHOC';
import StatusTips from '../../pub/StatusTips';


/*自定义类*/
import './Component.less';

@ImgZoomHOC('')
@inject('store', 'actions')
@observer

export default class Template extends React.Component {
	componentDidMount() {
		window.setWindowTitle('确认成功 ');
	}
	render () {
		const { store, actions } = this.props;
		const { storeAddRepair } = store;
		//const { actionsAddRepair} = actions;
		const { tip, AddRepair } = storeAddRepair;
		return <div className={'Components-Autograph-container'} >


			<div className={'CertificationStatus'}>
				<div ><StatusTips
					type={'sucess'}
					label={'确认到访时间成功！'}
					describe={<div className={'describe'}>
						<p >1、请您按《交付通知书》、《房屋交付指引》中的说明，带齐要求的各种证件、资料及相关收楼所需费用办理收楼手续。</p><p> 2、收楼时需缴纳相关费用发，详见《房屋交付指引》。</p>
					</div>}
				/></div >
				<WhiteSpace size="lg" />

			</div>
			<WhiteSpace size="lg" />


			{/* <WhiteSpace size="lg" />
			<WingBlank >
				<StepsList {...this.props} />
			</WingBlank >



			<WhiteSpace size="lg" />
			<WhiteSpace size="lg" /> */}
		</div >;
	}

}