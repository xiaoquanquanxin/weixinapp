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
import Mybutton from '../../pub/MyButton';
import router from '../../../router';
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

export default class Template extends React.Component {
	static defaultProps = {
		buildArray: ['1号楼', '2号楼', '3号楼', '4号楼', '5号楼', '7号楼', '8号楼'],
		unitArray: ['1单元', '2单元','3单元', '4单元','5单元', '6单元','7单元', '8单元'],
		build: [{
			floor:10,
			room: [1,2,3,4,5],
			id:1
		},{
			floor:11,
			room: [1,2,3,4,5],
			id:2
		},{
			floor:12,
			room: [1,2,3,4,5],
			id:3
		}]
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
		actions.actionsAddRepair.incA();
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

	tabOnChange (selectedIndex) {
		return selectedIndex == this.state.tabIndex ? 'on' : '';

	}

	tabButtonStyle (selectedIndex) {
		return selectedIndex == this.state.tabButtonIndex ? 'on' : '';

	}

	extendAllTag = (target) => {
		const { buildArray } = this.props;
		if (buildArray.length > 5) {
			this.setState({
				//autoHeight:  (buildArray.length % 5)*52,
				tabIcon: this.state.tabIcon == '+' ? '-' : '+'
			});

			this.state.tabIcon == '+' ? this.setState({
				autoHeight: 'auto'
			}) : this.setState({
				autoHeight: 52
			});
		}

	};

	render () {
		const { store, actions } = this.props;
		const { files } = this.state;
		const { storeAddRepair } = store;
		//const { actionsAddRepair} = actions;
		const { tip, AddRepair } = storeAddRepair;

		//默认预约时间（不选择）
		AddRepair.appointmentTime = new Date(this.state.date).format('yyyy-MM-dd hh:mm:ss');
		return <div className={'Components-EntrustedHouseSelection-container'} >

			<Picker
				data={[{ label: '广州常春藤-G1-1-2802', value: '1', }, { label: '广州常春藤-G1-1-28022', value: '2', },]}
				cols={1}
				extra="请选择房间名称"
				value={this.state.sValue}
				onChange={v => {
					this.setState({ sValue: v });
				}}
				onOk={v => {
					/*AddRepair.partName = v + '';//注入store
					this.setState({ sValue: v });
					this._checkForm(AddRepair);	//检查是否有空项，选修改提交按纽状态*/
				}
				}
			>
				<List.Item arrow="horizontal" onClick={this.onClick} >房间名称</List.Item >
			</Picker >
			<WhiteSpace size="lg" />
			<SolidLine />
			{
				this.state.sValue && <div>
					<WingBlank >
						<Flex >
							<Flex.Item style={{ flex: 9, height: this.state.autoHeight }} >
								<div className="tag" >{
									this.props.buildArray.map((item, index) => {
										return <span className={`tagType ${this.tabOnChange(index)}`} onClick={() => {
											this.setState({
												tabIndex: index
											});
										}
										} key={index} >{item}</span >;
									})
								}
								</div >
							</Flex.Item >

							<Flex.Item style={{ flex: 1 }} >
								<div className={'extendAllTag'} onClick={this.extendAllTag} >{this.state.tabIcon}</div >
							</Flex.Item >
						</Flex >

						<SolidLine />

						<Flex className={'unitInfo'} >
							{
								this.props.unitArray.map((item, index) => {
									return <span key={index} className={this.tabButtonStyle(index)} onClick={() => {
										this.setState({
											tabButtonIndex: index
										});
									}
									} >{item}</span >;
								})
							}
						</Flex >

						<SolidLine />

						<div className={'floorInfo'} >
							{
								this.props.build.map((item, index) => {
									return  <div className={'floor'} key={index}>
										<p className={'floor-name'}>{item.floor}层</p>
										<div>{
											item.room.map((ele,inx)=>{
												return <span
													key={inx}
													className={'room'}
													onClick={() =>
														alert('信息确认', '广州常春藤-G1-1-2802', [
															{ text: '关闭', onPress: () => console.log('cancel') },
															{ text: '确认', onPress: () => console.log('ok') },
														])
													}
												>{ele}</span>
											})
										}</div>

									</div>;
								})
							}
						</div >

					</WingBlank >
					<WhiteSpace size="lg" />
					<SolidLine />
					<WhiteSpace size="lg" /><WhiteSpace size="lg" /><WhiteSpace size="lg" />
				</div>
			}
			{
					!this.state.sValue && (<WingBlank >
						<NoMessages label={'暂无消息'} />
					</WingBlank>)

			}




			{/*<WingBlank >
				<Mybutton callback={this.submit}
						  type={'blue'} label="委托交付" />
			</WingBlank >*/}


			<WhiteSpace size="lg" />
		</div >;
	}

}