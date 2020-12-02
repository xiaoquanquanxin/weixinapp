/*共用的*/
import React from 'react';
/*antd-mobile*/
import { Flex, WhiteSpace, Button, Steps, WingBlank, } from 'antd-mobile';
import PropTypes from 'prop-types';

import './Component.less';

/*自定义类*/

export default class Tempalate extends React.Component {
	static propTypes = {
		label: PropTypes.string.isRequired,
	};
	render () {
		let { label, width, height,bold,lineHeight } = this.props;
		const objCSS = {
			width: width? width: '',
			height:height? height: '',
			lineHeight: lineHeight? lineHeight+'px': '',
			fontWeight:bold? 'bold': 'nomarl'
		};
		return (<span className={'Components-Button-container'} style={objCSS}>
			<Button className={'classStyle'} style={objCSS} >{label}</Button >
		</span >);
	}
}
