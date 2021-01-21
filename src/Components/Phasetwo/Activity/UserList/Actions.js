//import {action } from 'mobx';
// 定义对数据的操作
import config from '../../../../config';
import {action} from 'mobx/lib/mobx';
import {Toast} from 'antd-mobile';

class Actions {
    constructor(store){
        this.store = store;
    }

    /*
      获取用户信息
      * */
    @action
    userInfo = async () => {
        console.log(99999, document.referrer)
        this.success = ""
        this.Toast = ""
        this.store.getRoomInfo = [];
        this.store.userList = [];
        this.store.roomName = '';
        this.store.roomId = '';
        this.store.Interestselects = []
        this.store.UserInfodata = JSON.parse(window.getLocalData('UserInfodata')) ? JSON.parse(window.getLocalData('UserInfodata')) : []
        // let activityid=window.getLocalData("activityid")
        // console.log(2222, activityid,parseInt(activityid))
        let cformData = {activityId: window.getLocalData("activityid")};
        let result = await window.GET({url: 'user/activity/signup', cformData});
        if (!result.isSucess) return;
        console.log(11, result.data.roomList, this.store.getRoomInfo.length)
        result.data.roomList.forEach((v, i) => {
            this.store.getRoomInfo.push({
                label: v.roomName,
                value: v.roomId,
                userList: v.userList
            })


        })
        //this.store.getRoomInfo=[]//调试游客

        if (this.store.getRoomInfo.length > 0) {
            this.store.roomName = this.store.getRoomInfo[0].label;
            this.store.roomId = this.store.getRoomInfo[0].value;
            this.store.userList = result.data.roomList[0].userList;
            if (this.store.UserInfodata.length > 0) {
                this.store.userList.forEach((v, i) => {

                    this.store.UserInfodata.forEach((vv, ii) => {
                        //console.log(999, v,vv)
                        if (v.wxUserId == vv.linkWxUserId) {
                            this.store.userList[i] = vv
                            this.store.userList[i].userType = v.userType
                            this.store.userList[i].wxUserId = v.wxUserId
                            //console.log(999, vv.paramArr, this.store.userList)
                        }
                    })
                })
            }


        }
        //console.log(3331, this.store.getRoomInfo, this.store.roomId)
    }
    @action
    getLocalDatafun = async (history, joinerArr) => {

        console.log(2222, this.success)
        this.Toast = 0
        if (this.store.Interestselects.length > 0) {
            let cformData = {
                joinerArr: joinerArr,
                activityId: window.getLocalData("activityid"),
                roomId: this.store.roomId
            };
            console.log("提交", cformData)
            let result = await window.POSTJSON({url: 'user/activity/signupSubmit', cformData});
            if (!result.isSucess) return;
            window.delLocalData('UserInfodata')

            history.push('/PhasetwoActivitySignUpSuccess?joinerId=' + result.data)
        } else {
            Toast.info(`内容不能为空`, 1);
        }
        //this.success = this.success+1

    }

