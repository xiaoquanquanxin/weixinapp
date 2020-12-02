//import {action } from 'mobx';
// 定义对数据的操作
import { action } from 'mobx/lib/mobx';

class Actions {
    constructor(store) {
        this.store = store;
    }


	//修改用户信息
	@action
	updatePhone = async(body) => {
		let url=`user/updatePhone`;
		let cformData = {...body};
		let result=await window.POST({url,cformData});
		if (!result.isSucess) return;
		this.store.updatePhone=result.data.authStatus;  //当前用户状态（业主，游客）
		return result.resultCode
	};
	//根据参数获取用户信息
	@action
	userInfoByParam = async(body) => {
		let url=`user/userInfoByParam`;
		let cformData = {...body};
		let result=await window.GET({url,cformData});
		if (!result.isSucess) return;
		this.store.userInfoByParam=result.data;  //返回用户id，为更换号码接口用
		return result
	};

	@action
	init = async(body) => {
	}


}
export default Actions;
