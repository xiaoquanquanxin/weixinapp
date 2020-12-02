import {action } from 'mobx';
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
    }
    incA = () => {
         this._test()
    }

	incB = () => {
		return 1

	}

	_test =async () => {
		this.store.test=await this.incB()
	}

    @action
    SignInSuccessfun = async () => {
        let cformData = {
            orderBulidId: window.getQueryString().orderBulidId,
            orderDetailId: JSON.parse(window.getLocalData("orderDetailId")),
            signType: JSON.parse(window.getLocalData("signType")),
            orderEntrustId: JSON.parse(window.getLocalData("orderEntrustId"))
        };
        console.log("cformData", cformData)
        let result = await window.POST({ url: "user/orderSignin", cformData });
        if (result.resultCode==0){
            this.store.resultTitle=1
           
        }else{
            this.store.resultTitle = 2
        }
        
        if (!result.isSucess) return;
        this.store.SignInSuccessData = result.data
    }
}
export default Actions;
