/*共用的*/
import React from 'react';
/*antd-mobile*/
import { Flex, WhiteSpace, Steps, WingBlank, } from 'antd-mobile';
const Step = Steps.Step;
import PropTypes from 'prop-types';

import temp from './temp.png'
//import ImgZoomHOC from '../ImgZoomHOC'

import './Component.less';
import { inject, observer } from 'mobx-react/index';

/*自定义类*/

//@ImgZoomHOC('StepsList')

@inject('store', 'actions')
@observer

class StepsList extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
		};
	}

	static propTypes = {
		// label: PropTypes.string.isRequired, //标签
	};
	render () {
		let { store } = this.props;
		let { storeHandInBuildingSignInSuccess} = store
		const { SignInSuccessData } = storeHandInBuildingSignInSuccess
		console.log(22, SignInSuccessData.items)
		// console.log('this.props.isScroll_______1___________', this.props.isScroll)签到类型（1-业主，2-授权人）
		return (<div className={"Components-SignInSuccessData-container"}>
			<Steps  current={0} >
				{
					SignInSuccessData.items&&SignInSuccessData.items.map((v,i)=>{
						return(
						<Step key={i}
								title={<span className={'routerTitle'} >到访时间 &nbsp;&nbsp;&nbsp;&nbsp; {v.signinTime} <span className={'role m_left10'}>{v.signinType == 1 ? "业主" :"授权人"}</span></span >}
								icon={<span className={SignInSuccessData.items.length == i + 1 ?'status statusend':'status'} >&nbsp;</span >}
							description={<div className={'steps'} >
								<div className={'content'} >
									<Flex className={"row"}>
										<Flex.Item style={{ flex: 1, fontSize: '0.14rem' }}> 姓名：</Flex.Item>
										<Flex.Item className={"namehei"} style={{ flex: 3 }}>{v.userName}</Flex.Item>
									</Flex>

									<Flex className={"row"}>
										<Flex.Item style={{ flex: 1, fontSize: '0.14rem' }}>  电话号码:</Flex.Item>
										<Flex.Item className={"namehei"} style={{ flex: 3 }}>{v.phoneNo}</Flex.Item>
									</Flex>
								</div >
								<div ><span onClick={() => { this.props.onClick(v.identityPhoto); }}>
									{
										v.identityPhoto && <img src={v.identityPhoto} className={'imgStyle'} />
									}

									</span>
									<span onClick={() => { this.props.onClick(v.authPhoto); }}>
										{
											v.identityPhoto && <img src={v.authPhoto} className={'imgStyle'} />
										}

										</span></div >
							</div >}
						/>
						)
					})
				}


			</Steps >
		</div >);
	}
}

export default StepsList;
