import {action } from 'mobx';
import {Modal} from 'antd-mobile';
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
    }
    @action
    UploadSelfInfofun = () => {
        this.store.saveEntrustInfo = JSON.parse(window.getLocalData("saveEntrustInfo"))
        this.store.AddRepair.orderDetailId=this.store.saveEntrustInfo.orderDetailId
        this.store.AddRepair.trustName=""
        this.store.AddRepair.trustIdentityNo=""
        this.store.AddRepair.trustPhoneNo=""
        this.store.authPhoto=""
        this.store.identityPhotoFront=""
        this.store.colorStyle = false
    }
    @action
    colorStylefun=()=>{
        this.store.colorStyle = 
        this.store.AddRepair.trustName && 
        this.store.AddRepair.trustIdentityNo && 
        this.store.AddRepair.trustPhoneNo ? true : false
    }
    
    @action
    SignSavefun = async (history)=>{
        console.log("AddRepair", this.store.AddRepair)
        //window.identity()
        if (window.phone(this.store.AddRepair.trustPhoneNo) && this.store.AddRepair.trustIdentityNo!="") {
            if (this.store.authPhoto != "" && this.store.identityPhotoFront != "") {

            
            let cformData = {
                orderDetailId: this.store.AddRepair.orderDetailId,
                trustName: this.store.AddRepair.trustName,
                trustPhoneNo: this.store.AddRepair.trustPhoneNo,
                trustIdentityNo: this.store.AddRepair.trustIdentityNo,
                authPhoto: this.store.authPhoto,
                identityPhotoFront: this.store.identityPhotoFront
            }
           
            
            //let cformData = this.store.AddRepair
            //alert("結果" + JSON.stringify(cformData))
           
            // wx.scanQRCode({
            //     needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            //     scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            //     success: function (res) {
            //         var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            //     }
            // });
                let result = await window.POSTJSON({ url: "user/saveEntrustInfo", cformData });
                if (!result.isSucess) return;
                window.setLocalData("orderEntrustId", result.data)
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: async(res)=> {
                    
                    //alert(JSON.stringify(result))
                    let resultcode = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    window.setLocalData("signType", 2)
                    //alert("成功返回结果" + JSON.stringify(result))
                    history.push(`/HandInBuildingSignInSuccess?orderBulidId=${resultcode}`)
                }
            });
            //history.push("/HandInBuildingSignInSuccess")
            }else{
                Modal.alert('提示', "身份证或者委托书沒有上传", [
                    { text: '确定', onPress: () => { } }
                ])
            }
        } else {
            Modal.alert('提示', "手机号或者身份证有误，请重新输入", [
                { text: '确定', onPress: () => { } }
            ])
        }

        
    }
    // @action
    // imgonefun = async(img)=>{
    //     this.store[img]=await this.uploadimgone()
    //     alert(JSON.stringify(await this.uploadimgone()))
    // }
    @action
    uploadimgone = async (img)=> {
        if (!window.isWeiXin()) {
            alert("请用微信打开")
        }
        /*wx.checkJsApi({
            jsApiList: ['chooseImage','uploadImage','getLocalImgData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function(res) {
                alert("checkJsApi:"+JSON.stringify(res))
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            }
        });*/
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            fail: () => {
                if (JSON.stringify(arguments) != '{}') {
                    //this.props.change("chooseImage_fail",arguments)
                }
                alert("网络不好，请重新选择")
            },
            success: (res) => {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
               // alert("localIds:" + JSON.stringify(localIds))
                // this.props.change("chooseImage",res)
                //返回的格式：
                //["wxLocalResource://xxxxxx"]
                var THIS = this;
                wx.getLocalImgData({
                    localId: localIds[0], // 图片的localID
                    success: res => {
                        var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                        if (localData.indexOf('data:image') != 0) {
                            localData = 'data:image/jpeg;base64,' + localData
                        }
                        //alert("getLocalImgData success localId:"+localIds+"localIds:"+JSON.stringify(localIds))
                        // THIS._addImg(localData,localIds)
                    }
                });
                wx.uploadImage({
                    localId: localIds[0], // 需要上传的图片的本地ID，由chooseImeage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: (res1) => {
                        var serverId = res1.serverId; // 返回图片的服务器端ID
                        // this.props.change("uploadImage",res1)
                        //alert("uploadImage success serverId:"+serverId)
                        let cformData = { mediaId: serverId }
                        // let prefix="http://211.159.163.183:9090/mock/150/";
                        window.POST({ url: "user/common/uploadFileByMediaId", cformData }).then((data) => {
                            //成功
                          //  alert("返回的数据:"+JSON.stringify(data))
                            if (!data.isSucess) return;
                            // let visitUrl=data.data.visitUrl;
                            let id = data.data.id;
                            let visitUrl = data.data.visitUrl
                            this.store[img] = data.data.visitUrl
                           // alert("返回的数据111:" + JSON.stringify(this.store[img]) + this.store["identityPhotoFront"] )
                            // return visitUrl
                        }, () => {
                            //失败
                        })
                    },
                    fail: () => {
                        if (JSON.stringify(arguments) != '{}') {
                            alert("uploadImage fail:", JSON.stringify(arguments))
                            // this.props.change("uploadImage_fail",arguments)
                        }
                        //alert("失败"+JSON.stringify(arguments))
                    }
                });

            }
        });
    }


}
export default Actions;
