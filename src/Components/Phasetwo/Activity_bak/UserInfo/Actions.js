import {action } from 'mobx';
import { Toast } from 'antd-mobile';
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
    }
    @action
    Noticefun = async (history) => {
        this.Toast=2
        this.store.authshow = ""
        let winobj = window.getQueryString();
        this.joinerId=winobj.joinerId
        // this.bcjoinerId=""
        this.bcjumpType=""
        if (winobj.auth==-1){//编辑游客报名信息
            let cformData = {
                activityId: window.getLocalData("activityid")
            }
            let result = await window.GET({ url: "user/activity/addSignupMember", cformData });
            if (!result.isSucess) return;
            
            let UserInfodata = JSON.parse(window.getLocalData('UserInfodata')) ? JSON.parse(window.getLocalData('UserInfodata')):[]
            //result.data.forEach((v, i) => {
            this.store.UserInfodata = [];
            let wxUserId = UserInfodata.length+1
            //console.log(22233, this.store.UserInfodata.length, wxUserId)
                this.store.UserInfodata.push({
                    name: "",
                    phoneNo: "",
                    sex: "",
                    linkWxUserId: "",
                    wxUserId:wxUserId,
                    paramArray: [],
                    paramArr: []
                })
                if (result.data.length > 0) {
                    result.data.forEach((vv, ii) => {
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
                }
           // })
        } else if (winobj.auth==-2){//编辑报名信息
            this.store.UserInfodata = [];
            let cformData = {
                joinerId: winobj.joinerId
            }
            let result = await window.GET({ url: "user/activity/editJoinerInfo", cformData });
            if (!result.isSucess) return;
            
            result.data.joinerInfoArr.forEach((v, i) => {
                this.store.UserInfodata.push({
                    name: v.joinerName,
                    phoneNo: v.joinerPhone ? window.trim(v.joinerPhone) : v.joinerPhone,
                    sex: v.joinerSex,
                    dataId: v.dataId,
                    linkWxUserId: v.linkWxUserId,
                    paramArray: [],
                    paramArr: []
                })
                if (result.data.paramArray.length > 0) {
                    result.data.paramArray.forEach((vv, ii) => {
                        v.paramArr.forEach((vvv, iii) => {
                            //console.log(9999, this.store.UserInfodata, v.paramArr, vv.paramOptions, vv.paramType == 2 ? vvv.extValues : [])
                            if (vv.id == vvv.signupParamId){
                                
                                this.store.UserInfodata[i].paramArr.push({
                                    id: vvv.signupParamId,
                                    extId: vvv.extId,
                                    extTitle: vvv.extTitle,
                                    paramType: vv.paramType,
                                    extValues: vvv.extValues,
                                    paramOptions: [],
                                    Interestselects: vv.paramType == 2 && Array.isArray(vvv.extValues)? vvv.extValues:[]
                                })
                                //console.log(8888, this.store.UserInfodata)
                            }
                            
                    })
                        if (vv.paramType == 1 || vv.paramType == 2) {
                            if (vv.paramOptions.length > 0) {
                                vv.paramOptions.forEach((vvvv, iiii) => {
                                    //console.log(555555, i,this.store.UserInfodata[i].paramArr)
                                    if (this.store.UserInfodata[i].paramArr.length>0){
                                        this.store.UserInfodata[i].paramArr[ii].paramOptions.push({
                                            label: vvvv,
                                            value: vvvv
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            })
            console.log("UserInfodata111",this.store.UserInfodata)
        }else{ //补充业主信息
            
            let UserInfodata = JSON.parse(window.getLocalData('UserInfodata')) ? JSON.parse(window.getLocalData('UserInfodata')) : []
            this.store.UserInfodata = [];
            let cformData = {
                activityId: window.getLocalData("activityid"),
                linkWxUserId: winobj.auth,
                roomId: winobj.roomId
            }
            console.log("cformData",cformData)
            let result = await window.GET({ url: "user/activity/editOwnerInfo", cformData });
            this.store.authshow = 1
            if (!result.isSucess) return;
            
            // this.bcjoinerId=result.data.joinerId
            this.bcjumpType=result.data.jumpType
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
                if (v.paramArray&&v.paramArray.length > 0) {
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
            if (UserInfodata.length>0){
                UserInfodata.forEach((v,i)=>{
                    this.store.UserInfodata.forEach((vv,ii)=>{
                        if (vv.linkWxUserId==v.linkWxUserId){
                            //console.log(1221, this.store.UserInfodata, UserInfodata,i,ii)
                            this.store.UserInfodata[ii] = UserInfodata[i]
                        }
                    })
                })

            }
            
        }
        this.citylistfun()
        this.store.authshow = 1
    }
    
    @action
    citylistfun = async () => {
        let result = await window.GET({ url: "/user/activity/getWxCityList" });
        if (!result.isSucess) return;
        this.store.citylist = result.data;
    }

    @action
    inputfun = (e, i, name,ii=-1)=>{
        if (ii == -1){
            this.store.UserInfodata[i][name] = e
        }else{
            this.store.UserInfodata[i].paramArr[ii].extValues = e
        }
    }

    @action
    Pickerfun = (v,vname,i,ii)=>{
        //console.log(7777,v)
        this.store.UserInfodata[i].paramArr[ii].extValues=v
    }

    @action
    Interestfun = (name, i, ii) => {
        console.log(222,this.store.UserInfodata[i].paramArr[ii].Interestselects)
        this.store.UserInfodata[i].paramArr[ii].Interestselects = this.store.UserInfodata[i].paramArr[ii].Interestselects.includes(name)
            ? this.store.UserInfodata[i].paramArr[ii].Interestselects.filter(item => item !== name)
            : [...this.store.UserInfodata[i].paramArr[ii].Interestselects, name]
        //console.log(111, this.store.UserInfodata[i].paramArr[ii].Interestselects, this.store.UserInfodata[i].paramArr[ii].Interestselects.includes(name))
        this.store.UserInfodata[i].paramArr[ii].extValues = this.store.UserInfodata[i].paramArr[ii].Interestselects
        //console.log(222,this.store.UserInfodata[i].paramArr[ii].extValues )
    }

    @action
    submit = async (history)=>{
        //console.log(222111)
        if (this.store.UserInfodata.length == 0) {
            history.push('/PhasetwoActivityUserList')
        }
        
        for (let i = 0; this.store.UserInfodata.length>i;i++){
            let v = this.store.UserInfodata[i]
            console.log(window.phone(v.phoneNo))
                    if (v.paramArr && v.paramArr.length>0){
                        console.log("Toastfun1", v.paramArr.every(this.checkAdult))
                        if (v.paramArr.every(this.checkAdult)){
                            this.Toastfun(history)
                        } else {
                            Toast.info(`内容不能为空`, 1)
                        }
                        
                    }else{
                        console.log("Toastfun2")
                        if (this.store.UserInfodata.length == i + 1) {
                            this.Toastfun(history)
                        }
                    }
        }

    }

    @action
    checkAdult =  (vv) => {
       // console.log(vv)
        return vv.id != "" && vv.paramTitle != "" && vv.paramType != "" && vv.extValues != ""
    }

    @action
    Toastfun=async(history)=>{
        let UserInfodata=[]
        let linkWxUserId=[]
            let winobj = window.getQueryString();
            if (winobj.auth == -1){
                UserInfodata = JSON.parse(window.getLocalData('UserInfodata')) ? JSON.parse(window.getLocalData('UserInfodata')) : []
                UserInfodata[UserInfodata.length]=this.store.UserInfodata[0]
                window.setLocalData('UserInfodata', UserInfodata )
                history.push('/PhasetwoActivityUserList')
                console.log("确认", this.store.UserInfodata)
            } else if (winobj.auth == -2){
                console.log(20202020,this.store.UserInfodata)
                this.store.UserInfodata.forEach((v,i)=>{
                    UserInfodata.push({
                        joinerName: v.name,
                        dataId: v.dataId,
                        joinerPhone: v.phoneNo,
                        joinerSex: v.sex,
                        paramArr: []
                    })
                    if (v.paramArr && v.paramArr.length>0){
                        v.paramArr.forEach((vv, ii) => {
                            UserInfodata[i].paramArr.push({
                                extId: vv.extId,
                                extValues: vv.paramType == 2 ? vv.extValues : vv.extValues
                            })
                        })
                    }
                })
                console.log(21212121,UserInfodata)
                let cformData = UserInfodata
                let result = await window.POSTJSON({ url: 'user/activity/saveEditJoinerInfo', cformData });
                if (!result.isSucess) return;
                let winobj = window.getQueryString();
                history.push('/PhasetwoActivitySignUpExamine/' + this.joinerId)
                
                console.log(123,this.store.UserInfodata)
            }
            else{
                UserInfodata = JSON.parse(window.getLocalData('UserInfodata')) ? JSON.parse(window.getLocalData('UserInfodata')) : []
                console.log(111,UserInfodata, this.store.UserInfodata)
                if (UserInfodata.length>0){
                    this.store.UserInfodata.forEach((v, i) => {
                        UserInfodata.forEach((vv, ii) => {
                            linkWxUserId.push(vv.linkWxUserId)
                                if (v.linkWxUserId == vv.linkWxUserId) {
                                    UserInfodata[ii] = this.store.UserInfodata[i]
                                    
                                    console.log(888,UserInfodata)
                                }else{
                                    if (!linkWxUserId.includes(v.linkWxUserId)) {
                                        UserInfodata = [...UserInfodata,v]
                                        linkWxUserId.push(v.linkWxUserId)
                                        console.log(999, UserInfodata)
                                    }
                                }
                        })
                    })
                }else{
                    UserInfodata = this.store.UserInfodata
                }
                
                console.log(this.bcjumpType,111)
                if (this.bcjumpType==1){
                    window.setLocalData('UserInfodata', UserInfodata)
                    history.push('/PhasetwoActivityUserList')
                }
                
            }
        
    }

    @action
    pickerareafun = (v, vname, picki, pickii) => {
        let citylist = this.store.citylist
        let cityName = ""
        for (let i = 0; i < citylist.length; i++) {
            if (citylist[i].value == v[0]) {
                cityName = citylist[i].label

                for (let ii = 0; ii < citylist[i].children.length; ii++) {
                    if (citylist[i].children[ii].value == v[1]) {
                        cityName = cityName + '-' + citylist[i].children[ii].label
                        for (let iii = 0; iii < citylist[i].children[ii].children.length; iii++) {
                            if (citylist[i].children[ii].children[iii].value == v[2]) {
                                cityName = cityName + '-' + citylist[i].children[ii].children[iii].label
                                this.store.UserInfodata[picki].paramArr[pickii].extValues = cityName
                            }
                        }
                    }
                }
            }
        }
        console.log(7777, v, cityName)
    }
}
export default Actions;
