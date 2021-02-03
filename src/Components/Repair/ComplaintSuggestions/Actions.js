import {action } from 'mobx';
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
    }
    // incA = () => {
    //      this._test()
    // }

	// incB = () => {
	// 	return 1

	// }

	// _test =async () => {
	// 	this.store.test=await this.incB()
	// }

    @action
    areaPhoneList = async () => {
        let urlobj = window.getQueryString();
        let url = ""
        if (urlobj && urlobj.phone==1){
            url = "auth/areaPhoneProjectList"
        } else {
            url = "user/maintain/areaPhoneList";
        }
        let cformData = {}
        let result = await window.GET({ url, cformData });
        if (!result.isSucess) return;
        this.store.areaPhoneList = result.data
    }
}
export default Actions;
