/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';

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
    Result
} from 'antd-mobile';

const alert = Modal.alert;
import StatusTips from '../pub/StatusTips';
import router from '../../router'
const developingIcon = require('./developing.png');
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
const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" style={{width:'100%', height:'100%'}}/>;

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
		window.setWindowTitle(this.props.match.params.type ? this.props.match.params.type == 1 ? '房屋报修' : '投诉建议': '');
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
	toHistory = () =>{
		// RepairListYu: [															//禹洲-房屋报修--列表
		// 	'/RepairListYu',
		// 	'/RepairListYu/:type'
		// ],
        console.log(this.props.history);
		console.log(1)
		this.props.history.goBack();
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
		return <div className={'Components-Developing-container'} >
			<div >
                <Result
                    img={myImg(developingIcon)}
                    title="努力建设中..."
                    className={'developing-result'}
                />
            </div >
            <WhiteSpace size="lg" />
			<WingBlank>
				<div style={{ textAlign: "center" }}>
					<div className={"btnReturn"} style={{ display: "inline-block", background: "#3890F9" }} onClick={() => {this.toHistory()}}>
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