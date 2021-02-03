import {action } from 'mobx';
import { Toast } from 'antd-mobile';
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
    }
    @action
    Noticefun = async (activityId) => {
        this.store.Interestselects=[]
        let cformData = {
            activityId: activityId,
        }
        let result = await window.GET({ url: "user/activity/scanCode", cformData });
        if (!result.isSucess) return;
        this.Detailsfun(result.data.joinerId)
        this.joinerId=result.data.joinerId
    }

    @action
    Detailsfun = async (joinerId) => {
        let cformData = {
            joinerId: joinerId
        }
        let result = await window.GET({ url: "user/activity/activitiApplyDetail", cformData });
        if (!result.isSucess) return;
        //this.store.NoticeData = result.data.joinerInfoArr
        //处理paramType5,和6合并数据
        let NoticeData = result.data.joinerInfoArr
        for (let j=0;j<result.data.joinerInfoArr.length;j++){
            let ActiveItemdatastateobj = result.data.joinerInfoArr[j].paramArray
            let ActiveItemdatastateobjnew = []
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
            console.log(ActiveItemdatastateobjnew,"ActiveItemdatastateobjnew")
            NoticeData[j].paramArray = ActiveItemdatastateobjnew
        }
        this.store.NoticeData =NoticeData
        //console.log(result.data.joinerInfoArr, NoticeData, "ActiveItemdatastateobjnew")
    }

    @action
    Interestfun = (joinerInfoId) => {
        console.log(joinerInfoId,"joinerInfoId")
        this.store.Interestselects = this.store.Interestselects.includes(joinerInfoId)
            ? this.store.Interestselects.filter(item => item !== joinerInfoId)
            : [...this.store.Interestselects, joinerInfoId]
        console.log("Interestfun", this.store.Interestselects.join(","), this.store.Interestselects.includes(joinerInfoId))
    }
    @action
    btnfun=async(gprops)=>{
        console.log("btnfun", this.store.Interestselects.join(","), this.joinerId)
        if(this.store.Interestselects.length>0){
            let cformData = {
                joinerInfoIds: this.store.Interestselects.join(",")
            }
            let result = await window.GET({ url: "user/activity/activitiSignin", cformData });
            if (!result.isSucess) return;
            let joinerId = this.joinerId
            gprops.history.push(`/PhasetwoActivitySignUpExamine/${joinerId}`)
        }else{
            Toast.info(`请选择需要签到的人员`, 1)
        }
        
    }
}
export default Actions;
