/*共用的*/
import React from 'react';
/*antd-mobile*/
import { List } from 'antd-mobile';
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
		const { ActiveItemdata}=this.props
		let sex = ["未知","男","女"]
		return (
			<div className={"Component-StaffStatus-container"}>
				<List>
					<List.Item align="top" extra={this.props.hasstatus==true?<div className="statusButton" style={{color:`${this.props.color}`,border:`1px solid ${this.props.color}`}}>{this.props.statusName}</div>:null}>
						{ActiveItemdata.userName}
						<Brief>
							<span className={"sex"}>性别：{sex[ActiveItemdata.sex]}</span>
							<span className={"PhoneNumber"}>电话：{ActiveItemdata.phoneNo}</span>
						</Brief>
						{
							this.props.hasIDCard == true ? <Brief>身份证号码：{ActiveItemdata.identityNo}</Brief> : null
						}
					</List.Item>
				</List>
			</div>
		);
	}
}

export default __C;