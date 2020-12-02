/*共用的*/
import React from 'react';
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
import { Modal } from 'antd-mobile';
/*自定义类*/
import './Component.less';
import PropTypes from 'prop-types';

export default class RowFlex extends React.Component {
	static propTypes = {
		lable: PropTypes.string,
		text: PropTypes.string,
	}

	render () {
		const { lable,text } = this.props;
		return <Flex className={'Components-RowFlex-container'} >
			<Flex.Item className={'label'} >{lable}</Flex.Item >
			<Flex.Item className={'item'} >{text}</Flex.Item >

		</Flex >;
	}
}