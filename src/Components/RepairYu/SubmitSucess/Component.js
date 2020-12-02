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
import MyButton from '../../pub/MyButtonYu';
import StatusTips from '../../pub/StatusTips';
import router from '../../../router'
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
			type:"",//类型 1，报修 2投诉
		}
	}
	componentDidMount () {
		//console.log('[Template] componentDidMount..')
		window.setWindowTitle(this.props.match.params.type == 1 ? '房屋报修' : '投诉建议');
		// console.log("~~~~~~~~",this.props.location.search);
		// let id = window.getQueryString("id");
		// console.log("1111111", id);
		// let code = window.getQueryString("code");
		// this.setState({
		// 	id: window.getQueryString("id"),
		// 	code: window.getQueryString("code"),
		// 	type: window.getQueryString("type"),
		// })
	}
	onClick = (e) => {
		console.log(e);
	};
	toHome = () =>{
		// RepairListYu: [															//禹洲-房屋报修--列表
		// 	'/RepairListYu',
		// 	'/RepairListYu/:type'
		// ],
		console.log(1)
		this.props.history.push('/');
	}
	toDeatail = () =>{
		// RepairDetailsYu: [														 //禹洲-房屋报修--详情
		// 	'/RepairDetailsYu',
		// 	'/RepairDetailsYu/:type',														//类型(1)
		// 	'/RepairDetailsYu/:type/:id'										//状态(2)
		// ],
		this.props.history.push(`${router.RepairDetailsYu[0]}/${this.state.type}/${this.state.id}`);
	}
	render () {
		const { store, actions } = this.props;
		const { storeTemplate } = store;
		//const { actionsTemplate} = actions;
		const type = this.props.match.params.type
		return <div className={'Components-Repair-SubmitSucess-container'} >
			<div ><StatusTips
				type={'sucess'}
				label={type == 1 ? '报事提交成功！' :'报事提交成功！'}
				describe={<div className={'describe'}>
					<p >
                        您的报事我们已收到，我们的工作人员会第一时间与您联系，如有疑问请拨打
                        <a href='tel:400-008-0808'> 400-008-0808 </a>
                        ，我们将竭诚为您服务！</p>
				</div>}
			/></div >
			<WingBlank>
				<div style={{ textAlign: "center" }}>
					<div className={"btnReturn"} style={{ display: "inline-block", background: "#3890F9" }} onClick={() => {this.toHome()}}>
						{/* <MyButton width={147} callback={this.toHome.bind(this)} hasimg={false} type={'blue'} label={'返回'} /> */}
						<div className={"gobackButton"}>返回</div>
					</div>
				</div>
			</WingBlank>
			<WhiteSpace size="lg" />
			<WhiteSpace size="lg" />
		</div >;
	}
}