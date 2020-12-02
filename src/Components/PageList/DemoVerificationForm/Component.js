/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle';
/*antd-mobile*/
import { WhiteSpace, WingBlank,Flex } from 'antd-mobile';

/*当前页面用到的*/
import StatusTips from '../../pub/StatusTips';

import VerificationForm from '../../pub/VerificationForm';
/*自定义类*/
import './Component.less';

@inject('store', 'actions')
@observer
class __C extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		const { store, actions } = this.props;
		return (
			<div >
				<WhiteSpace size="lg" />
				<VerificationForm  {...this.props.store}/>

			</div >
		);
	}

	//组件的内部状态和生命周期
	//https://segmentfault.com/a/1190000011776013
}

export default withSetTitle(__C, '页面1');