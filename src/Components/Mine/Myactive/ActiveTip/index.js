/*共用的*/
import React from 'react';
/*antd-mobile*/
import { List, Icon} from 'antd-mobile';
import PropTypes from 'prop-types';
import './Component.less';
const Item = List.Item;
const Brief = Item.Brief;
/*自定义类*/
class __C extends React.Component {
	constructor (props) {
		super(props);
	}
	render () {
		return (
			<div className={"Component-ActiveTip-container"}>
				<List>
					<List.Item align="top" wrap thumb={<Icon type="check-circle" color="#fff" />} extra={<span className={"Tipspan time"}>04-16 11:04</span>}>
						{<span className={"Tipspan TipTitle"}>报名成功</span>}
						<Brief>
							<span className={"Tipspan"}>您已报名成功，感谢您的参加</span>
						</Brief>
					</List.Item>
				</List>
			</div>
		);
	}
}

export default __C;