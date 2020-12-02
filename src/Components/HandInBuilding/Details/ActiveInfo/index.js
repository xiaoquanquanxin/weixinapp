/*共用的*/
import React from 'react';
/*antd-mobile*/

import PropTypes from 'prop-types';
import './Component.less';
import addressimg from '../../img/address.png';
import { Flex, WhiteSpace, List, WingBlank } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
/*自定义类*/
class ActiveInfo extends React.Component {
	constructor(props) {
		super(props);
	}
	static propTypes = {
		ActiveInfodata: PropTypes.object,
	};
	render() {
		const { ActiveInfodata} = this.props;
		return (
			<div className="Component-ActiveInfo-container">
				<List>
					<Item wrap multipleLine>
						{<span className="InfoTitle">{ActiveInfodata.title}</span>}
						<Brief>
							<p className="Infospan">
								<span>预约时间：</span>
								{/* orderDay +“ ”+orderStartTimeSlot+"-"+orderEndTimeSlot */}
								<span>{ActiveInfodata.orderDay}&nbsp;&nbsp;{ActiveInfodata.orderStartTimeSlot}-{ActiveInfodata.orderEndTimeSlot}</span>
							</p>
							<p className="Infospan">
								<span>办理地点：</span>
								<span onClick={() => { window.location.href = ActiveInfodata.addressUrl }}><img src={addressimg} />{ActiveInfodata.handleAddress}</span>
							</p>
						</Brief>
					</Item>
				</List>
			</div>);
	}
}

export default ActiveInfo;