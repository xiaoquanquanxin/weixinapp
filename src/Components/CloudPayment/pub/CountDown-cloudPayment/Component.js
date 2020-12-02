/*共用的*/
import React from 'react';
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
import { Modal } from 'antd-mobile';
/*自定义类*/
import './Component.less';
import PropTypes from 'prop-types';

export default class CountDown extends React.Component{
	constructor(props) {
		super();
		this.state = {
			day: 0,
			hour: 0,
			minute: 0,
			second: 0
		}
	}
	componentDidMount() {
			let endTime=this.props.endTime.endTime;
		if(endTime){
			let time = endTime.replace(/-/g, "/");
			this.countFun(time);
		}
	}
	//组件卸载取消倒计时
	componentWillUnmount(){
		clearInterval(this.timer);
	}

	countFun = (time) => {
		let end_time = new Date(time).getTime(),
			sys_second = (end_time - new Date().getTime());
		this.timer = setInterval(() => {
			//防止倒计时出现负数
			if (sys_second > 1000) {
				sys_second -= 1000;
				let day = Math.floor((sys_second / 1000 / 3600) / 24);
				let hour = Math.floor((sys_second / 1000 / 3600) % 24);
				let minute = Math.floor((sys_second / 1000 / 60) % 60);
				let second = Math.floor(sys_second / 1000 % 60);
				this.setState({
					day:day,
					hour:hour < 10 ? "0" + hour : hour,
					minute:minute < 10 ? "0" + minute : minute,
					second:second < 10 ? "0" + second : second
				})
			} else {
				clearInterval(this.timer);
				//倒计时结束时触发父组件的方法
				//this.props.timeEnd();
			}
		}, 1000);
	};
	render() {
		return (
			<span>
			{/*	{this.state.day}天
				{this.state.hour}:*/}
				{this.state.minute}:
				{this.state.second}
				</span>
		)
	}
}
