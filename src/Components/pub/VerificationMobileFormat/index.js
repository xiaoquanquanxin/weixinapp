/*antd-mobile*/
import { Toast } from 'antd-mobile';
/*自定义类*/
const VerificationMobileFormat = {
	//验证格式
	checkMobile: (value) => {
		let str = /^1[3456789]\d{9}$/;
		let re = new RegExp(str);
		let tip = '输入手机格式不对';
		// 手机格式 123 4567 8910
		if (!(value.length < 11)) {
			// 长度大于13
			value = value.replace(/\s+/g, '');
			if (!re.test(value)) {
				Toast.info(tip, 1);
				return false;
			}
		} else {
			// 长度小于13，非手机号号码
			Toast.info(tip, 1);
			return false;
		}
		return true;
	},

	//验证是否为数字
	setCallerNumber: (e)=>{
		let str = e.slice(e.length - 1, e.length).trim();
		// 正则校验
		let reg = /^[0-9]$/;
		let re = new RegExp(reg);
		// 如果包含字母则清除字母
		if (!re.test(str)) {
			//e = e.slice(0, e.length - 1);
			return false
		}
		return true
	}

};



export default VerificationMobileFormat


