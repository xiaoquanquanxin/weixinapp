/*共用的*/
import React from 'react';
/*antd-mobile*/
import { Flex } from 'antd-mobile';

import PropTypes from 'prop-types';
import './Component.less';

/*自定义类*/
class Template extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			arrowClassName: 'arrow',
			status: false
		};
	}

	static propTypes = {
		label: PropTypes.array.isRequired, //标签
	};


	render () {
		let { label } = this.props;
		let array=[];
		const array0 = [<div className="Components-ArrowDonwButton-container" key={1} onClick={() => {
			this.setState({
				status: !this.state.status,
				index:1
			});
		}} >
			<Flex.Item className={'ArrowDonwButton'} >{'工单状态'}
				<div className="parentNode" >
					<b className={'bottom'} ><i className="bottom-arrow1" /><i className="bottom-arrow2" /></b >
				</div >
			</Flex.Item >


		</div >, <div className="Components-ArrowDonwButton-container" key={2} onClick={() => {
			this.setState({
				status: !this.state.status,
				index:2
			});
		}} >
			<Flex.Item className={'ArrowDonwButton'} >{'上报时间'}
				<div className="parentNode" >
					<b className={'bottom'} ><i className="bottom-arrow1" /><i className="bottom-arrow2" /></b >
				</div >
			</Flex.Item >


		</div >];


		label.forEach((item, index) => {
			const array1 = [<div className="Components-ArrowDonwButton-container" key={3} onClick={(index) => {
				this.setState({
					status: !this.state.status,
					index: index+1
				});
			}} >
				<Flex.Item className={'ArrowDonwButton'} >{'工单状态'}
					<div className="parentNode" >
						<b className={'top'} ><i className="bottom-arrow1" /><i className="bottom-arrow2" /></b >
					</div >
				</Flex.Item >


			</div >, <div className="Components-ArrowDonwButton-container" key={4} onClick={(index) => {
				this.setState({
					status: !this.state.status,
					index: index+1
				});
			}} >
				<Flex.Item className={'ArrowDonwButton'} >{'上报时间'}
					<div className="parentNode" >
						<b className={'bottom'} ><i className="bottom-arrow1" /><i className="bottom-arrow2" /></b >
					</div >
				</Flex.Item >


			</div >];




			const array2 = [<div className="Components-ArrowDonwButton-container" key={5} onClick={() => {
				this.setState({
					status: !this.state.status,
					index: index+1
				});
			}} >
				<Flex.Item className={'ArrowDonwButton'} >{'工单状态'}
					<div className="parentNode" >
						<b className={'bottom'} ><i className="bottom-arrow1" /><i className="bottom-arrow2" /></b >
					</div >
				</Flex.Item >


			</div >, <div className="Components-ArrowDonwButton-container" key={6} onClick={(index) => {
				this.setState({
					status: !this.state.status,
					index: index+1
				});
			}} >
				<Flex.Item className={'ArrowDonwButton'} >{'上报时间'}
					<div className="parentNode" >
						<b className={'top'} ><i className="bottom-arrow1" /><i className="bottom-arrow2" /></b >
					</div >
				</Flex.Item >
			</div >];


			if (this.state.status) {
				if (this.state.status && Object.is((this.state.index)*1,1)) {
					return array=[...array1];
				} else {
					return array=[...array2];
				}
			} else {
				array=[...array0];
			}
		});
		return array;
	}
}

export default Template;