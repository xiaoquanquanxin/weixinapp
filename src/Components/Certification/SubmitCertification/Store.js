import {observable, action} from 'mobx';

// 定义数据结构
class Store {
    //使用 observable decorator
    @observable tip = '我是模板';
    @observable submitCertification = {
        // certificationPerson: '',		//认证人
        personId: '',					//身份证
        tel: '',						//联系电话
        // certificationStatus: 1,			//1:表示有，0：无   ----是否有房产认证
        VerificationCode: ''				//验证码
    };
    //房产认证
    @observable userAuthInfo = {};

    @observable authshow = 0;
    @observable phoneNo = "";
    @observable validCode = "";
    @observable colorStyle = false
}

export default Store;
