/*共用的*/
import React from 'react';
/*antd-mobile*/
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
	handleClick = (current,nodeCode,that) =>{ //this,index,item.nodeCode
		let { onclick,tabIndex } = this.props;
		console.log('current,obj', current,nodeCode);
		this.setState({
			current,
			temp:true
		},()=>{
			if (typeof onclick=='function') {
				onclick(current,nodeCode,that)
			}
		})
	};
	renderStyle= (title) =>{
		const n=title.length;
		if (title.length==2) {
			return '50%'
		} else if (title.length==1) {
			return'100%'
		} else if (title.length==3) {
			return '33.3333%'
		} else {
			return `${100 / n}%`
		}

	};

	render () {
		let { title } = this.props;
		let currentIndex=this.props.tabIndex;
		let inx=0;
		if (!this.state.temp) {
			inx=currentIndex
		} else {
			if (!currentIndex || currentIndex==0 || currentIndex==1 ||currentIndex==2 ) {
				inx=currentIndex;
			} else {
				inx=this.state.current
			}
		}
		return (<div className={'Components-tabCloudPayment-container'} >
			<div className={'tabs-title'} >
				{title.map((item,index,array)=>{
					return <span key={index} style={{width:this.renderStyle(title)}} className={`item ${(index==inx  )?'on': ''}`} onClick={this.handleClick.bind(this,index,item.nodeCode)}>{item.nodeName}</span>
				})}
			</div>
		</div >);
	}
}