    @action
    submitfun = async (history) => {
        //this.success == 1
        let joinerArr = [];

        console.log(this.store.Interestselects.join(","))
        //alert(JSON.stringify(this.store.Interestselects))

        if (this.store.getRoomInfo.length > 0) {
            if (this.store.UserInfodata.length > 0) {
                //wxUserId//wxUserId
                this.store.Interestselects.forEach((v, i) => {
                    this.store.UserInfodata.forEach((vv, ii) => {
                        if (v == vv.linkWxUserId) {
                            //console.log(8888, this.Toastfun(), this.Toastfun)
                            // this.Toastfun()
                            //ilength = ilength+1

                            joinerArr.push({
                                joinerName: vv.name,
                                joinerPhone: vv.phoneNo,
                                joinerSex: vv.sex,
                                linkWxUserId: vv.linkWxUserId,
                                paramArr: []
                            })
                            if (vv.paramArr.length > 0) {
                                vv.paramArr.forEach((vvv, iii) => {
                                    //console.log(22222,iii,ii)
                                    joinerArr[joinerArr.length - 1].paramArr.push({
                                        signupParamId: vvv.id,//signupParamId
                                        extTitle: vvv.extTitle,
                                        extValues: vvv.paramType == 2 ? vvv.extValues : vvv.extValues
                                    })
                                })
                            }
                        }
                    })
                })
            }
            this.Toastfun()
            console.log(this.Toast)
            if (+this.Toast === 1) {
                this.getLocalDatafun(history, joinerArr)
            } else {
                let cformData = {
                    activityId: window.getLocalData("activityid"),
                    linkWxUserId: this.store.Interestselects.join(","),
                    roomId: this.store.roomId
                }
                console.log("cformData", cformData)
                let result = await window.GET({url: "user/activity/editOwnerInfo", cformData});
                if (!result.isSucess) return;
                if (result.resultCode == 0) {
                    if (result.data.jumpType == 2) {
                        //console.log(22222222222222199)
                        history.push('/PhasetwoActivitySignUpSuccess?joinerId=' + result.data.joinerId)
                        // history.push('/PhasetwoActivitySignUpExamine/' + this.bcjoinerId)
                    } else {
                        history.push('/PhasetwoActivityUserInfo?auth=' + this.store.Interestselects.join(",") + '&roomId=' + this.store.roomId)
                    }

                }
            }
            // else{
            // 	history.push('/PhasetwoActivityUserInfo?auth=' + this.store.Interestselects.join(",") + '&roomId=' + this.store.roomId)//业主确认
            // }
        } else {
            if (this.store.UserInfodata.length > 0) {
                this.store.Interestselects.forEach((v, i) => {
                    this.store.UserInfodata.forEach((vv, ii) => {
                        if (v == vv.wxUserId) {
                            joinerArr.push({
                                joinerName: vv.name,
                                joinerPhone: vv.phoneNo,
                                joinerSex: vv.sex,
                                linkWxUserId: vv.linkWxUserId,
                                paramArr: []
                            })
                            if (vv.paramArr.length > 0) {
                                vv.paramArr.forEach((vvv, iii) => {
                                    joinerArr[ii].paramArr.push({
                                        signupParamId: vvv.id,//signupParamId
                                        extTitle: vvv.extTitle,
                                        extValues: vvv.paramType == 2 ? vvv.extValues : vvv.extValues
                                    })

                                })
                            }

                        }
                    })
                })
                this.getLocalDatafun(history, joinerArr)


            } else {
                history.push('/PhasetwoActivityUserInfo?auth=-1')//游客确认
            }
        }
    }

    @action
    topfunproject = async (roomId) => {
        console.log("roomId", roomId)
        this.store.getRoomInfo.forEach((item, index) => {
            if (roomId == item.value) {
                this.store.roomId = item.value
                this.store.roomName = item.label
                this.store.userList = item.userList
            }
        });
    }


    @action
    Interestfun = (wxUserId) => {
        this.store.Interestselects = this.store.Interestselects.includes(wxUserId)
            ? this.store.Interestselects.filter(item => item !== wxUserId)
            : [...this.store.Interestselects, wxUserId]
        console.log(111, JSON.stringify(this.store.Interestselects), this.store.Interestselects.join(","), this.store.Interestselects.includes(wxUserId))
        //this.store.auth=
    }


    @action
    Toastfun = function (){
        let ilength = 0;
        this.store.Interestselects.forEach((v, i) => {
            this.store.UserInfodata.forEach((vv, ii) => {
                if (v == vv.linkWxUserId) {
                    ilength = ilength + 1
                    if (ilength == this.store.Interestselects.length) {
                        this.Toast = 1
                    }
                }
            })
        })


    }
    @action
    out = () => {
        window.delLocalData('UserInfodata')
    }


}

export default Actions;
