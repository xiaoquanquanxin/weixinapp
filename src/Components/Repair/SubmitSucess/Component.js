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
	WingBlank,
	Toast,
	TabBar,
	TextareaItem,
	DatePicker,
	List
} from 'antd-mobile';

const alert = Modal.alert;
import Mybutton from '../../pub/MyButton/index';
import StatusTips from '../../pub/StatusTips';

/*当前页面用到的*/
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
// GMT is not currently observed in the UK. So use UTC now.
const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));

// Make sure that in `time` mode, the maxDate and minDate are within one day.
let minDate = new Date(nowTimeStamp - 1e7);
const maxDate = new Date(nowTimeStamp + 1e7);
// console.log(minDate, maxDate);
if (minDate.getDate() !== maxDate.getDate()) {
	// set the minDate to the 0 of maxDate
	minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
}

/*自定义类*/
import './Component.less';

@inject('store', 'actions')
@observer
export default class Template extends React.Component {
	constructor(props){
		super(props);
		this.state={
			id: "",//单据ID
			code: "",//单据编号
		}
	}
	componentDidMount () {
		//console.log('[Template] componentDidMount..')
		window.setWindowTitle('房屋报修 ');
		// console.log("~~~~~~~~",this.props.location.search);
		// let id = window.getQueryString("id");
		// console.log("1111111", id);
		 
		this.setState({
			id: window.getQueryString("id"),
			code: window.getQueryString("code"),
		})
	}

	submit () {
		alert(123);
	}

	onClick = (e) => {
		console.log(e);
	};
	render () {
		const { store, actions } = this.props;
		return <div className={'Components-Repair-SubmitSucess-container'} >
			<div ><StatusTips
				type={'sucess'}
				label={'报事提交成功！'}
				describe={<div className={'describe'}>
					<p >您的报事我们已收到，我们的工作人员会第一时间与您联系，如有疑问请拨打<a href='tel:400-008-0808'> 400-008-0808 </a>，我们将竭诚为您服务！</p>
					<p >报修单号：<span className={'blue'}>{window.getQueryString("code")}</span></p>
				</div>}
			/></div >
			<WhiteSpace size="lg" />
			<WhiteSpace size="lg" />
		</div >;
	}
}