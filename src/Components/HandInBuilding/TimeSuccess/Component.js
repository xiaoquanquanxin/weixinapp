/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';
import StatusTips from '../../pub/StatusTips';
/*antd-mobile*/
import {
	WhiteSpace,
} from 'antd-mobile';


/*当前页面用到的*/

/*自定义类*/
import './Component.less';

@inject('store', 'actions')
@observer

export default class Template extends React.Component {



	componentDidMount () {
		//console.log('[Template] componentDidMount..')
		window.setWindowTitle('修改成功 ');
	}


	render () {
		const { store, actions } = this.props;
		const { storeAddRepair } = store;
		//const { actionsAddRepair} = actions;
		const { tip, AddRepair } = storeAddRepair;

		//默认预约时间（不选择）
		return <div className={'Components-Autograph-container'} >


			<div className={'CertificationStatus'}>
				<div ><StatusTips
					type={'sucess'}
					label={'修改预约时间成功！'}
					describe={<div className={'describe'}>
						<p >1、请您按《交付通知书》、《房屋交付指引》中的说明，带齐要求的各种证件、资料及相关收楼所需费用办理收楼手续。</p><p> 2、收楼时需缴纳相关费用发，详见《房屋交付指引》。。。</p>
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