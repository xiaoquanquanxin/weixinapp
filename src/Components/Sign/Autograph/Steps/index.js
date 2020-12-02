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
		let { label, t } = this.props;
		// console.log('this.props.isScroll_______1___________', this.props.isScroll)
		return (<div className={"Components-setp-container"}>
			<Steps  current={0} >
				<Step
					title={<span className={'routerTitle'} >到签时间: &nbsp;<br /> 2019年06月03日 12:30:29 <span className={'role m_left10'}>游客</span></span >}
					icon={<span className={'status'} >&nbsp;</span >}
					description={<div className={'steps'} >
						<div className={'content'} >
							<Flex className={"row"}>
								<Flex.Item style={{flex:2}}> 姓名：</Flex.Item>
								<Flex.Item style={{flex:3}}>张三</Flex.Item>
							</Flex>
							<Flex className={"row"}>
								<Flex.Item style={{flex:2}}>  身份证：</Flex.Item>
								<Flex.Item style={{flex:3}}>446546547658765754654</Flex.Item>
							</Flex>

							<Flex className={"row"}>
								<Flex.Item style={{flex:2}}>  电话号码：</Flex.Item>
								<Flex.Item style={{flex:3}}>13800000000</Flex.Item>
							</Flex>
						</div >
						<WhiteSpace size="lg" />
						<div ><span onClick={()=>{this.props.onClick(temp);}}><img src={temp} className={'imgStyle'} /></span>  <span onClick={()=>{this.props.onClick(temp);}}><img src={temp} className={'imgStyle'} /></span></div >
					</div >}
				/>

				<Step
					title={<span className={'routerTitle'} >到签时间: &nbsp;<br /> 2019年06月03日 12:30:29 <span className={'role m_left10'}>业主</span></span >}
					icon={<span className={'status'} >&nbsp;</span >}
					description={<div className={'steps'} >
						<div className={'content'} >
							<Flex className={"row"}>
								<Flex.Item style={{flex:2}}> 姓名：</Flex.Item>
								<Flex.Item style={{flex:3}}>张三</Flex.Item>
							</Flex>
							<Flex className={"row"}>
								<Flex.Item style={{flex:2}}>  身份证：</Flex.Item>
								<Flex.Item style={{flex:3}}>446546547658765754654</Flex.Item>
							</Flex>

							<Flex className={"row"}>
								<Flex.Item style={{flex:2}}>  电话号码：</Flex.Item>
								<Flex.Item style={{flex:3}}>13800000000</Flex.Item>
							</Flex>
						</div >
						<WhiteSpace size="lg" />
						<div ><span onClick={()=>{this.props.onClick(temp);}}><img src={temp} className={'imgStyle'} /></span>  <span onClick={()=>{this.props.onClick(temp);}}><img src={temp} className={'imgStyle'} /></span></div >
					</div >}
				/>
			</Steps >
		</div >);
	}
}

export default StepsList;