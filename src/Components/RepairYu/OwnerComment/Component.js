/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle';
import header from './header.png';
import {WarpperHocComponent} from './WarpperHocComponent/Component';
import QusetionItem from "./QuestionsItem/Component"
import {IconStar} from './IconStar/Component';



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
import Mybutton from '../../pub/MyButton';


/*自定义类*/
import './Component.less';
@WarpperHocComponent('test')

@inject('store', 'actions')
@observer

export default class Template extends React.Component {
	constructor () {
		super();
		this.state = {
			starArrayIndex: []
		};
	}

	state = {};

	componentDidMount () {
		//console.log('[Template] componentDidMount..')
		window.setWindowTitle('业主评价 ');
	}

	submit () {
		alert(123);
	}

	onClick = (e) => {
		console.log(e);
	};


	render () {
		const { store, actions } = this.props;
		const { storeTemplate } = store;
		//const { actionsTemplate} = actions;
		const { tip } = storeTemplate;
		return <div className={'Components-Repair-OwnerComment-container'} >

			{/* <Flex className={'OwnerComment-header'} >
				<div className={'header-img'} >
					<img src={header} />
				</div >
				<div className={'info'} >
					<p className={'owner'} ><span >楼管：小林</span > <span >好评率：<span className={'red'} >98%</span ></span >
					</p >
					<p className={'grayColor smallFont'} >跟进时间：2019-08-11 15:2</p >
				</div >
			</Flex > */}
			<WhiteSpace size="lg" />
			<div className={'comment'} >
				<p >你对处理结果是否感到满意</p >
				<IconStar />
			</div >


			{/* <div className={"question-list"}>
				<span className={'grayBg relative_div'}>报修渠道是否通畅？ <i className={"act"} /> <i className={'act-txt'}>是</i></span>
				<span className={'grayBg relative_div'}>报修后，工作人员是否及时响应，并预约上门时间？ <i className={"act"} /> <i className={'act-txt'}>否</i></span>
				<span className={'yellowBg'}>报修人员是否讲解方案？</span>
				<span>维修实施前，维修人员是否采取成品保护措施?</span>
				<span className={'yellowBg'}>维修结束后，维修人员是否对维修造成的垃圾进行完工清洁？</span>

			</div> */}
			<WhiteSpace size="lg" />
			<WhiteSpace size="lg" />
			{/* <WingBlank >
				<div clasName={""}>1、工作人员是否及时响应</div>
				<Flex>
					<Flex.Item><Button type="primary" style={{background: '#55C54D'}}>是</Button></Flex.Item>
					<Flex.Item><Button type="warning"  size={'md'}>否</Button></Flex.Item>
				</Flex>
			</WingBlank > */}
			<QusetionItem />
			<QusetionItem />
			<QusetionItem />
			<WhiteSpace size="lg" />
			<WhiteSpace size="lg" />
			<WingBlank >
				<Mybutton callback={this.submit} type={'blue'} label="提 交" />
			</WingBlank >

		</div >;
	}
}