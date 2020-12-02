/*共用的*/
import React from 'react';
/*antd-mobile*/

import PropTypes from 'prop-types';
import './Component.less';
import { Flex, WhiteSpace, List, WingBlank } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
/*自定义类*/
class __C extends React.Component {
	constructor(props) {
		super(props);
	}
	static propTypes = {
		
	};
	render() {
		return (
			<div className="Component-ActiveInfo-container">
				<List>
					<Item wrap arrow="horizontal" multipleLine>
						{<span className="InfoTitle">实地地产"常在心"多彩生活，我形我塑活动开始...</span>}
						<Brief>
							<p className="Infospan">
								<span>活动时间:</span>
								<span>2019-04-12</span>
							</p>
							<p className="Infospan">
								<span>活动地点:</span>
								<span>常春藤售楼中心</span>
							</p>
						</Brief>
					</Item>
				</List>
			</div>);
	}
}

export default __C;