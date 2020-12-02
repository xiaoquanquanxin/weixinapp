/*共用的*/
import React from 'react';
/*antd-mobile*/
import { Flex, WhiteSpace, Steps, WingBlank, } from 'antd-mobile';
const Step = Steps.Step;
import PropTypes from 'prop-types';

import temp from './temp.png'
import ImgZoomHOC from '../ImgZoomHOC'

import './Component.less';
import { inject, observer } from 'mobx-react/index';

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
		let { label, t } = this.props;
		// console.log('this.props.isScroll_______1___________', this.props.isScroll)
		return (<div className={"Components-setp-container"}>
			<Steps current={1} >
				<Step
					title={<span className={'routerTitle'} >楼栋负责人/13867895647</span >}
					icon={<span className={'status'} >跟进</span >}
					description={<div className={'steps'} >
						<p className={'content'} >test</p >
						<div ><span onClick={()=>{this.props.onClick(temp);}}><img src={temp} className={'imgStyle'} /></span></div >
					</div >}
				/>

				<Step
					title={<span className={'routerTitle'} >楼栋负责人/13867895647</span >}
					icon={<span className={'status'} >跟进</span >}
					description={<div className={'steps'} >
						<p className={'content'} >维保主管已复核完成(PS:完工内容需显示)</p >
						<div ><span onClick={()=>{this.props.onClick(temp);}}><img src={temp} className={'imgStyle'} /></span></div >
					</div >}
				/>
			</Steps >
		</div >);
	}
}

export default StepsList;