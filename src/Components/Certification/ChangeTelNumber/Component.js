/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle';
/*antd-mobile*/
import { List, InputItem, Checkbox, Flex, WhiteSpace, WingBlank, Toast, Modal } from 'antd-mobile';
import Mybutton from '../../pub/MyButton/index';
import StatusTips from '../../pub/StatusTips/index';
import VerificationCode from '../../pub/VerificationCode/index';
/*当前页面用到的*/
const CheckboxItem = Checkbox.CheckboxItem;
import VerificationParameter from '../../pub/VerificationParameter';
import VerificationMobileFormat from '../../pub/VerificationMobileFormat';
import { Link } from 'react-router-dom';
import './Component.less';
import EmptyStoreData from '../../pub/EmptyStoreData';
import router from '../../../router';

/*自定义类*/
const alert = Modal.alert;
@inject('store', 'actions')
@observer
export default class Template extends React.Component {
	state = {
		colorStyle: false,
		colorStyleNewTel: false,
		fillNofinish: true,

	};

	componentDidMount () {
		window.setWindowTitle('更换号码');
	}
	/*提交*/
	submit = (e) => {
		const { store, actions } = this.props;
		const { storeChangeTelNumber } = store;
		const { actionsChangeTelNumber } = actions;
		const { ChangeTelNumberInfo, ChangeNewTelNumberInfo } = storeChangeTelNumber;
		let { isFinishPototypeInfo, userInfo, userInfoByParam } = storeChangeTelNumber;
		const { certificationPerson, personId, tel,VerificationCode } = ChangeTelNumberInfo;    //用户输入数据
		const boolean = VerificationMobileFormat.checkMobile(ChangeTelNumberInfo.tel);
		if (!boolean) return false;

		//提交较验用户输入信息，与系统不匹配，不允许通过
		if (e.target.textContent != '更 换') {

			const body = {
				userName: certificationPerson,
				phoneNo: tel,
				validCode: VerificationCode,
			};

			const o = actionsChangeTelNumber.userInfoByParam(body);
			o.then((result) => {
				if (result.resultCode == 0) {
					Toast.info(`验证成功！`, 1);
					window.setTimeout(() => {
						this.props.store.storeChangeTelNumber.isFinishPototypeInfo = true;
					}, 1001);

				}/* else {
					alert('验证不成功', '对不起您的信息不存在，请让业主授权！', [
						{ text: '关闭', onPress: () => console.log('cancel') },
						{
							text: '联系客服', onPress: () => {
								window.location.href = 'tel:400432998';
							}
						},
					]);
				}*/

			});

		} else {
			//允许通过---提交更换手机数据---和上面没关系
			// console.log('第一步验证提交数据的盒子：', ChangeTelNumberInfo);
			// console.log('第二步更换手机提交数据的盒子：', ChangeNewTelNumberInfo);
			// e.target.textContent=='更 换: 判断是哪个按纽被点击了
			const body = {
				phoneNo: ChangeNewTelNumberInfo.newTel,
				userId: userInfoByParam,	//用户id，根据参数获取用户信息接口返回
				validCode: ChangeNewTelNumberInfo.VerificationCode
			};
			alert('提示', '确定要更换手机！', [
				{ text: '关闭', onPress: () => console.log('cancel') },
				{
					text: '确定', onPress: () => {
						const o = actionsChangeTelNumber.updatePhone(body);
						o.then((txt) => {
							if (txt == 0) {
                                this.props.history.push("/Certification/ChangeTelNumberSuccess")
								/*Toast.info(`修改成功！`, 1);
								window.setTimeout(()=>{
									const { store } = this.props;
									const { storeChangeTelNumber } = store;
									const { updatePhone } = storeChangeTelNumber;
									//业主身份
									updatePhone == 1 ? this.props.history.push(router.SubmitCertification) : this.props.history.push(router.HouseAuthentication);
								},1001);*/
							}
						});
					}
				},
			]);
		}
	};
	//检查按纽状态
	_checkForm = (data) => {
		//当前是哪个盒子在执行操作
		const currentData = data.hasOwnProperty('personId') || data.hasOwnProperty('certificationPerson');
		const array = [];
		const boolean = data instanceof Object || data instanceof Array;
		if (boolean) {
			if (data instanceof Object) {					//对象转数组
				for (let ele of Object.values(data)) {
					array.push(ele);
				}
			}
			const value = array.every((item, index) => {
				return item != '';							//注:自定义store时，必需为空('')
			});

			if (value) {
				currentData ? this.setState({ colorStyle: true }) : this.setState({ colorStyleNewTel: true });

			} else {
				!currentData ? this.setState({ colorStyle: false }) : this.setState({ colorStyleNewTel: false });
			}
		} else {
			Toast.info(`只支持数组和对象`, 1);
		}

	};

