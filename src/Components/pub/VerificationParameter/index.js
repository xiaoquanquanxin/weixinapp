/*共用的*/
import React from 'react';
/*antd-mobile*/
import { Toast } from 'antd-mobile';
import instance from '../../../../lib/utils/instance';

/*自定义类*/

//下面类暂时没用到
class VerificationParameter {
	constructor () {
	}

	gobalFlag = false;
	//迭加器
	__checkParameter = (obj,fun) => {
		let { keys, values, entries } = Object;
		for (let [key, value] of entries(obj)) {
			// console.log('key,value__________',  key, value);
			if (!value) { //非空不会进fun方法,也就不会中断
				this.gobalFlag=true;
				fun(this.gobalFlag,key);
				return false
			}
		}
	};

	//检查为空对象
	__checkIsValue = (obj) => {
		if (JSON.stringify(obj) == "{}") {
			Toast.info('空对象',1);
			return false;
		}
		return true;
	};
	}

//检查类型
VerificationParameter.prototype.parameterType = (obj,fun) => {
	const bolean = obj instanceof Object || obj instanceof Array;
	if (bolean && VerificationParameter.__checkIsValue(obj)) {
		VerificationParameter.__checkParameter(obj,fun);
	}
};

export default VerificationParameter = new VerificationParameter();







