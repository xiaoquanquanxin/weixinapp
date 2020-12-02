/*共用的*/
import React from 'react';
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle';
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, TabBar, DatePicker, List } from 'antd-mobile';
import tempImg from './temp.png';
import tel from '../tel.png';
import StatusFlag from '../../../pub/StatusFlag-yuzhou';
import SoundPad from 'LibComponents/SoundPad';
import RichUploadAttachDisplay from "LibComponents/RichUploadAttachDisplay"
/*当前页面用到的*/

/*自定义类*/
import './Component.less';
import ImgZoomHOC from '../../../pub/ImgZoomHOC'
import constant from '../../../../constant';


@ImgZoomHOC('Components-Repair-Details-container')

@inject('store', 'actions')
@observer

export default class Template extends React.Component {
	state = {
		arrowStatus: true
	};

	checkWorkType (workType, reportResponsibility){
		let typeText;
		// switch (String(workType)) {
		// 	case "1":
		// 		if (reportResponsibility == 1) {
		// 			typeText = "室内";
		// 		} else {
		// 			typeText = "室外";
		// 		}
		// 		break;
		// 	case "2":
		// 		typeText = "投诉"
		// 		break;
		// 	case "3":
		// 		typeText = "咨询"
		// 		break;
		// 	case "24":
		// 		typeText = "建议"
		// 		break;
		// 	case "5":
		// 		typeText = "表扬"
		// 		break;
		// }
		switch (String(workType)) {
			case "10":
				typeText = "来自400报事"
				break;
			case "20":
				typeText = "来自现场报事"
				break;
			case "30":
				typeText = "来自自主报事"
				break;
		}
		return typeText;
	}
	render () {
		const { problemdescription, createDate, workType, reportResponsibility, status, images, records, videos, roomname} = this.props;
		//const { actionsTemplate} = actions;
		// let images1 = [{ a: 1 }, { a: 1 }]
		// let videos1 = [{ a: 1 }, { a: 1 }]
		// let records1 = [{ a: 2 }, { a: 2 }]
		let images1 = images ? images:[]
		let videos1 = videos ? videos : []
		let records1 = records ? records : []
		//let images_videos=[...images, ...videos]
		//console.log("problemDescription", this.props.match.params.status)
		//console.log(212121111121, images1, videos1, records1, [...videos1, ...records1], status, constant.WORK_STATUS[1])
		return <div className={'Components-Repair-WorkDetails-container'}  >
			<article className="repair-details" >
				<section className={'repair-item relative_div'} >
					<div className={"content"}>报修内容：{problemdescription}</div >
					<div className={"content"}>{roomname}</div >
					{/* <div className={"meiti"}>
						<div className={"repairimg m_top10"}>
							{
								images && images.map((v, i) => {
									return (
										<div key={i} onClick={() => { this.props.onClick(v.visitUrl); }}>
											<span><img src={v.visitUrl} /></span>
										</div>
									)
								})
							}
						</div >
						<div className={"repairvedio m_top10"}>
							{
								videos1 && videos1.map((v, i) => {
									return (
										<div key={i} onClick={() => { this.props.onClick(tempImg); }}>
											<span><img src={tempImg} /></span>
										</div>
									)
								})
							}
						</div>
					</div>
					<div className={"SoundPad"}>
						{
							records && records.map((v, i) => {
								return (
									<div key={i} className={"item"}>
										<SoundPad data={v} />
									</div>
								)
							})
						}
					</div> */}
					<RichUploadAttachDisplay imglist={[...images1, ...videos1]} voicelist={records1} />
					
					<div className={"type"}>{this.checkWorkType(workType,reportResponsibility)}</div>
					<div className={"time"}>{createDate}</div>
				</section >
				{
					this.props.match.params.status==2&&<StatusFlag
						label={constant.WORK_STATUS[1]} //文本
						status={status}
						belongType={constant.STATUSSTYLE[1]}
					/>
				}
			</article >
		</div >
	}
}