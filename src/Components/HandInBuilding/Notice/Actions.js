import { observable, action } from 'mobx';
import { Modal } from 'antd-mobile';
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
    }
    @action
    Noticefun = async () => {
        let uObj = window.getQueryString();
        console.log(uObj.orderDetailId)
        window.setLocalData("orderDetailId", uObj.orderDetailId)
        let cformData={
            orderDetailId: uObj.orderDetailId
        };
        let result = await window.GET({ url: "auth/orderNotice", cformData, isAutoError:false });
        if (result.resultCode==0){
            this.store.NoticeData = result.data
        } else if (result.resultCode < 0 || 0 < result.resultCode){
            Modal.alert('提示', result.resultMsg, [
                {
                    text: '确定', onPress: () => {
                        wx.closeWindow()
                    }

                }
            ])
        }else{
            
        }
        //if (!result.isSucess) return;
    };




	/*微信端法大大认证接口* */
	@action
	qryPersonalCertification = async(body) => {
		let url = `user/personalCertification`;
		let cformData = {
            ...body
		};
		let result = await window.GET({ url, cformData });
		this.store.userAuthInfo = result.data;
		window.location.href= result.data.url //跳法大大的链接
	};



	/*获取用户信息* */
	@action
	userInfo = async() => {
		let url=`user/userInfo`;
		let cformData = { };
		let result=await window.GET({url,cformData});
		this.store.currentUseInfo=result.data
	};

    @action
    init=()=>{
        //初始化store变量，都放这里
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
}
export default Actions;
