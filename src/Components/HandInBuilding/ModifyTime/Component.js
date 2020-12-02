/*共用的*/
import React from 'react'
import { observer, inject } from 'mobx-react';
import withSetTitle from 'LibComponents/withSetTitle'
/*antd-mobile*/
import { Flex, Button, WhiteSpace, WingBlank, TabBar } from 'antd-mobile';
import MyButton from "../../pub/MyButton";
/*当前页面用到的*/
import shijian from '../img/shijian.svg'
/*自定义类*/
import './Component.less'
@inject('store', 'actions')
@observer
export default class HandInBuildingModifyTime extends React.Component {
    componentDidMount() {
        //console.log('[Template] componentDidMount..')
		window.setWindowTitle("修改时间")
		this.props.actions.actionsHandInBuildingModifyTime.ModifyTimefun()
    }
    render() {
        const { store, actions } = this.props;
		const { storeHandInBuildingModifyTime } = store;
		const { actionsHandInBuildingModifyTime} = actions;
		const { selectTimeval, ModifyTimeData, wordTimeSlot, itemclassval, timeSlot, day, TotalNum } = storeHandInBuildingModifyTime;
		const { selectTimefun, itemdayfun, submitfun, morefun } = actionsHandInBuildingModifyTime
		//console.log(1, ModifyTimeData.calendarInfo, day)1-预约已满，0-可预约
		const Week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
		return <div className={"Components-HandInBuildingModifyTime-container"}>
			<div className={"OpenTime"}><img src={shijian} />开放时长：{wordTimeSlot}</div>
			<div className={"title"}>{zModifyTimeData.roomName}</div>
				<div className={"Calendar"}>
				<div className={"month"}>{new Date().getFullYear()}年{new Date().getMonth()+1}月</div>
				<div className={"Week-day"}>
				<div className={"Week"}>
					{
						Week && Week.map((v, i) => {
							return (
								<div key={i} className={"item"}>{v}</div>
							)
						})
					}
				</div>
					<div className={"day"}>
					{
						!!day.length&&day.map((v,i)=>{
							let fullFlag="";
							let itemclass=""
							if (v.fullFlag == 0){
								fullFlag = v.day.split("-")[2]
								itemclass = "item nofullFlagclass"
							} else if (v.fullFlag == 1){
								fullFlag = "预约已满"
								itemclass = "item fullFlagclass"
							}else{
								fullFlag = v.day.split("-")[2]
								itemclass = "item"
							}
							let itemclass2 = itemclassval == i ? " selectitem" : ""
							return(
								<div key={i} className={itemclass + itemclass2} 
												onClick={(e) => { v.fullFlag == 0?itemdayfun(e, v, i):"" }}>
													<span>{fullFlag}</span>
													{
										v.day.split("-")[2]==1&&
										<div className={"see1Month"}>{v.day.split("-")[1]}月</div>
													}
									
								</div>
							)
						})
					}
			
					</div>
					
				</div>
				<div className={"moreclass"} onClick={() => { morefun() }}>{TotalNum==42?"更多":"收起"}</div>
				</div>
				<div className={"selectTime"}>
					{
					timeSlot.length>0 &&timeSlot.map((v,i)=>{
						let numprohibit = v.alreadyCount == v.totalCount ? "num prohibit":"num";
						return(
							<div key={i} className={"item"} onClick={(e) => selectTimefun(e, i,v)}>
								<div className={"part"}>
									<div className="checkboxFive">
										<input type="radio" checked={selectTimeval == i} onChange={() => { }} />
										<label></label>
									</div>
									<div className="text">{v.startTimeSlot} 至 {v.endTimeSlot}</div>
								</div>
								<div className={numprohibit}>{v.alreadyCount}/{v.totalCount}</div>
							</div>
						)
							
						})
					}
					
				</div>
				
			<div className={"btn"} onClick={() => { submitfun(this.props.history)}}>
					<MyButton  type={"blue"} label={"提 交"}  />
				</div>
            </div>;
    }
    /*componentWillUnmount(){
        const { actions } = this.props;
        const { actionsTemplate} = actions;
        actionsTemplate.init()
    }*/
    //组件的内部状态和生命周期
    //https://segmentfault.com/a/1190000011776013
}