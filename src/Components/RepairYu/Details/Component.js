/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle';
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, TabBar, DatePicker, List, Modal } from 'antd-mobile';
import WorkDeatils from './WorkDetails/Component';
import Notice from './Notice/Component';
import WorkRouter from './WorkRouter/Component';
import Mybutton from '../../pub/MyButton';
import star_yellow from './stat_yellow.png';
import ModalDIY from './Modal2';

/*当前页面用到的*/

/*自定义类*/
import './Component.less';
import router from '../../../router';

@inject('store', 'actions')
@observer
export default class Template extends React.Component {
	constructor () {
		super();
		this.state = {
			modal2: false,
			indexStar: 0
		};
	}
	state = {
		arrowStatus: true
	};

	componentDidMount () {
		//console.log('[Template] componentDidMount..')
		const { store, actions } = this.props;
		const { storeRepairDetailsYu } = store
		const { actionsRepairDetailsYu } = actions;
		window.setWindowTitle(this.props.match.params.type == 1 ? '房屋报修-详情' :'投诉建议-详情');
		storeRepairDetailsYu.type = this.props.match.params.type
		actionsRepairDetailsYu.getDeatail(this.props.match.params.id);
		actionsRepairDetailsYu.getDetailRouter(this.props.match.params.id);
		console.log(this.props, this.props.match.params.id,)
	}
	submit = () => {
		this.setState({
			modal2: true,
		});
	};
	onCloseEvent () {
		this.setState({
			modal2: false,
		});
	};


	render () {
		const objCss = {
			height: '100vh',
			overflow: 'hidden'
		};
		const objCss1 = {
			height: '100vh',
		};
		const { store, actions } = this.props;
		const { storeRepairDetailsYu } = store
		const renderTel = [<div key={1} >400电话：<span className={'blue'} >400-2333-432</span ></div >];
		
		let statusdata = this.props.match.params.status;
		console.log(111111111111111111111, this.props)
		//const { actionsTemplate} = actions;
		const commentListThreeStar=['服务态度恶劣','维修在质量差','现场脏乱差','维修时间长','工人不文明','工程师不负责','不守时不守约','索要好评'];
		const commentListFiveStar=['服务好','响应快','维修快','维修质量好','高效专业','现场整洁','准时守约','工程师负责'];
		const commentList=[commentListThreeStar,commentListFiveStar]
		return <div className={'Components-Repair-Details-container'} style={this.props.store.storeRepairDetailsYu.flag ? objCss : objCss1} >
			{/*报修详情*/}
			<WorkDeatils {...storeRepairDetailsYu.workDeatail} {...this.props}> </WorkDeatils >
			<WhiteSpace />
			{/*路由*/}
			<WorkRouter data={storeRepairDetailsYu.routerDeatail}/>
			{/*提醒*/}
			{/* <Notice
				label={'您提交的报修单正在处理，看到后我们派人第一时间与您联系，如有疑问请拨打400电话。'}
				CustomerService={renderTel}
			/> */}
			<WhiteSpace size="lg" /><WhiteSpace size="lg" />
			<WingBlank >
				{
					storeRepairDetailsYu.workDeatail.status != 10 && statusdata==2?<Mybutton callback={this.submit} type="blue" label="评 价" /> : ""
				}
			</WingBlank >
			<ModalDIY
				visible={this.state.modal2}
				onCloseEvent={()=>{
					this.onCloseEvent()
				}}
				commentList={commentList}
				id={this.props.match.params.id}
				type={storeRepairDetailsYu.type}
			/>
		</div >;
	}


}