import { observable, action } from 'mobx';
// 定义数据结构
class Store {
    //使用 observable decorator
    @observable tip='我是模板';

/*获取用户信息*/
	@observable useInfo={
	};


	@observable userFamily=[
		{
			id: '',
			fullName:'',
			sex: '',
			phoneNo: '',
			identityNo: '',
			birthday: '',
			userType: '',
			editStatus:false
		},
	];
	@observable getRoomInfo = [
	];
	@observable roomId=-1
	@observable roomName=-1
	@observable userType=-1

	@observable Interestselects = []
	@observable userList = []

	@observable UserInfodata=[]
	




}
export default Store;
