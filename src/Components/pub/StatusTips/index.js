/*共用的*/
import React from 'react';
/*antd-mobile*/
import { Button } from 'antd-mobile';
import PropTypes from 'prop-types';
import { WhiteSpace, WingBlank, Flex } from 'antd-mobile';

import './Component.less';
import green_sucessFlag from './green_sucessFlag.png';
import FailFlag from './FailFlag.png';

/*自定义类*/

class StatusTips extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};
	}

	static propTypes = {
		label: PropTypes.string.isRequired, //标签
		type: PropTypes.string.isRequired,//类型
	};

	shouldComponentUpdate (nextProps, nextState) {
		if (nextProps.label != this.props.label ||
			nextProps.type != this.props.type ||
			nextProps.describe != this.props.describe
		) return false;
		return true;
	}

	render () {
		console.log(FailFlag);
		const objCss = {
			width: '0.7rem',
			height: '0.7rem',
		};
		let { label, type, describe } = this.props;
		return (<div className={'msg-tip'} >
			<p className={'tips-icon'} ><img src={type == 'sucess' ? green_sucessFlag : FailFlag} style={objCss} /></p >
			
				<h3 className={'reason'} >{label}</h3 >
			<WingBlank size="lg" >
				<Flex >
					{describe}
				</Flex >
			</WingBlank >

		</div >);
	}
}

export default StatusTips;