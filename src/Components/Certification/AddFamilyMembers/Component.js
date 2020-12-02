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
	Checkbox,
	Toast,
	Icon,
	TextareaItem,
	DatePicker,
	List
} from 'antd-mobile';
import router from '../../../router';
import Mybutton from '../../pub/MyButton/index';
import VerificationParameter from '../../pub/VerificationParameter';
import VerificationMobileFormat from '../../pub/VerificationMobileFormat';
import ProjectSelect from './ProjectSelect';
/*当前页面用到的*/

/*自定义类*/
import './Component.less';
import EmptyStoreData from '../../pub/EmptyStoreData';
const alert = Modal.alert;
@inject('store', 'actions')
@observer
export default class Template extends React.Component {
	state = {
		colorStyle: false,
		fillNofinish: true
	};
	

	componentDidMount () {
		window.setWindowTitle('添加家庭成员');
		const { store, actions } = this.props;
		const { storeAddFamilyMembers } = store;
		const { actionsAddFamilyMembers } = actions;
		const { AddFamilyMembers, } = storeAddFamilyMembers;
		actionsAddFamilyMembers.userFamily();
		
		// const id = this.props.match.params.id; //要修改的家庭成员ID
		// if (id) {
		// 	actionsAddFamilyMembers.userFamily(id);
		// }

		/*查编辑家庭成员的信息*/
		// let arg = window.getQueryString();
		// if (arg && arg.id && arg.authuserid) {
		// 	actionsAddFamilyMembers.userFamily(arg);
		// }else{
		// 	actionsAddFamilyMembers.userFamily();
		// }
		//console.log(2222222222, this.props.history)

	}

	/*提交*/
	submit = () => {
		const { store, actions } = this.props;
		const { storeAddFamilyMembers } = store;
		const { actionsAddFamilyMembers } = actions;
		const { AddFamilyMembers } = storeAddFamilyMembers;
		//较验电话号码格式
		const boolean = VerificationMobileFormat.checkMobile(AddFamilyMembers.phoneNo);
		console.log(boolean)
		if (!boolean) return false;
		const body = {
			fullName: AddFamilyMembers.fullName,
			phoneNo: AddFamilyMembers.phoneNo,
			identityNo: AddFamilyMembers.identityNo,
			sex: AddFamilyMembers.sex,
			birthday: AddFamilyMembers.birthday,
			userType: AddFamilyMembers.userType,
			id: this.props.match.params.id
		};

		if (this.props.match.params.id) {
			//修改操作
			alert('提示', '确定要修改？', [
				{ text: '关闭', onPress: () => console.log('cancel') },
				{
					text: '确定', onPress: () => {
						const o = actionsAddFamilyMembers.updateFamilyUser(body);
						o.then((txt) => {
							if (txt == 0) {
								this.props.history.goBack(-1)
							}
						});
					}
				},
			]);


		} else {
			//添加操作
			alert('提示', '确定要增加？', [
				{ text: '关闭', onPress: () => console.log('cancel') },
				{
					text: '确定', onPress: () => {
						const o = actionsAddFamilyMembers.addFamilyUser(body);
						o.then((txt) => {
							if (txt == 0) {
								this.props.history.push(router.CertificationStatus);
							}
						});
					}
				},
			]);




		}

	};



