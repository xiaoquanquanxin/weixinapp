/*共用的*/
import React from 'react';
/*antd-mobile*/
import router from '../../../router'
import constant from '../../../constant';
import PropTypes from 'prop-types';
import './Component.less';
import StatusFlag from '../StatusFlag-yuzhou';
import ModalDIY from "../../RepairYu/Details/Modal2"
/*自定义类*/
class __C extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			modal2:false,
		}
	}

	static propTypes = {
		// label: PropTypes.string.isRequired, //标签
	};
	onCloseEvent(e){
		this.setState({
			modal2: false,
		})
		//this.props.callback();
	}
	onClick(e){
		e.stopPropagation()
		this.setState({
			modal2: true,
		})
	}
	//跳转
	regedit(id, status, e){
		e.stopPropagation()
			e.preventDefault()
		console.log("id", id)
		const link = `${router.RepairDetailsYu[0]}/${this.props.props.match.params.type * 1}/${id}/${status}`;
		link && this.props.props.history.push(link);
	};
	render () {
		let { label, time, status, id, typeText, type, roomname} = this.props;
		//console.log("type", this.props)
		return (<div className="Components-Card-yuzhou-container">
			<div>
				<div className={"card-up"}>
					<div onClick={(e) => { this.regedit(id, type, e) }}>
						<p className={"title"}>{label}</p >
						<p className={"title"}>{roomname}</p >
						<p className={"type"}>{typeText}</p>
						<p className={"time"}>{time}</p>
						{/* <StatusFlag
					label={constant.WORK_STATUS[1]}    			      //可填文本
					status={status*1}                                //接回返回数据
					belongType={constant.STATUSSTYLE[1]}  			 //所属类型(1:工单，2：活动，3:审核)
				/> */}
						{
							//1完成 2.未完成
							type == 2 ? <StatusFlag status={status * 1} /> : ""
						}
						
					</div>
				</div>
				<div className={"card-down"}>
					{
						type == 2 && status != 10 ? <div onClick={this.onClick.bind(this)} className="comment">立即评价</div> : ""
					}
				</div>
			</div>
			
			
			{/* <ModalDIY
				visible={this.state.modal2}
				onCloseEvent={() => {
					this.onCloseEvent()
				}}
				id={id}
				type={this.props.props.match.params.type}
			/> */}
		</div >);
	}
}

export default __C;