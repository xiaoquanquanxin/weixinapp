//import {action } from 'mobx';
// 定义对数据的操作
import { action } from 'mobx/lib/mobx';

class Actions {
    constructor(store) {
        this.store = store;
    }
	/*
   房产认证
   * */
	@action
	userAuth = async() => {
		debugger
		let url=`user/userAuth`;
		let cformData = {
			sessionKey: 'a8e19cc85f6779758c6d004cf22bb28b',
			phoneNo:1341111111,
			identityNo:4401122121211221,
			validCode:123456,
			returnUrl:window.location.href,
		};
		//let cformData = config.format(obj);
		let result=await window.POST({url,cformData});
		if (!result.isSucess) return;
		this.store.userAuthInfo=result.data
        return result.resultCode
	};


	@action
	init=()=>{
		//初始化store变量，都放这里
	}



}
export default Actions;
