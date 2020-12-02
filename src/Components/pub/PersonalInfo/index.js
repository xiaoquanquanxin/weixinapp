/*共用的*/
import React from 'react';
/*antd-mobile*/
import { Button, WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types';
import './Component.less';
import personal from './touxiang.png';
import yirenzheng from './yirenzheng.png';
import weirenzheng from './weirenzheng.png';

/*自定义类*/
class PersonalInfo extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};
	}

	render () {
		let { label, t, fullName, authStatus, phoneNo, userLogo,nickName} = this.props;
		//console.log('a___________________', fullName, authStatus, phoneNo, userLogo)
		//authStatus = 0;
		return (<div className="Component-personalInfo-container clearfix" >
			<div className={'personalimg'} >
				<img src={userLogo ? userLogo : personal} />
			</div >
			<div className={'personalInfo'} >
				<div className="nameItem" >
					{/* <span className="name" >{fullName || nickName || ''}</span > */}
					<span className="name" >{fullName? fullName : nickName}</span >
					{/* <span className="nameStatus" >{authStatus ? (authStatus == 1 ? '已认证' : '未认证') : ''}</span > */}
					<img src={authStatus == 1 ? yirenzheng: weirenzheng} alt="" className={'status'}/>
					{/*<span className="nameStatus" >{authStatus == 1 ? '已认证':'未认证'}</span >*/}
				</div >
				<WhiteSpace />
				<div className="phoneNumber" >{phoneNo || ''}</div >
			</div >
		</div >);
	}
}

export default PersonalInfo;