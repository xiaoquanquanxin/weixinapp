import {action } from 'mobx';
import { Toast, Modal } from 'antd-mobile';
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
    }
    @action
    Detailsfun = async () => {
        let cformData = {
            orderDetailId: JSON.parse(window.getLocalData("orderDetailId"))
        }
        let result = await window.GET({ url: "auth/orderDetail", cformData });
        if (!result.isSucess) return;
        this.store.DetailsData = result.data

        this.getOrderDetailQrcode()
    }

    @action
    getOrderDetailQrcode = async () => { 
        let cformData = {
            orderDetailId: JSON.parse(window.getLocalData("orderDetailId"))
        }
        let result = await window.GET({ url: "auth/getOrderDetailQrcode", cformData });
        if (!result.isSucess) return;
        this.store.getOrderDetailQrcode = result.data
    }
    @action
    getOrderDetailQrcodefun=(v)=>{
        this.store.getOrderDetailQrcodeval=v
    }

    @action
    scanQRCode = async (history) => {
        //alert("进来扫描")
        if (!window.__initWX__isReady) {
            alert("微信api未准备好")
            return;
        }
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                //alert("成功返回结果" +JSON.stringify(result))
                window.setLocalData("signType", 1)
                history.push(`/HandInBuildingSignInSuccess?orderBulidId=${result}`)
            }
        });
    }
    @action
    ConfirmVisit = async (history) => {
        let cformData = {
            orderDetailId: JSON.parse(window.getLocalData("orderDetailId")),
            calendarId: this.store.DetailsData.calendarId
        }
        let result = await window.POST({ url: "auth/confirmVisitTime", cformData });
        if (!result.isSucess) return;
        if (result.resultCode==0){
            history.push(`/HandInBuildingConfirmVisitSuccess`)
        }
        
    }
    @action
    HandInBuildingModifyTimefun = async (history) => {
        // Modal.alert('提示', "仅能修改一次预约时间，您是否确认修改？", [
        //     {
        //         text: '取消', onPress: () => {
        //         }
        //     }, 
        //     {
        //         text: '确定', onPress: () => {
        //             history.push("/HandInBuildingModifyTime")
        //         }
        //     }
        // ])
        history.push("/HandInBuildingModifyTime")
        //
    }

}
export default Actions;
