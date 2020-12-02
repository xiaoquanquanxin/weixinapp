/*共用的*/
import React from 'react';
/*antd-mobile*/
import { WhiteSpace, WingBlank } from 'antd-mobile';
/*当前页面用到的*/
/*自定义类*/
import './Component.less';

class RichTextDisplay extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		if (!this.props.children) return null;
		let content = this.props.children;
		console.log('content____________', content);
		console.log('content______2______', typeof content);
		if (typeof content == 'string') {
			content = this.props.children.replace(/\<!--.+?--\>/g, '');
			return <div className="Components-RichTextDisplay-container"
						dangerouslySetInnerHTML={{ __html: content || null }} />;
		} else {
			return content;

		}
	}
}

export default RichTextDisplay;