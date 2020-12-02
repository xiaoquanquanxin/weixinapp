/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle';
/*antd-mobile*/
import { List, InputItem, Checkbox, Flex, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import Mybutton from '../../pub/MyButton/index';
import StatusTips from '../../pub/StatusTips/index';
import VerificationCode from '../../pub/VerificationCode/index';

const CheckboxItem = Checkbox.CheckboxItem;
import LayoutContainerOne from '../../pub/LayoutContainersOne';
/*当前页面用到的*/
import header from './header.png';
import addIcon from './add.png';
import editIcon from './edit.png';
import deleteIcon from './delete.png';

/*自定义类*/
import './Component.less';

@inject('store', 'actions')
@observer
export default class Template extends React.Component {
	state = {
		// telNumber: false
		array: [],
		editStatus: false
	};

	componentDidMount () {
		window.setWindowTitle('房产认证');
		const { store, actions } = this.props;
		const { actionsFamilyMembers } = actions;
		window.setWindowTitle('我的');

		/* 用户信息*/
		const useInfo = { sessionKey: 'a8e19cc85f6779758c6d004cf22bb28b' };
		const o = actionsFamilyMembers.userInfo(useInfo);
		o.then((txt) => {
			if (txt == 0) {
				const { storeFamilyMembers } = store;
				const { useInfo } = storeFamilyMembers;
				this.setState({
					array: useInfo
				});
			}
		});

		/*家庭成员信息*/
		const body = {
			sessionKey: 'a8e19cc85f6779758c6d004cf22bb28b'
		};
		actionsFamilyMembers.userFamily(body);
	}

	submit () {
		alert('123');
	}

	onChange = (val) => {
		console.log(val);
	};

	/*编辑成员*/
	editFamily = (item,index) => {
		const { store, actions } = this.props;
		const { storeFamilyMembers } = store;
		const { userFamily } = storeFamilyMembers;
		userFamily[index].editStatus=true;
	};

	outfoucs = (index) =>{
		const { store, actions } = this.props;
		const { actionsFamilyMembers } = actions;
		const { storeFamilyMembers } = store;
		const { userFamily } = storeFamilyMembers;
		userFamily[index].editStatus=false;
		const body={
			...userFamily[index]
		};
		actionsFamilyMembers.updateFamilyUser(body);

	};

	render () {
		const { store, actions } = this.props;
		const { storeFamilyMembers } = store;
		const { useInfo,userFamily } = storeFamilyMembers;


		console.log('ding____________', userFamily)

		return (
			<div className={'Components-FamilyMembers-container'} >
				<div className={'Components-DemoLayout-container '} >
					<LayoutContainerOne height={110} >
						<div type="header" >
							<header >
								<Flex className={'OwnerComment-header'} >
									<div className={'header-img'} >
										<img src={useInfo.userLogo || header} />
									</div >
									<div className={'info'} >
										<p className={'owner'} ><span >{useInfo.fullName || ''}</span ><span
											className={'hasCheck'} >{useInfo.authStatus && useInfo.authStatus == '1' ? '已认证' : '未认证'}</span >
										</p >
										<p className={'smallFont'} >{useInfo.phoneNo || ''}</p >
									</div >
								</Flex >
							</header >
						</div >
						<div type="content" >

							{
								(userFamily && userFamily.length>0 && userFamily.peek()) .map((item, index) => {
									if (userFamily[index].fullName ){
										return (<ul className={'list-item'} key={index} >
											<li >
												<div >
													{
														!item.editStatus ?<span className={'use-name'}>{userFamily[index].fullName}  </span>:
												 	<span>
														<InputItem
															className={'use-name-input'}
															value={userFamily[index].fullName}
															onBlur={()=>{
																this.outfoucs(index)}
															}
															onChange={(e) => {
																userFamily[index].fullName=e;
															}
															}
														/>
												</span>
													}

												</div >
												<div className={'grayColor'} >

													<Flex>
														<Flex.Item>{
															!item.editStatus ? <span>性别：{item.sex == 1 ? '男' : '女'} </span>:
																<span className={'sex-style'}>性别：
																<select onChange={(e)=>{
																	const { store } = this.props;
																	const { storeFamilyMembers } = store;
																	const { userFamily } = storeFamilyMembers;
																	userFamily[index].sex=e.target.value;
																	this.outfoucs(index)
																}
																}>
																	<option value={1}>男</option>
																	<option value={2}>女</option>
																</select>
															</span>
														}
															&nbsp;&nbsp;&nbsp; &nbsp;
														</Flex.Item>


														<Flex.Item>

															{
																!item.editStatus ? <span>电话：{item.phoneNo}</span>:

																	<Flex>
																		<Flex.Item style={{flex: 1.5}}> 电话：</Flex.Item>
																		<Flex.Item style={{flex: 3.5}}><InputItem
																			className={'use-name-input'}
																			value={userFamily[index].phoneNo}
																			onBlur={()=>{
																				this.outfoucs(index)}
																			}
																			onChange={(e) => {
																				userFamily[index].phoneNo=e;
																			}
																			}
																		/></Flex.Item>
																	</Flex>

															}
														 </Flex.Item>
													</Flex>




													</div >
												<Flex className={'editInfo'} >
													<Flex.Item onClick={() => {
														this.editFamily(item,index);
													}} ><img src={editIcon} /> 编辑</Flex.Item >
													<Flex.Item ><img src={deleteIcon} /> 删除</Flex.Item >
												</Flex >

											</li >
										</ul >);
									}


								})
							}


							<WhiteSpace size="lg" /> <WhiteSpace size="lg" />
							<Flex >
								<div className={'addFamily grayColor'} ><p ><img src={addIcon} /></p > <p
									className={'m_top10'} >添加家庭成员</p ></div >
							</Flex >
						</div >


					</LayoutContainerOne >
				</div >
			</div >
		);
	}

	//组件的内部状态和生命周期
	//https://segmentfault.com/a/1190000011776013
}