	render () {

		const { store, actions } = this.props;
		const { storeAddFamilyMembers } = store;
		const { actionsAddFamilyMembers } = actions
		
		const { AddFamilyMembers, getRoomInfo, ProjectSelectvalarr, Foldval, colorStyle, ProjectSelectval, getUserInfoByParamval, roomName } = storeAddFamilyMembers;
		const { submit, submitedit, ProjectSelectfun, Fold, ProjectSelectOK, _checkForm, getUserInfoByParam } = actionsAddFamilyMembers
		const argid = window.getQueryString();
		const nowTimeStamp = Date.now();
		//let minDate = new Date(nowTimeStamp - 10000000)
		//console.log(nowTimeStamp,minDate)
		//console.log('要修改的家庭成员ID_________________________', colorStyle, AddFamilyMembers);
		return (
			<div className={'Components-AddFamilyMembers-container'} >
				<WhiteSpace size="lg" />

				<List >
					<InputItem
						placeholder="请输入手机电话"
						value={AddFamilyMembers.phoneNo}
						maxLength={11}
						onChange={(e) => {
							VerificationMobileFormat.setCallerNumber(e) ? AddFamilyMembers.phoneNo = e : AddFamilyMembers.phoneNo = '';
							_checkForm(AddFamilyMembers);
							getUserInfoByParam(AddFamilyMembers)
						}
						}
					>手机电话</InputItem >

					<InputItem
						placeholder="请输入身份证号"
						maxLength={18}
						value={AddFamilyMembers.identityNo}
						onChange={(e) => {
							AddFamilyMembers.identityNo = e;
							// VerificationMobileFormat.setCallerNumber(e) ? AddFamilyMembers.personId = e : AddFamilyMembers.personId = '';
							_checkForm(AddFamilyMembers);
							getUserInfoByParam(AddFamilyMembers)
						}}
					>身份证号</InputItem >

					<InputItem
						placeholder="请输入姓名"
						maxLength={11}
						value={AddFamilyMembers.fullName}
						onChange={(e) => {
							AddFamilyMembers.fullName = e;
							_checkForm(AddFamilyMembers);
						}
						}
					>姓名</InputItem >
				</List >


				<Picker
					extra={argid && argid.id && argid.authUserId || !!getUserInfoByParamval ? AddFamilyMembers.sex == 1 ? '男' : '女' : ''}
					data={[{ label: '男', value: '1', }, { label: '女', value: '2', },]}
					cols={1}
					value={this.state.sValueSex}
					onChange={v => this.setState({ sValueSex: v })}
					onOk={v => {
						this.setState({ sValueSex: v });
						AddFamilyMembers.sex = v + '';
						_checkForm(AddFamilyMembers);
					}}
				>
					<List.Item arrow="horizontal" >性别</List.Item >
				</Picker >


				<DatePicker
					extra={argid && argid.id && argid.authUserId || !!getUserInfoByParamval ? new Date(AddFamilyMembers.birthday).format('yyyy-MM-dd') : ''}
					mode="date"
					maxLength={100}
					value={this.state.date}
					minDate={new Date(1930, 1, 1, 23, 59, 59)}
					onChange={date => {
						AddFamilyMembers.birthday = new Date(date).format('yyyy-MM-dd');
						this.setState({ date });
						_checkForm(AddFamilyMembers);
					}}
				>
					<List.Item arrow="horizontal" >出生日期</List.Item >
				</DatePicker >


				<Picker
					extra={argid && argid.id && argid.authUserId && AddFamilyMembers.userType!==''?AddFamilyMembers.userType == 2 ? '家属' : '租户':'' }
					data={[{ label: '家属', value: '2', }, { label: '租户', value: '3', }]}
					cols={1}
					value={this.state.sValue}
					onChange={v => this.setState({ sValue: v })}
					onOk={v => {
						this.setState({ sValue: v });
						AddFamilyMembers.userType = v + '';
						_checkForm(AddFamilyMembers);
					}}
				>
					<List.Item arrow="horizontal" >客户类型</List.Item >
				</Picker >
				{<ProjectSelect
					Foldval={Foldval}
					ProjectSelectval={ProjectSelectval}
					ProjectSelectfun={ProjectSelectfun.bind(this)}
					Fold={Fold.bind(this)}
					ProjectSelecData={getRoomInfo}
					ProjectSelectvalarr={ProjectSelectvalarr}
					ProjectSelectOK={ProjectSelectOK.bind(this)} 
					/>}
				<div className={"project"} onClick={() => { Fold(Foldval) }}><span>关联房产</span><span><i>{roomName ? roomName : "请选择"}</i><Icon type={"right"} color={'#C7C7CC'} /></span></div>
				
				<WhiteSpace size="lg" />
				<WhiteSpace size="lg" />
				{
					
					argid && argid.id && argid.authUserId ? <WingBlank >
						<Mybutton callback={() => { colorStyle &&submitedit(this.props.history, argid.id, argid.authUserId)}}
							type={colorStyle ? 'blue' : 'grey'} label="确定修改" />
						{/*<Mybutton callback={this.submit} type={'blue'} label="提 交" />*/}
					</WingBlank > : <WingBlank >
							<Mybutton callback={()=>{colorStyle && submit(this.props.history)}}
								  type={colorStyle ? 'blue' : 'grey'} label="确定添加" />
						{/*<Mybutton callback={this.submit} type={'blue'} label="提 交" />*/}
					</WingBlank >
				}


				<WhiteSpace size="lg" />
				<WhiteSpace size="lg" />
			</div >
		);
	}

	componentWillUnmount () {
		const { store, actions } = this.props;
		const { storeAddFamilyMembers } = store;
		const { actionsAddFamilyMembers } = actions;
		const { AddFamilyMembers } = storeAddFamilyMembers;
		const SubmitCertificationStore = EmptyStoreData.getCurrentInstance();
		const props = {
			initValue: '',					 											//store里面初始值状态，如'',[],null ,undefined;
			store: AddFamilyMembers,													//转输的数据包对象
			name: this.props.store.storeAddFamilyMembers.AddFamilyMembers,				//要清空的store盒子
			noClearParam: 'certificationStatus'											//不要清空的数据
		};
		SubmitCertificationStore.__emptyAll(props);
		// actionsAddFamilyMembers.init(props);
	}

	//组件的内部状态和生命周期
	//https://segmentfault.com/a/1190000011776013
}