//import {action } from 'mobx';
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


}
export default Actions;
