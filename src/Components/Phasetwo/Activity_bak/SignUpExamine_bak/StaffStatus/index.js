/*共用的*/
import React from 'react';
/*antd-mobile*/
import { List } from 'antd-mobile';
import { toJS } from 'mobx'
import PropTypes from 'prop-types';
import './Component.less';
const Item = List.Item;
const Brief = Item.Brief;
/*自定义类*/
class __C extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			ActiveItemdatastate: []
		}
	}
	componentWillReceiveProps(nextProps) {
		//console.log(this.props.ActiveItemdata, "ActiveItemdata", nextProps.ActiveItemdata, this.props.ActiveItemdata == nextProps.ActiveItemdata)
		if (this.props.ActiveItemdata !== nextProps.ActiveItemdata){
			this.ActiveItemdatastateobjnew(nextProps.ActiveItemdata)
		}
	}
	componentDidMount(){
		//console.log(this.props.ActiveItemdata, "ActiveItemdata", )
		//处理字段名paramType等于5,6的时候合并一下值,5和6数据结构要跟着
		
		//console.log(ActiveItemdata, ActiveItemdatastateobj, ActiveItemdatastate,"ActiveItemdata11")
		this.ActiveItemdatastateobjnew(this.props.ActiveItemdata)
		
	}
	ActiveItemdatastateobjnew(ActiveItemdata){
		//const { ActiveItemdata } = this.props
		let ActiveItemdatastateobj = []
		let ActiveItemdatastateobjnew = []
		ActiveItemdatastateobj = ActiveItemdata.paramArray

		for (let i = 0; i < ActiveItemdatastateobj.length; i++) {
			if (ActiveItemdatastateobj[i].paramType == 5) {
				ActiveItemdatastateobj[i].extValues = ActiveItemdatastateobj[i].extValues + '-' + ActiveItemdatastateobj[i + 1].extValues
			}
		}
		for (let i = 0; i < ActiveItemdatastateobj.length; i++) {
			if (ActiveItemdatastateobj[i].paramType != 6) {
				ActiveItemdatastateobjnew.push(ActiveItemdatastateobj[i])
			}
		}
		this.setState({
			ActiveItemdatastate: ActiveItemdatastateobjnew
		})
	}
	render () {
		//const { ActiveItemdata } = this.props
		const { ActiveItemdatastate } = this.state
		let sex = ["未知","男","女"]
		return (
			<div className={"Component-StaffStatus-container"}>
				<List>
					<List.Item align="top">
						{/* {ActiveItemdata.userName} */}
						{/* <Brief>
							<span className={"sex"}>姓名：{ActiveItemdata.name}</span>
						</Brief>
						<Brief>
							<span className={"PhoneNumber"}>性别：{sex[ActiveItemdata.sex]}</span>
						</Brief>
						<Brief>电话：{ActiveItemdata.phoneNo}</Brief> */}
						{
							ActiveItemdatastate && ActiveItemdatastate.map((v,i)=>{
								let ext = ""
								if (Array.isArray(toJS(v.extValues))){
									ext=v.extValues.join(',')
								} else {
									ext = v.extValues
								}
								return(
									<Brief key={i}>{v.extTitle}：
										{ ext}
									</Brief>
								)
							})
						}
					</List.Item>
				</List>
			</div>
		);
	}
}

export default __C;