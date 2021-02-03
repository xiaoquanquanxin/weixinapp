/*共用的*/
import React from 'react';
/*antd-mobile*/
import { List, Icon} from 'antd-mobile';
import PropTypes from 'prop-types';
import './Component.less';
import cancel from '../../img/cancel.png';
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
					<List.Item align="top" wrap thumb={cancel} extra={<span className={"Tipspan time"}>{ActiveTipdata.createTime}</span>}>
						{<span className={"Tipspan TipTitle"}>报名已取消</span>}
						<Brief>
							<span className={"Tipspan"}>您的报名已取消，期望您的下次参与！</span>
						</Brief>
					</List.Item>
				</List>
			</div>
		);
	}
}

export default __C;