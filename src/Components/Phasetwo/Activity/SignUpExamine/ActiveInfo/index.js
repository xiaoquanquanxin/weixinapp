/*共用的*/
import React from 'react';
/*antd-mobile*/

import PropTypes from 'prop-types';
import './Component.less';
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
								<span>活动时间：</span>
								{/* orderDay +“ ”+orderStartTimeSlot+"-"+orderEndTimeSlot */}
								<span>{ActiveInfodata.activityStartTime}~{ActiveInfodata.activityEndTime}</span>
							</p>
							<p className="Infospan">
								<span>活动地点：</span>
								<span>{ActiveInfodata.activityAddress}</span>
							</p>
						</Brief>
					</Item>
				</List>
			</div>);
	}
}

export default ActiveInfo;
