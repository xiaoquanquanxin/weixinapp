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
import StepsList from './Steps';

/*当前页面用到的*/
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

/*自定义类*/
import './Component.less';

@ImgZoomHOC('')
@inject('store', 'actions')
@observer

export default class HandInBuildingSignInSuccess extends React.Component {
	static defaultProps = {};
	constructor () {
		super();
	}

	state = {
		fillNofinish: true,
		files: data,
		multiple: true,
		date: now,
		colorStyle: false,
	};

	componentDidMount () {
		
		this.props.actions.actionsHandInBuildingSignInSuccess.SignInSuccessfun()


	}

	//检查按纽状态
	_checkForm = (data) => {
		const array = [];
		const bolean = data instanceof Object || data instanceof Array;
		if (bolean) {
			if (data instanceof Object) {
				for (let ele of Object.values(data)) {
					array.push(ele);
				}
			}
			const value = array.every((item, index) => {
				return item != '';							//注:自定义store时，必需为空('')
			});
			if (value) {
				this.setState({
					colorStyle: true
				});
			} else {
				this.setState({
					colorStyle: false
				});
			}
		} else {
			Toast.info(`只支持数组和对象`, 1);
		}

	};

	/*提交*/
	submit = () => {
		const { store, actions, type } = this.props;
		actions.actionsAddRepair.incA();
		const { storeAddRepair } = store;
		const { AddRepair } = storeAddRepair;
		//较验电话号码格式
		const boolean = VerificationMobileFormat.checkMobile(AddRepair.tel);
		if (!boolean) return false;
		if (this.state.fillNofinish) {
			console.log('提交的数据：', AddRepair);
			let address=constant.REPORTREPAIR;										//默认报事报修
			if (this.props.match.params.type*1 === constant.COMPLAINSUGGESTIONS) {	//投诉建议
				address=constant.COMPLAINSUGGESTIONS
			}
			this.props.history.push(`${router.SubmitSucess}`);
			// this.props.history.push(`${router.RepairList[0]}/${address}`);
		}
	 };

	/*点击查询接口*/
	onClick = (e) => {
		console.log(e);
	};

	/*选择图片回调
	*callback: 图，操作类型，索引
	* */
	onChangeImg = (files, type, index) => {
		//files 值发生变化触发的回调函数, operationType 操作类型有添加，移除，
		// 如果是移除操作，则第三个参数代表的是移除图片的索引
		console.log(files, type, index);
		this.setState({
			files,
		}, () => {
		});
	};

	//选择图片失败
	onFailImg = (files) => {
		console.log(files);
	};

	/*输入描述*/
	onChange = (e) => {
		const { store } = this.props;
		const { storeAddRepair } = store;
		const { AddRepair } = storeAddRepair;
		AddRepair.description = e;
		this._checkForm(AddRepair);
	};

	render () {
		const { store, actions } = this.props;
		const { files } = this.state;
		const { storeAddRepair, storeHandInBuildingSignInSuccess } = store;
		//const { actionsAddRepair} = actions;
		const { AddRepair } = storeAddRepair;
		const { SignInSuccessData, resultTitle  } = storeHandInBuildingSignInSuccess
		// let resultTitleTip=resultTitle && resultTitle == 1 ? '签到成功!' : '签到失败'
		// let sucessTip=resultTitle && resultTitle == 1 ? 'sucess' : ''
		window.setWindowTitle(resultTitle==1?'签到成功':'签到失败');
		
		//默认预约时间（不选择）
		AddRepair.appointmentTime = new Date(this.state.date).format('yyyy-MM-dd hh:mm:ss');
		return <div className={'Components-Autograph-container'} >

			{resultTitle == 1 ?
			<div>
				<div className={'CertificationStatus'}>
					<div >{
						<StatusTips
								type={'sucess'}
								label={'签到成功'}
							describe={<div className={'describe'}>
								{SignInSuccessData.orderDay && <p >预约时间：{SignInSuccessData.orderDay}</p>}
							</div>}
						/>
					}</div >
					<WhiteSpace size="lg" />

				</div>
			{
				SignInSuccessData.orderDay &&
				<div className={"stepbox"}>
					{/* <WingBlank > */}
					<StepsList {...this.props} />
					{/* </WingBlank > */}
				</div>
			}



			<WhiteSpace size="lg" />
			<WhiteSpace size="lg" />
				</div>:
				resultTitle == 2&&
				<div className={'CertificationStatus'}>
					<div >{
						<StatusTips
							type={''}
							label={'签到失败'}
							describe={<div className={'describe'}>
								{SignInSuccessData.orderDay && <p >预约时间：{SignInSuccessData.orderDay}</p>}
							</div>}
						/>
					}</div >
					<WhiteSpace size="lg" />

				</div>
}
			
		</div >;
	}

}