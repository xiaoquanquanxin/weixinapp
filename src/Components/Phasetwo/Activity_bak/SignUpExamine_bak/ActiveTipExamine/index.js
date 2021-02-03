/*共用的*/
import React from 'react';
/*antd-mobile*/
import { List, Icon} from 'antd-mobile';
import PropTypes from 'prop-types';
import './Component.less';
import examine from '../../img/examine.png';
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
					<List.Item align="top" wrap thumb={examine} extra={<span className={"Tipspan time"}>{ActiveTipdata.createTime}</span>}>
						{<span className={"Tipspan TipTitle"}>待审核</span>}
						<Brief>
							<span className={"Tipspan"}>请及时关注活动状态，我们将在三个工作日内对您的信息进行审核。</span>
						</Brief>
					</List.Item>
				</List>
			</div>
		);
	}
}

export default __C;