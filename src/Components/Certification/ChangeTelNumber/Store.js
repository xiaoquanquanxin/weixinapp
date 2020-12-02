import { observable, action } from 'mobx';
// 定义数据结构
class Store {
    //使用 observable decorator
    @observable tip='我是模板';

	@observable isFinishPototypeInfo=false;		//是否完成了旧信息录入



	@observable ChangeTelNumberInfo={
		certificationPerson: '',		//认证人
		personId: '',					//身份证
        tel: '',						//联系电话
		certificationStatus: 1,			//1:表示有，0：无   ----是否有房产认证
		VerificationCode:''				//验证码
	};

	@observable updatePhone={			//修改用户后用户状态(业主和游客)
	};

	@observable userInfo={				//用户信息
	};

	@observable ChangeNewTelNumberInfo={
		newTel: '',						//联系电话
		VerificationCode:''				//验证码
	};

	@observable userInfoByParam={

	};


}
export default Store;
