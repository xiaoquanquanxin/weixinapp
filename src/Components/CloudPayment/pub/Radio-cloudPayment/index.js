/*共用的*/
import React from 'react';
/*antd-mobile*/
import { Flex, Radio, WhiteSpace, Checkbox, Button, Steps, WingBlank, } from 'antd-mobile';
import PropTypes from 'prop-types';
import './Component.less';

const AgreeItem = Checkbox.AgreeItem;
/*自定义类*/

export default class Tempalate extends React.Component {
	constructor () {
		super();
		this.state = {
			checkValue: true
			, value: true
		};
	}

	static propTypes = {
		// label: PropTypes.string.isRequired,
	};
	onChange = (value) => {
		this.setState({
			value,
		}, () => {
			console.log('value', value);

		});
	};

	render () {
		return (<span className={'Components-Radio-container'} >
			 <AgreeItem data-seed="logId" onChange={e => console.log('checkbox', e)} >
              <a onClick={(e) => {e.preventDefault();alert('agree it');}} >同意</a >
          </AgreeItem >
		</span >);
	}
}
