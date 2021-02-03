//import {action } from 'mobx';
// 定义对数据的操作
import config from '../../../../config';
import { action } from 'mobx/lib/mobx';
import { Toast } from 'antd-mobile';
class Actions {
    constructor(store) {
		this.store = store;
    }
	/*
	  获取用户信息
	  * */
	@action
	userInfo = async(thisP) => {
		console.log(99999, document.referrer, thisP)
		this.activityid = thisP.match.params.activityid
		window.setLocalData("activityid", parseInt(thisP.match.params.activityid));
		this.UserparamArr=[]
		this.success=""
		this.Toast=""
		this.store.getRoomInfo=[];
		this.store.userList=[];
		this.store.roomName='';
		this.store.roomId='';
		this.store.Interestselects=[]
		this.store.UserInfodata = []
		console.log(2222, this.activityid)
		let cformData = { activityId: this.activityid };
		let result = await window.GET({ url: 'user/activity/signup', cformData});
		if (!result.isSucess) return;

		this.store.needCost=result.data.needCost
		console.log(11, result.data.roomList, this.store.getRoomInfo.length)
		result.data.roomList.forEach((v,i)=>{
			this.store.getRoomInfo.push({
				label: v.roomName,
				value: v.roomId,
				userList: v.userList
			})
			
			
		})
		//判断有数据值，默认取第一个
		let memberIdarr = []
		if (this.store.getRoomInfo.length>0){
			this.store.roomName = this.store.getRoomInfo[0].label;
			this.store.roomId = this.store.getRoomInfo[0].value;
			this.store.userList = result.data.roomList[0].userList;
			// if (this.store.userList.length>0){
			// 	this.store.userList.forEach((v, i) => {
			// 		memberIdarr.push(v.wxUserId)
			// 	})
			// }
			//console.log(333188, memberIdarr.join(","))
			//this.editOwnerInfofun(thisP.history, memberIdarr.join(","), this.store.roomId)
		}


			this.store.UserInfodata.push({
				name: "",
				phoneNo: "",
				sex: "",
				linkWxUserId: "",
				paramArray: result.data.paramArray,
				paramArr: []
			})
			if (result.data.paramArray && result.data.paramArray.length > 0) {
				result.data.paramArray.forEach((vv, ii) => {
					this.store.UserInfodata[0].paramArr.push({
						id: vv.id,
						extTitle: vv.paramTitle,
						paramType: vv.paramType,
						extValues: "",
						paramOptions: [],
						Interestselects: []
					})
					if (vv.paramType == 1 || vv.paramType == 2) {
						if (vv.paramOptions.length > 0) {
							vv.paramOptions.forEach((vvv, iii) => {
								this.store.UserInfodata[0].paramArr[ii].paramOptions.push({
									label: vvv,
									value: vvv
								})
							})
						}
					}
				})

				this.UserparamArr.push({
					paramArr: []
				})
				result.data.paramArray.forEach((vv, ii) => {
					this.UserparamArr[0].paramArr.push({
						id: vv.id,
						extTitle: vv.paramTitle,
						paramType: vv.paramType,
						extValues: "",
						paramOptions: [],
						Interestselects: []
					})
					if (vv.paramType == 1 || vv.paramType == 2) {
						if (vv.paramOptions.length > 0) {
							vv.paramOptions.forEach((vvv, iii) => {
								this.UserparamArr[0].paramArr[ii].paramOptions.push({
									label: vvv,
									value: vvv
								})
							})
						}
					}
				})

				
			}

		console.log("UserInfodataUserInfodata",this.store.UserInfodata)


		this.citylistfun()
		
	}
	@action
	citylistfun=async()=>{
		let result = await window.GET({ url: "/user/activity/getWxCityList" });
		if (!result.isSucess) return;
		this.store.citylist = result.data;
	}

