import {action} from 'mobx';
import {Toast, Modal} from 'antd-mobile';

// 定义对数据的操作
class Actions {
    constructor(store){
        this.store = store;
    }

    @action
    Detailsfun = async (joinerId) => {
        this.store.joinerId = joinerId;
        //console.log(222, this.store.joinerId)
        const cformData = {
            joinerId: this.store.joinerId
        };
        let result = await window.GET({url: "user/activity/activitiApplyDetail", cformData});
        if (!result.isSucess) {
            return;
        }
        this.store.DetailsData = result.data;
        window.setLocalData("signDetailsData", this.store.DetailsData);
        this.findInfoByJoinerIdfun(joinerId)
    };
    @action
    findInfoByJoinerIdfun = async (joinerId) => {
        const cformData = {
            joinerId,
        };
        //  todo   这个接口是干什么的
        let result = await window.GET({url: "user/activity/findInfoByJoinerId", cformData});
        if (!result.isSucess) {
            return;
        }
        this.store.findInfoByJoinerId = result.data
    };

    @action
    scanQRCode = async (history, joinerId) => {
        //alert("进来扫描", joinerId)
        if (!window.__initWX__isReady) {
            alert("微信api未准备好");
            return;
        }
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res){
                const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                // alert("成功返回结果" +JSON.stringify(result))
                // ${ joinerId }?activityId =
                window.location.href = result;
                //history.push(`/PhasetwoActivitySignInConfirm/${result}`)
            }
        });
    };
    @action
    modifyfun = async (history) => {
        //this.store.DetailsData
        //history.push('/PhasetwoActivityUserInfo?auth=' + this.store.Interestselects.join(","))//业主确认
        //history.push('/PhasetwoActivityUserInfo?auth=-1')//游客确认
        // window.setLocalData("signDetailsData", this.store.DetailsData)
        // history.push(`/PhasetwoActivitySignInConfirm/${this.store.joinerId}?activityId=1`)
        Modal.alert('提示', "仅能修改一次信息，您是否确认修改？", [
            {
                text: '取消', onPress: () => {
                }
            },
            {
                text: '确定', onPress: () => {
                    history.push('/PhasetwoActivityUserInfo?auth=-2&joinerId=' + this.store.joinerId)
                }
            }
        ])
    };

    @action
    cancelfun = async (history) => {
        const cformData = {
            joinerId: this.store.joinerId
        };
        let result = await window.GET({url: "user/activity/cancelSignup", cformData});
        if (!result.isSucess) {
            return;
        }
        history.push('/PhasetwoActivityCancelSuccess')
    }
}

export default Actions;
