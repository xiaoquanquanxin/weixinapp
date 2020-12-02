/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle';
/*antd-mobile*/
import { WhiteSpace, WingBlank, Flex, InputItem } from 'antd-mobile';
import Mybutton from '../../pub/MyButton';
/*当前页面用到的*/
import StatusTips from '../../pub/StatusTips';

import VerificationForm from '../../pub/VerificationForm';
/*自定义类*/
import './Component.less';
import VerificationMobileFormat from '../../pub/VerificationMobileFormat';

@inject('store', 'actions')
@observer
class __C extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			tel: ''
		};
	}

	submit = () => {
		const boolean = VerificationMobileFormat.checkMobile(this.state.tel);
		if (boolean) {
			alert('验证成功');
		}

	};

	render () {
		return (
			<div >
				<WhiteSpace size="lg" />
				<WhiteSpace size="lg" />

				<InputItem
					align={'right'}
					maxLength={11}
					placeholder="请输入联系电话"
					value={this.state.tel}
					onChange={(e) => {
						if (VerificationMobileFormat.setCallerNumber(e)) {
							this.setState({
								tel: e
							})
						} else {
							this.setState({
								tel: ''
							})
						}
					}
					}
				>联系电话</InputItem >

				<WhiteSpace size="lg" />
				<WhiteSpace size="lg" />


				<WingBlank >
					<Mybutton callback={this.submit} type={'blue'} label="提 交" />
				</WingBlank >
			</div >
		);
	}

	//组件的内部状态和生命周期
	//https://segmentfault.com/a/1190000011776013
}

export default withSetTitle(__C, '页面1');