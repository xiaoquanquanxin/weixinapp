/*共用的*/
import React from 'react';
/*antd-mobile*/
import { Flex, WhiteSpace, Steps, WingBlank, } from 'antd-mobile';
const Step = Steps.Step;
import PropTypes from 'prop-types';

import temp from './temp.png'
import ImgZoomHOC from '../ImgZoomHOC'

import './Component.less';
import { inject, observer } from 'mobx-react';

/*自定义类*/

@ImgZoomHOC('StepsList')

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
		let { data, t } = this.props;
		console.log("steps",data);
		// console.log('this.props.isScroll_______1___________', this.props.isScroll)
		return (<div className={"Components-setp-container"}>
			<Steps current={1} >
				{
					data.map((item,index)=>{
						return (
							<Step
								key ={index}
								title={<span className={'routerTitle'} >{item.smallTitle}</span >}
								icon={<span className={'status'}>{item.title}</span >}
								description={<div className={'steps'} >
									<p className={'content'} >{item.time}</p>
									<p className={'content'} >{item.name}</p >
									<div><span onClick={() => { this.props.onClick(temp); }}></span></div >
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