	@action
	editOwnerInfofun = async (history, linkWxUserId, roomId) => {
		let winobj = window.getQueryString();
		let UserInfodata = []
		this.store.UserInfodata = [];
		let cformData = {
			activityId: this.activityid,
			linkWxUserId: linkWxUserId,
			roomId: roomId
		}
		console.log("cformData", cformData)
		let result = await window.GET({ url: "user/activity/editOwnerInfo", cformData });
		this.store.authshow = 1
		if (!result.isSucess) return;

		// this.bcjoinerId=result.data.joinerId
		this.bcjumpType = result.data.jumpType
		if (result.data.jumpType == 2) {
			console.log(22222222222222199)
			history.push('/PhasetwoActivitySignUpSuccess?joinerId=' + result.data.joinerId)
			// history.push('/PhasetwoActivitySignUpExamine/' + this.bcjoinerId)
		}


		console.log(999, this.store.authshow)
		result.data.userParamList.forEach((v, i) => {
			this.store.UserInfodata.push({
				name: v.name,
				phoneNo: v.phoneNo ? window.trim(v.phoneNo) : v.phoneNo,
				sex: v.sex,
				linkWxUserId: v.linkWxUserId,
				paramArray: v.paramArray,
				paramArr: []
			})
			if (v.paramArray && v.paramArray.length > 0) {
				v.paramArray.forEach((vv, ii) => {
					this.store.UserInfodata[i].paramArr.push({
						id: vv.id,
						extTitle: vv.paramTitle,
						paramType: vv.paramType,
						extValues: "",
						paramOptions: [],
						Interestselects: []
					})
					if (vv.paramType == 1 || vv.paramType == 2) {
						if (vv.paramOptions.length > 0) {
							vv.paramOptions.forEach((vvv, iii) => {
								this.store.UserInfodata[i].paramArr[ii].paramOptions.push({
									label: vvv,
									value: vvv
								})
							})
						}
					}
				})
			}
		})

	}
	@action
	submitfun = async (history)=>{
		let UserInfodata = []
		this.store.UserInfodata.forEach((v, i) => {
			UserInfodata.push({
				joinerName: v.name,
				dataId: v.dataId,
				joinerPhone: v.phoneNo,
				joinerSex: v.sex,
				paramArr: []
			})
			if (v.paramArr && v.paramArr.length > 0) {
				v.paramArr.forEach((vv, ii) => {
					UserInfodata[i].paramArr.push({
						signupParamId: vv.id,//signupParamId
						extTitle: vv.extTitle,
						extId: vv.id,
						extValues: vv.paramType == 2 ? vv.extValues : vv.extValues
					})
				})
			}
		})
		console.log("UserInfodata", UserInfodata, UserInfodata.every(this.checkAdult), UserInfodata)
		if (UserInfodata.every(this.checkAdult)){
			let cformData = {
				joinerArr: UserInfodata,
				activityId: this.activityid,
				roomId: this.store.roomId
			};
			console.log("提交", cformData, JSON.stringify(cformData))
			let result = await window.POSTJSON({ url: 'user/activity/signupSubmit', cformData });
			if (!result.isSucess) return;
			window.delLocalData('UserInfodata')
			
			history.push('/PhasetwoActivitySignUpSuccess?joinerId=' + result.data)
		}else{
			Toast.info(`内容不能为空`, 1);
		}
	}
	@action
	checkAdult = (v) => {
		return v.paramArr.every((vv)=>{
			return vv.extValues!==""
		})
	}

	//下拉选择单元
	@action
	topfunproject = async(roomId)=>{
		console.log("roomId", roomId)
		this.store.getRoomInfo.forEach((item,index)=>{
			if (roomId == item.value){
				this.store.roomId = item.value
				this.store.roomName = item.label
				this.store.userList = item.userList
			}
		});
	}

	//输入框赋值
	@action
	inputfun = (e, i, name, ii = -1) => {
		if (ii == -1) {
			this.store.UserInfodata[i][name] = e
		} else {
			this.store.UserInfodata[i].paramArr[ii].extValues = e
		}
		console.log(i,ii,name,"input")
	}




	@action
	Interestfun = (name, i, ii) => {
		console.log(222, this.store.UserInfodata[i].paramArr[ii].Interestselects)
		this.store.UserInfodata[i].paramArr[ii].Interestselects = this.store.UserInfodata[i].paramArr[ii].Interestselects.includes(name)
			? this.store.UserInfodata[i].paramArr[ii].Interestselects.filter(item => item !== name)
			: [...this.store.UserInfodata[i].paramArr[ii].Interestselects, name]
		//console.log(111, this.store.UserInfodata[i].paramArr[ii].Interestselects, this.store.UserInfodata[i].paramArr[ii].Interestselects.includes(name))
		this.store.UserInfodata[i].paramArr[ii].extValues = this.store.UserInfodata[i].paramArr[ii].Interestselects
		//console.log(222,this.store.UserInfodata[i].paramArr[ii].extValues )
	}

	@action
	pickerfun = (v, vname, i, ii) => {
		//console.log(7777,v)
		this.store.UserInfodata[i].paramArr[ii].extValues = v
		// console.log(22345, this.store.UserInfodata, v.format('YYYY-MM-dd'))
		//this.store[vname] = v
	}

	@action
	pickerareafun = (v, vname, picki, pickii) => {
		let citylist=this.store.citylist
		let cityName=""

		for (let i = 0; i < citylist.length;i++){
			if (citylist[i].value==v[0]){
				cityName = citylist[i].label
				
				for (let ii = 0; ii < citylist[i].children.length;ii++){
					if (citylist[i].children[ii].value == v[1]) {
						cityName = cityName +'-'+ citylist[i].children[ii].label
						for (let iii = 0; iii < citylist[i].children[ii].children.length; iii++) {
							if (citylist[i].children[ii].children[iii].value == v[2]) {
								cityName = cityName + '-' +citylist[i].children[ii].children[iii].label
								this.store.UserInfodata[picki].paramArr[pickii].extValues = cityName
							}
						}
					}
				}
			}
		}
		
		console.log(7777, v, cityName)

		
	}


	@action
	Toastfun=function(){
		let ilength = 0;
		this.store.Interestselects.forEach((v, i) => {
			this.store.UserInfodata.forEach((vv, ii) => {
				if (v == vv.linkWxUserId) {
					ilength = ilength + 1
					if (ilength == this.store.Interestselects.length){
						this.Toast=1
					}
				}
			})
		})
		

	}
	@action
	out=()=>{
		window.delLocalData('UserInfodata')
	}
	@action
	addfun=()=>{
		this.store.UserInfodata.push(Object.assign({}, this.UserparamArr[0]))
		console.log("addfun",this.store.UserInfodata)
	}
	@action
	shanchufun=(i)=>{
		this.store.UserInfodata.splice(i,1)
		console.log(i)
	}


}
export default Actions;
