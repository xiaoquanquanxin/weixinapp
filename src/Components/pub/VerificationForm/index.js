/*共用的*/
import React from 'react';
/*antd-mobile*/
import {
	Flex,
	Picker,
	Button,
	TextareaItem,
	InputItem,
	WhiteSpace,
	WingBlank,
	TabBar,
	DatePicker,
	List
} from 'antd-mobile';

import PropTypes from 'prop-types';
import Mybutton from '../../pub/MyButton';
import instance from '../../../../lib/utils/instance';
import { Toast } from 'antd-mobile/lib/index';

/*自定义类*/
class __C extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			colorStyle: false,
		};
	}

	//检查填项是否有空
	checkForm = (data) => {
		const array = [];
		// console.log('data______________', data);
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
				}, () => {
				});
			} else {
				this.setState({
					colorStyle: false
				}, () => {
				});
			}
		} else {
			Toast.info(`只支持数组和对象`,1);
		}


	};

	//提交
	submit = () => {
		alert(123);
	};

	render () {
		let { label, t } = this.props;
		let data = this.props.storeDemoVerificationForm.data;
		return <div >
			<WhiteSpace size="lg" /><WhiteSpace size="lg" />
			<p align="center" >注：按纽是否可以提交状态(方法可参考)</p >
			<WhiteSpace size="lg" /><WhiteSpace size="lg" />

			<Picker
				data={[{ label: 'Picker1', value: '1', }, { label: 'Picker2', value: '2', },]}
				cols={1}
				extra="请选择"
				value={this.state.sValue}
				onChange={v => {
					this.setState({
						sValue: v,
					});

				}}
				onOk={v => {
					data.pickerName = v + '';
					this.setState({ sValue: v });
					this.checkForm(data);
				}
				}
			>
				<List.Item arrow="horizontal" >Picker</List.Item >
			</Picker >


			<InputItem
				maxLength={100}
				placeholder="请输入"
				onChange={(e) => {
					data.InputItemName = e;
					this.checkForm(data);
				}
				}
			>test1</InputItem >


			<InputItem
				maxLength={100}
				placeholder="请输入"
				onChange={(e) => {
					data.InputItemName2 = e;
					this.checkForm(data);
				}
				}
			>test2</InputItem >

			<WhiteSpace size="lg" /><WhiteSpace size="lg" />
			<WingBlank >
				<Mybutton callback={this.submit} type={this.state.colorStyle ? 'blue' : 'grey'} label="提 交" />
			</WingBlank >

		</div >;
	}
}

export default __C;