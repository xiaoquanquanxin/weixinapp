/*共用的*/
import React from 'react';
/*antd-mobile*/
import { List, Icon} from 'antd-mobile';
import PropTypes from 'prop-types';
import './Component.less';
import chenggong from './chenggong.png';
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
					<List.Item align="top" wrap thumb={chenggong} extra={<span className={"Tipspan time"}>{ActiveTipdata.createTime}</span>}>
						{<span className={"Tipspan TipTitle"}>温馨提示</span>}
						<Brief>
							{/* <span className={"Tipspan"}>请带齐您的身份证、收楼资料，到指定办理地点进行收楼。</span> */}
							<span className={"Tipspan"}>1、系统为您智能匹配了以下收楼时间，如需更改，可点击“修改时间”进行变更。</span>
							<span className={"Tipspan tip2span"}>2、为了避免您的长时间等待，请您按预约的时间前往办理。</span>
						</Brief>
					</List.Item>
				</List>
			</div>
		);
	}
}

export default __C;