	render () {
		const { store, actions } = this.props;
		const { storeChangeTelNumber } = store;
		//const { actionsTemplate} = actions;
		const { ChangeTelNumberInfo, isFinishPototypeInfo, ChangeNewTelNumberInfo } = storeChangeTelNumber;
		return (<div className={'Components-ChangeTelNumber-container'} >

			{/*更换号码*/}
			{!isFinishPototypeInfo && <div >
				<InputItem
					maxLength={100}
					placeholder="请输入姓名"
					value={ChangeTelNumberInfo.certificationPerson}
					onChange={(e) => {
						ChangeTelNumberInfo.certificationPerson = e;
						this._checkForm(ChangeTelNumberInfo);
					}}
				>姓名</InputItem >


				<InputItem
					placeholder="请输入身份证"
					maxLength={18}
					value={ChangeTelNumberInfo.personId}
					onChange={(e) => {
						ChangeTelNumberInfo.personId = e;
						/*	注：VerificationMobileFormat和_checkForm方法同时使用时，一定要先付值，然后才能检查值(即上向关系不能调动)，要不按纽状态会不正常
						* 		VerificationMobileFormat.setCallerNumber(e) ? ChangeTelNumberInfo.personId = e : ChangeTelNumberInfo.personId = '';
								this._checkForm(ChangeTelNumberInfo);
						 */
						// VerificationMobileFormat.setCallerNumber(e) ? ChangeTelNumberInfo.personId = e : ChangeTelNumberInfo.personId = '';
						this._checkForm(ChangeTelNumberInfo);
					}}
				>身份证</InputItem >

				<InputItem
					placeholder="请输入联系电话"
					value={ChangeTelNumberInfo.tel}
					maxLength={11}
					onChange={(e) => {
						VerificationMobileFormat.setCallerNumber(e) ? ChangeTelNumberInfo.tel = e : ChangeTelNumberInfo.tel = '';
						this._checkForm(ChangeTelNumberInfo);
					}
					}
				>原号码</InputItem >



				<Flex className={'getCodeParentDode'} >
					<Flex.Item className={'fristNode'} >
						<InputItem
							placeholder="请输入验证码"
							maxLength={4}
							value={ChangeTelNumberInfo.VerificationCode}
							onChange={(e) => {
								ChangeTelNumberInfo.VerificationCode = e;
								this._checkForm(ChangeTelNumberInfo);

							}}
						>验证码
						</InputItem >
					</Flex.Item >
					<Flex.Item className={'lastNode'} >
						<VerificationCode
							tel={ChangeTelNumberInfo.tel}
							label={this.props}
						/>
					</Flex.Item >
				</Flex >


			</div >}


			{/*重新输入新号码*/}
			{isFinishPototypeInfo && <div >
				<InputItem
					placeholder="请输入新手机号"
					value={ChangeNewTelNumberInfo.newTel}
					maxLength={11}
					onChange={(e) => {
						VerificationMobileFormat.setCallerNumber(e) ? ChangeNewTelNumberInfo.newTel = e : ChangeNewTelNumberInfo.newTel = '';
						this._checkForm(ChangeNewTelNumberInfo);
					}
					}
				>新手机号</InputItem >


				<Flex className={'getCodeParentDode'} >
					<Flex.Item className={'fristNode'} >
						<InputItem
							placeholder="请输入验证码"
							maxLength={4}
							value={ChangeNewTelNumberInfo.VerificationCode}
							onChange={(e) => {
								ChangeNewTelNumberInfo.VerificationCode = e;
								this._checkForm(ChangeNewTelNumberInfo);

							}}
						>验证码
						</InputItem >
					</Flex.Item >
					<Flex.Item className={'lastNode'} >
						<VerificationCode
							tel={ChangeNewTelNumberInfo.newTel}
							label={this.props}
						/>
					</Flex.Item >
				</Flex >

			</div >}


			<WhiteSpace size="lg" />
			<WhiteSpace size="lg" />
			<WhiteSpace size="lg" />
			<WingBlank >
				{
					!isFinishPototypeInfo ? (<Mybutton
						callback={this.state.colorStyle ? this.submit : undefined}
						type={this.state.colorStyle ? 'blue' : 'grey'}
						label="下一步"
					/>) : (<Mybutton
						callback={this.state.colorStyleNewTel ? this.submit : undefined}
						type={this.state.colorStyleNewTel ? 'blue' : 'grey'}
						label="更换"
					/>)
				}

			</WingBlank >


		</div >);
	}

	componentWillUnmount () {
		const { store } = this.props;
		const { storeChangeTelNumber } = store;
		const { ChangeTelNumberInfo, ChangeNewTelNumberInfo, isFinishPototypeInfo } = storeChangeTelNumber;
		const AddRepairStore = EmptyStoreData.getCurrentInstance();
		const props = {
			initValue: '',					 											//store里面初始值状态，如'',[],null ,undefined;
			store: ChangeTelNumberInfo,													//转输的数据包对象
			name: this.props.store.storeChangeTelNumber.ChangeTelNumberInfo,	 		//要清空的store盒子
			noClearParam: 'certificationStatus'											//不要清空的数据
		}, props2 = {
			initValue: '',					 											//store里面初始值状态，如'',[],null ,undefined;
			store: ChangeNewTelNumberInfo,												//转输的数据包对象
			name: this.props.store.storeChangeTelNumber.ChangeNewTelNumberInfo	 		//要清空的store盒子
		}, props3 = {
			initValue: false,
			store: this.props.store.storeChangeTelNumber,
			name: 'isFinishPototypeInfo' 											 		//要清空的store storeChangeTelNumber盒子
		};
		//清空对象
		AddRepairStore.__emptyAll(props);													//清空ChangeTelNumberInfo盒子
		AddRepairStore.__emptyAll(props2);													//清空ChangeNewTelNumberInfo盒子
		AddRepairStore.__emptyValue(props3);												//清空ChangeNewTelNumberInfo盒子

	}

	//组件的内部状态和生命周期
	//https://segmentfault.com/a/1190000011776013
}
