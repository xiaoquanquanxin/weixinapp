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
import Mybutton from '../../../pub/MyButton/index';
import StatusTips from '../../../pub/StatusTips/index';

/*自定义类*/
import './Component.less';

/*@inject('store', 'actions')
@observer*/

const WarpperHocComponent=(arg)=> (WapperComponent) =>{

	return class MyWapperComponent extends React.Component{
		constructor(props) {
			super(props);
		}
		// 生命周期方法
		componentDidMount(){
			/*if (this._componentDidMount) {
				this._componentDidMount();
			}*/
		}

		render() {
			return (<div><WapperComponent>test</WapperComponent></div>)


		}

	}

};

module.exports.WarpperHocComponent=WarpperHocComponent;