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
		return (
			<div className={"Component-ActiveStaffItem"}>
				<List>
					<List.Item extra={this.props.isedit == true ? <span className={"editspan"}><i></i><span className="text">编辑</span></span>:null}>
						{<span className={"name"}>林小杰【业主】</span>}
						<Brief>
							<span className={"spanstyle sex"}>性别&nbsp;:&nbsp;男</span>
							<span className={"spanstyle PhoneNumber"}>电话&nbsp;:&nbsp;13567895647</span>
						</Brief>
						{
							this.props.hasIDCard == true ? <Brief>身份证号码</Brief> : null
						}
					</List.Item>
				</List>
			</div>
		);
	}
}

export default __C;