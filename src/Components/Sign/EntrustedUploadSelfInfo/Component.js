/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle';
import SolidLine from '../../pub/SolidLine';
import NoMessages from '../../pub/NoMessages';

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
	Tag
} from 'antd-mobile';

const alert = Modal.alert;
import personId from './personId.png'
import cardid from './cardId.png'
import Mybutton from '../../pub/MyButton';

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

export default class Template extends React.Component {
	static defaultProps = {
	};

	constructor () {
		super();
	}

	state = {
		fillNofinish: true,
		files: data,
		multiple: true,
		date: now,
		colorStyle: false,
		tabIndex: 0,
		tabButtonIndex: 0,
		autoHeight: 52,
		tabIcon: '+'
	};

	componentDidMount () {
		window.setWindowTitle('委托选房 ');
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
		// actions.actionsAddRepair.incA();
		const { storeAddRepair } = store;
		const { AddRepair } = storeAddRepair;
		//较验电话号码格式
		const boolean = VerificationMobileFormat.checkMobile(AddRepair.tel);
		if (!boolean) return false;
		if (this.state.fillNofinish) {
			console.log('提交的数据：', AddRepair);
			let address = constant.REPORTREPAIR;										//默认报事报修
			if (this.props.match.params.type * 1 === constant.COMPLAINSUGGESTIONS) {	//投诉建议
				address = constant.COMPLAINSUGGESTIONS;
			}
			this.props.history.push(`${router.SubmitSucess}`);
			// this.props.history.push(`${router.RepairList[0]}/${address}`);
		}
	};

	/*点击查询接口*/
	onClick = (e) => {
		console.log(e);
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
		const { storeAddRepair } = store;
		//const { actionsAddRepair} = actions;
		const { tip, AddRepair } = storeAddRepair;

		//默认预约时间（不选择）
		AddRepair.appointmentTime = new Date(this.state.date).format('yyyy-MM-dd hh:mm:ss');
		return <div className={'Components-EntrustedUploadSelfInfo-container'} >

			<WhiteSpace size="lg" />
			<WingBlank >
				<Flex>
					<Flex.Item className={"project-name"}> <i className={'flag'}/> 广州常春藤-G1-1-2802 </Flex.Item>
				</Flex>
			</WingBlank >


			<SolidLine />
			<List >
				<InputItem
					maxLength={100}
					placeholder="请输入联系人"
					ref={el => this.autoFocusInst = el}
					onChange={(e) => {
						// AddRepair.contact = e;
						this._checkForm(AddRepair);
					}
					}
				>被委托人</InputItem >

				<InputItem
					align={'right'}
					maxLength={11}
					placeholder="身份证"
					value={AddRepair.tel}
					onChange={(e) => {
						this._checkForm(AddRepair);

					}
					}
				>身份证</InputItem >

				<InputItem
					align={'right'}
					maxLength={11}
					placeholder="请输入联系电话"
					value={AddRepair.tel}
					onChange={(e) => {
						// VerificationMobileFormat.setCallerNumber(e) ? AddRepair.tel = e : AddRepair.tel = '';
						this._checkForm(AddRepair);

					}
					}
				>联系电话</InputItem >
			</List >

			<WingBlank >
			<List >
				<div className={'card-list'}>
					<div className={'card'}>
						<img src={personId}  />
					</div>


					<div className={'card'}>
						<img src={cardid}  />
					</div>
				</div>
			</List>
			</WingBlank>
			<WhiteSpace size="lg" /><WhiteSpace size="lg" />
			<WingBlank >
				<Mybutton callback={this.state.colorStyle ? this.submit : undefined}
						  type={this.state.colorStyle ? 'blue' : 'grey'} label="扫描签到" />
			</WingBlank >
			<WhiteSpace size="lg" />
		</div >;
	}

}