/*共用的*/
import React from 'react';
/*antd-mobile*/
import { List, Icon} from 'antd-mobile';
import PropTypes from 'prop-types';
import './Component.less';
import success from '../../img/success.png';
const Item = List.Item;
const Brief = Item.Brief;
/*自定义类*/
class __C extends React.Component {
	constructor (props) {
		super(props);
	}
	render () {
		const { ActiveTipdata}=this.props
		return (
			<div className={"Component-ActiveTip-container"}>
				<List>
					<List.Item align="top" wrap thumb={success} extra={<span className={"Tipspan time"}>{ActiveTipdata.createTime}</span>}>
						{<span className={"Tipspan TipTitle"}>签到成功</span>}
						<Brief>
							<span className={"Tipspan"}>您已签到成功，感谢您的参加！</span>
						</Brief>
					</List.Item>
				</List>
			</div>
		);
	}
}

export default __C;