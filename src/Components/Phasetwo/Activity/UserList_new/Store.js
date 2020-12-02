import { observable, action } from 'mobx';
// 定义数据结构
class Store {
    //使用 observable decorator
    @observable tip='我是模板';
	@observable needCost=""
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

	@observable citylist = [{
		"label": "北京市",
		"value": "110000",
		"children": [{
			"label": "北京市",
			"value": "110100",
			"children": [{
				"label": "东城区",
				"value": "110101",
				"children": []
			}]
		}]
	}]

	




}
export default Store;
