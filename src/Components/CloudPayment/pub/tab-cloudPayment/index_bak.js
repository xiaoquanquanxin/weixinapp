/*共用的*/
import React from 'react';
/*antd-mobile*/
import { Flex, WhiteSpace, Steps, WingBlank, } from 'antd-mobile';
import PropTypes from 'prop-types';


import './Component.less';

/*自定义类*/

export default class Header extends React.Component {

	static propTypes = {
		title: PropTypes.array.isRequired,
		onclick: PropTypes.func.isRequired,
	};

	constructor (props) {
		super(props);
		this.state = {
			current:0,
			temp: false
		};
	}


	handleClick = (current,obj) =>{
		let { onclick,tabIndex } = this.props;
		console.log('current,obj', current,obj);
		this.setState({
			current,
			temp:true
		},()=>{
			if (typeof onclick=='function') {
				onclick(current)
			}
		})
	};

	render () {
		let { title } = this.props;
		let currentIndex=this.props.tabIndex;
		console.log('currentIndex_______===========currentIndex=========================', currentIndex)
		let inx=0;
		if (!this.state.temp) {
			inx=currentIndex
		} else {
			if (!currentIndex || currentIndex==0 ) {
				inx=currentIndex;
			} else {
				inx=this.state.current
			}

		}

		// console.log('tabIndex_______==============tabIndex===========================', inx)

		return (<div className={'Components-tabCloudPayment-container'} >
			<div className={'tabs-title'} style={{width:title.length==2? 234: '100%'}}>
				{title.map((item,index,array)=>{
					return <span key={index} className={`item ${(index==inx  )?'on': ''}`} onClick={this.handleClick.bind(this,index)}>{item}</span>
				})}
			</div>


		</div >);
	}
}
