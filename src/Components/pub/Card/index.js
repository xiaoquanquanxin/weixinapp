/*共用的*/
import React from 'react';
/*antd-mobile*/
import router from '../../../router'
import constant from '../../../constant';
import PropTypes from 'prop-types';
import './Component.less';
import StatusFlag from '../../pub/StatusFlag';

/*自定义类*/
class __C extends React.Component {
	constructor (props) {
		super(props);
	}

	static propTypes = {
		label: PropTypes.string.isRequired, //标签
	};

	//跳转
	regedit= (status) =>{
		const link=`${router.RepairDetails[0]}/${this.props.props.match.params.type*1}/${status}`;
		link && this.props.props.history.push(link);
	};
	render () {
		let { label, time, tel, status, id, src } = this.props;
		return (<div className="Components-Card-container" onClick={()=>{this.regedit(1)}}>
			<p >{time}</p >
			<p className={'tel'} ><img src={src} className={"imgStyle"} /> {tel}</p >
			<article >{label}</article >
			<StatusFlag
				/*label={status}
				color={'#D0021B'}*/
				label={constant.WORK_STATUS[1]}    			     //可填文本
				status={status*1}                                //接回返回数据
				belongType={constant.STATUSSTYLE[1]}  			 //所属类型(1:工单，2：活动，3:审核)
				// status={constant.WORK_STATUS[5]}
			/>
		</div >);
	}
}

export default __C;