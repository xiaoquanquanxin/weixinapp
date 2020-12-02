/*共用的*/
import React from 'react';
/*antd-mobile*/

import PropTypes from 'prop-types';
import './Component.less';
import constant from '../../../constant';
/*自定义类*/
export default class StatusFlag extends React.Component {
	constructor (props) {
		super(props);
	}

	static propTypes = {
		label: PropTypes.string.isRequired, //标签
		t: PropTypes.number//类型
	};


	statusStyle = (status,type) =>{
		let color='';

		if (type==constant.STATUSSTYLE[1]) {
			switch (status) {
				case 1:{
					color='#f5a623';
					break
				}
				case 2:{
					color='#d0021b';
					break
				}
				case 3:{
					color='#55c54d';
					break
				}

				case 4:{
					color='#35aaff';
					break
				}

				case 5:{
					color='#979797';
					break
				}
			}
		} else if (type==constant.STATUSSTYLE[2]) {
			switch (status) {
				case 1:{
					color='#979797';
					break
				}
				case 2:{
					color='#55c54d';
					break
				}
			}
		} else if (type==constant.STATUSSTYLE[3]) {
			switch (status) {
				case 1:{
					color='#3890F9';
					break
				}
				case 2:{
					color='#DF3045';
					break
				}
			}
		}
		return color;
	};
	render () {
		/*
		* 	// 工单状态
			WORK_STATUS: {
				1: '待处理',   // yellow  #f5a623
				2: '待受理',   // red     #d0021b
				3: '已完成',   // green   #55c54d
				4: '待评价',   // blue   #35aaff
				5: '已关闭',   // gray   #979797
			},
			//活动状态
			ACTIONS_STATUS: {
				1: '未报名',   // gray  #979797
				2: '已报名',   // green   #55c54d
			},

			//审核状态
			AUDIT_STATUS: {
				1: '待审核',        // blue  #3890F9
				2: '层审核不通过',   //red   #DF3045
			},
		*/
		let { label, color, key,status,belongType } = this.props;
		return (<span
			key={key}
			className={'status-flag'}
			style={{ backgroundColor: color?color:this.statusStyle(status,belongType) }} //默认黄色，值为'',其它传相应的值
		>
			{label}
			</span >);
	}
}
