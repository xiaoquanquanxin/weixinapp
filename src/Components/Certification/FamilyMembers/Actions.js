//import {action } from 'mobx';
// 定义对数据的操作
import config from '../../../config';
import { action } from 'mobx/lib/mobx';

class Actions {
    constructor(store) {
        this.store = store;
    }
	/*
	  获取用户信息
	  * */
	@action
	userInfo = async() => {

		let result = await window.GET({ url: 'user/userInfo',});
		if (!result.isSucess) return;
		this.store.useInfo=result.data;
		// console.log("useInfo11111111111", this.store.useInfo)

		let cformData = { userType: 0 };
		let resultgetRoomInfo = await window.GET({ url: 'auth/getRoomInfo', cformData });
		if (!resultgetRoomInfo.isSucess) return;
		for (let i = 0; resultgetRoomInfo.data.length>i;i++){
			if (!this.store.getRoomInfo[i]) this.store.getRoomInfo[i]={}
			this.store.getRoomInfo[i].label = resultgetRoomInfo.data[i].roomName
			this.store.getRoomInfo[i].value = resultgetRoomInfo.data[i].roomId
			this.store.getRoomInfo[i].userType = resultgetRoomInfo.data[i].userType
		}
		this.store.roomId=this.store.getRoomInfo[0].value;
		
		this.topfunproject(this.store.roomId)
		//console.log("getRoomInfo222222222", this.store.getRoomInfo, resultgetRoomInfo)
	};
	@action
	topfunproject = async(roomId)=>{
		this.store.getRoomInfo.forEach((item,index)=>{
			if (roomId == item.value){
				this.store.roomName = item.label
				this.store.userType = item.userType
			}
		});
		console.log(1090909111,this.store.roomName, this.store.userType)
		let cformData = { roomId: roomId };
		let result = await window.GET({ url: 'auth/userFamily', cformData });
		if (!result.isSucess) return;
		this.store.userFamily=[]
		result.data.forEach((item, index) => {
			this.store.userFamily.push({
				id: item.memberId,
				fullName: item.fullName,
				sex: item.sex,
				phoneNo: item.phoneNo,
				identityNo: item.identityNo,
				birthday: item.birthday,
				userType: item.userType,
				authUserId: item.authUserId,
				editStatus: false
			})
		});
	}

/*获取用户下的房间信息userType	1-业主，2 - 家属，3 - 租客，0 - 所有 /auth/getRoomInfo*/
	
	// @action
	// getRoomInfo = async() => {
	// 	let url=`auth/getRoomInfo`;
	// 	let cformData = { userType:0};
	// 	let result = await window.GET({ url:'auth/getRoomInfo',cformData});
	// 	if (!result.isSucess) return;
	// 	this.store.getRoomInfo=result.data;
	// };

	/*家庭成员信息* roomId*/
	// @action
	// userFamily = async(body) => {
	// 	let url=`auth/userFamily`;
	// 	let obj = { ...body };
	// 	let cformData = config.format(obj);
	// 	let result=await window.GET({url,cformData});
	// 	if (!result.isSucess) return;
	// 	const array=result.data;
	// 	array.forEach((item,index)=>{
	// 		this.store.userFamily.push({
	// 			id: item.id,
	// 			fullName: item.fullName,
	// 			sex: item.sex,
	// 			phoneNo: item.phoneNo,
	// 			identityNo: item.identityNo,
	// 			birthday: item.birthday,
	// 			userType: item.userType,
	// 			editStatus:false
	// 		})
	// 	});
	// 	return result.resultCode
	// };


	/*
	  删除家庭成员
	  * */
	@action
	delFamilyUser = async (authUserId) => {
		let url=`auth/delFamilyUser`;
		let cformData = {
			authUserId: authUserId
		};
		let result=await window.POST({url,cformData});
		if (!result.isSucess) return;
		//this.store.useInfo=result.data;
		return result.resultCode
	};

}
export default Actions;
