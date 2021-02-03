//import {action } from 'mobx';
// 定义对数据的操作
import {action} from 'mobx/lib/mobx';

class Actions {
    constructor(store){
        this.store = store;
    }

    //  初始化
    init(){
        const store = this.store;
        store.getRoomInfo = [];
        store.roomId = -1;
        store.roomName = -1;
        store.roomCmdsId = -1;
        store.userType = -1;
    }

    /*
      获取用户信息
      * */
    @action
    userInfo = async () => {
        const store = this.store;
        let result = await window.GET({url: 'user/userInfo',});
        if (!result.isSucess) {
            return;
        }
        store.useInfo = result.data;
        let cformData = {userType: 0};
        let resultgetRoomInfo = await window.GET({url: 'auth/getRoomInfo', cformData});
        if (!resultgetRoomInfo.isSucess) {
            return;
        }
        const {getRoomInfo} = store;
        for (let i = 0; resultgetRoomInfo.data.length > i; i++) {
            const getRoomInfoData = getRoomInfo[i] || {};
            const currentData = resultgetRoomInfo.data[i];
            getRoomInfoData.label = currentData.roomName;
            getRoomInfoData.value = currentData.roomId;
            getRoomInfoData.userType = currentData.userType;
            getRoomInfoData.custId = currentData.custId;
            getRoomInfo [i] = getRoomInfoData;
        }
        // console.log(JSON.parse(JSON.stringify(getRoomInfo)));
        if (!getRoomInfo.length) {
            return;
        }
        store.roomId = getRoomInfo[0].value;
        store.custId = getRoomInfo[0].custId;
        this.topfunproject(store.roomId);
    };
    @action
    topfunproject = async (roomId) => {
        const store = this.store;
        store.getRoomInfo.forEach((item, index) => {
            if (roomId === item.value) {
                store.roomName = item.label;
                store.userType = item.userType;
                store.roomId = roomId;
            }
        });
        console.log('roomId', roomId);
        console.log('roomName', store.roomName,);
        console.log('userType', store.userType,);

        let cformData = {roomId};
        let result = await window.GET({url: 'auth/userFamily', cformData});
        if (!result.isSucess) {
            return;
        }
        store.userFamily = [];
        //  过滤数据
        result.data.forEach((item, index) => {
            if (item.phoneNo && item.memberId) {
                store.userFamily.push({
                    id: item.id,
                    memberId: item.memberId,
                    fullName: item.fullName,
                    sex: item.sex,
                    phoneNo: item.phoneNo,
                    birthday: item.birthday,
                    userType: item.userType,
                    authUserId: item.authUserId,
                    editStatus: false
                })
            }
        });
    };

    /*获取用户下的房间信息userType	1-业主，2 - 家属，3 - 租客，0 - 所有 /auth/getRoomInfo*/

    // @action
    // getRoomInfo = async() => {
    // 	let url=`auth/getRoomInfo`;
    // 	let cformData = { userType:0};
    // 	let result = await window.GET({ url:'auth/getRoomInfo',cformData});
    // 	if (!result.isSucess) {
    //         return;
    //     }
    // 	this.store.getRoomInfo=result.data;
    // };

    /*家庭成员信息* roomId*/
    // @action
    // userFamily = async(body) => {
    // 	let url=`auth/userFamily`;
    // 	let obj = { ...body };
    // 	let cformData = config.format(obj);
    // 	let result=await window.GET({url,cformData});
    // 	if (!result.isSucess) {
    //         return;
    //     }
    // 	const array=result.data;
    // 	array.forEach((item,index)=>{
    // 		this.store.userFamily.push({
    // 			id: item.id,
    // 			fullName: item.fullName,
    // 			sex: item.sex,
    // 			phoneNo: item.phoneNo,
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
        let url = `auth/delFamilyUser`;
        let cformData = {
            authUserId: authUserId
        };
        let result = await window.POST({url, cformData});
        if (!result.isSucess) {
            return;
        }
        //this.store.useInfo=result.data;
        return result.resultCode
    };

}

export default Actions;
