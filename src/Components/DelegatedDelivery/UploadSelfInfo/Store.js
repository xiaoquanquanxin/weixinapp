import { observable, action } from 'mobx';
//          定义数据结构


class Store {
    //使用 observable decorator
	@observable tip='我是模板';
	@observable saveEntrustInfodata={}
	@observable trustName=""
	@observable trustIdentityNo =""
	@observable trustPhoneNo=""
	@observable saveEntrustInfo={}
	@observable colorStyle=false
	@observable personIdimg=""
	@observable identityPhotoFront=""
	@observable authPhoto=""
	//上传图片列表
	//@observable array=[temp,temp2,temp,temp2];


	//添加报修
	@observable AddRepair={
		orderDetailId: '',		//预约详情ID
		trustName: '',			//被委托人
		trustPhoneNo: '',			//手机号码
		trustIdentityNo: '',				//身份证号
		authPhoto: '',	//授权书照片
		identityPhotoFront: ''			//身份证照片

	};
	//使用 observable decorator

	@observable test=0


}
export default Store;
