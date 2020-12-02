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

	
	@observable getverificationval = true
	@observable timesecond = 60

	@observable phoneval=''
	@observable IdentityNoval=''
	@observable Nameval=''

	@observable verificationval = ''//验证码
	@observable IdentityNoval = ''//身份证号码
	@observable identityImg = ''//身份证照片
	@observable faceImg = ''//正面照
	@observable custId = ''//正面照

	@observable Modalval=false
	@observable choicephoneindex = ''
	@observable custList=[
	// 	{
	// 	custId:"phoneNo",
	// 	phoneNo:"13660801711"
	// }, {
	// 		custId: "phoneNo",
	// 		phoneNo: "phoneNo"
	// 	}
	]

	@observable heightval='auto'


}
export default Store;
