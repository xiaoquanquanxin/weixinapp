/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle';

/*antd-mobile*/
import {
	Flex,
	Button,
	Modal,
	Picker,
	InputItem,
	WhiteSpace,
	Toast,
	TabBar,
	TextareaItem,
	DatePicker,
	List,
	ImagePicker,
	WingBlank,
} from 'antd-mobile';

const alert = Modal.alert;
import Mybutton from '../../pub/MyButton';
import router from '../../../router'
import constant from '../../../constant';
import VerificationParameter from '../../pub/VerificationParameter';

const data = [{
	url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
	id: '2121',
}, { url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg', id: '2122', }];
import ImgZoomHOC from '../../pub/ImgZoomHOC';
import VerificationMobileFormat from '../../pub/VerificationMobileFormat';
import EmptyStoreData from '../../pub/EmptyStoreData';
import StatusTips from '../../pub/StatusTips';

/*当前页面用到的*/
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

/*自定义类*/
import './Component.less';

@ImgZoomHOC('')
@inject('store', 'actions')
@observer

export default class DelegatedDeliveryNoEntry extends React.Component {

	componentDidMount () {
		window.setWindowTitle('预约交付 ');
	}

	/*提交*/
	submit = () => {
		this.props.history.push('/DelegatedDeliveryHouseSelection');
	 };

	render () {
		const { store, actions } = this.props;
		const { storeAddRepair } = store;
		//const { actionsAddRepair} = actions;
		const { tip, AddRepair } = storeAddRepair;

		//默认预约时间（不选择）
		return <div className={'Components-Autograph-container'} >


			<div ><StatusTips
				type={'fail'}
				label={'抱歉，没有您的预约消息！'}
				describe={<div className={'describe'}>
					<p >请您留意合同上的交付时间，如有疑问请联系客服 <a href="tel:400-008-0808" className={"blue"}>400-008-0808</a></p>

				</div>}
			/></div >
			<WhiteSpace size="lg" />


			<WhiteSpace size="lg" />
			<WingBlank >
				<Mybutton callback={this.submit}
						  type={  'blue'} label="委托交付" />
			</WingBlank >



			<WhiteSpace size="lg" />
			<WhiteSpace size="lg" />
		</div >;
	}

}