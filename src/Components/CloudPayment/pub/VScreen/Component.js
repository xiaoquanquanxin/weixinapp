/*
模板
不需要noMbox功能
*/
/*共用的*/
import React from 'react';
/*antd-mobile*/
// import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
import { Modal } from 'antd-mobile';
/*当前页面用到的*/
//https://github.com/VicEcho/VDraggable
//https://developer.mozilla.org/en-US/docs/Web/API/Document/dragstart_event
import SignatureCavans from './SignatureCavans';
import TopBar from '../TopBar-cloudPayment/index'
/*自定义类*/
import './Component.less';

export default class VScreen extends React.Component {
	constructor (){
		super();
		this.state={
			transformNode: ''
		}
	}
	componentDidMount () {
		//console.log('[TemplateNoMbox] componentDidMount..')
		window.setWindowTitle('VScreen');
		this.addEventListenerScreen();

	}

	addEventListenerScreen = () => {
		if (window.orientation == 90 || window.orientation == -90) {
			alert('横屏状态！');
		}

		//监听屏幕方向
		window.onorientationchange = function () {
			switch (window.orientation) {
				case -90:
				case 90:
					alert('横屏:' + window.orientation);
				case 0:
				case 180:
					alert('竖屏:' + window.orientation);
					break;
			}
		};

		// 监听 orientation changes
		window.addEventListener('orientationchange', function (event) {
			// 根据event.orientation|screen.orientation.angle等于0|180、90|-90度来判断横竖屏
		}, false);

		window.addEventListener('resize', function (event) {
			var orientation = (window.innerWidth > window.innerHeight) ? 'landscape' : 'portrait';
			if (orientation === 'portrait') {
				// do something ……
			} else {
				// do something else ……
			}
		}, false);

	};
	/*关闭弹窗*/
	onClose = key => () => {
		const { modal } = this.props.store.storeWorkConduct;
		this.props.store.storeWorkConduct.modal = false;

	};

	render () {
		return <div className={`Components-VScreen-container transformNode `} >
			<TopBar
				hostry={this.props.history}
				title={'客户签名'}
				right={null}
			/>
			<SignatureCavans  />
		</div >;
	}

	//组件的内部状态和生命周期
	//https://segmentfault.com/a/1190000011776013

}
