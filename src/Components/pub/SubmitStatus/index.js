/*共用的*/
import React from 'react';
/*antd-mobile*/
import { Flex, Button,TextareaItem, WhiteSpace, WingBlank, TabBar, DatePicker, List } from 'antd-mobile';

import PropTypes from 'prop-types';
import './Component.less';

/*自定义类*/
class __C extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			arrowClassName: 'arrow'
		};
	}

	static propTypes = {
		showRecord: PropTypes.bool,
		disabled: PropTypes.bool,
		imgUrl: PropTypes.array,
		audioUrl: PropTypes.array,
		urlPrefix: PropTypes.string,
		label: PropTypes.string.isRequired, //标签
		t: PropTypes.number.isRequired//类型
	};

	toggleBtn = (e) => {
		this.setState({
			arrowClassName: this.state.arrowClassName == 'arrow' ? 'down' : 'arrow'
		}, () => {
			console.log('e___', e);
		});

	};


	render () {
		let { label, t } = this.props;
		return <div className="Components-TextArea-container" onClick={this.toggleBtn} >
			<TextareaItem
				// ref={this.setImageFileInputRef}
				value={this.state.value}
				disabled={this.props.disabled}
				placeholder={this.props.renderHeader()}
				rows={6}
				onChange={this.onChange.bind(this)}
				onBlur={this.clearData.bind(this)}
			/>

		</div >;
	}
}

export default __C;