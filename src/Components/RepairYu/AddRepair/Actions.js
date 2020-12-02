import {action } from 'mobx';
// 定义对数据的操作
import VerificationMobileFormat from '../../pub/VerificationMobileFormat';
class Actions {
    constructor(store) {
        this.store = store;
    }
	_test =async () => {
		this.store.test=await this.incB()
	}
    @action
    init=()=>{
        //初始化store变量，都放这里
        this.store.AddRepair={
            //type: "",//1-报事，2-投诉
            pkRoom: "",//房间id
            appealNature: "",//室内1；室外0；投诉2；咨询3；建议4；表扬5
            problemDescription: "",//问题描述
        };
        this.store.colorStyle=false;
    }
	/*获取报修/投诉单选按钮*/
	@action
	getRadioInfo = async(type) =>{
		let url = "auth/getWorkType";
		let cformData = {
			type:this.store.type
		};
		let result = await window.GET({ url, cformData });
		if (!result.isSucess) return;
		this.store.radioData = result.data.map((item,index)=>{
			return { label: item.labelName, value: item.value}
		})
		//console.log("radioData",this.store.radioData)
	}
	/*获取用户信息*/
	@action
	getUserInfo = async(body) =>{
		let url = `user/userInfo`
		let cformData = {};
		let result = await window.GET({ url, cformData });
		if (!result.isSucess) return;
		this.store.AddRepair.custName = result.data.fullName;
		this.store.AddRepair.custPhone = result.data.phoneNo;
	}
	/*获取业主信息*/
	@action
	getRoomInfo = async() =>{
		let url = "auth/getRoomInfo";
		let cformData = {}
		let result = await window.GET({ url, cformData});
		if(!result.isSucess) return;
		//获取下拉框的数据
		this.store.custInfo = result.data;
		this.store.AddRepair.pkRoom = this.store.custInfo[0].pkDoor;
		this.store.AddRepair.roomName = this.store.custInfo[0].roomName;
		this.store.roomData = result.data.map((val,index)=>{
			return { label: val.roomName, value: val.pkDoor}
		})
	}
	//更改房间信息和ID
	@action
	changeRoom(roomID){
		this.store.custInfo.forEach((val,index)=>{
			if (val.pkDoor == roomID){
				this.store.AddRepair.pkRoom = val.pkDoor;
				this.store.AddRepair.roomName = this.store.custInfo[index].roomName
			}
		})
	}
	@action
	/*提交*/
	submit = async(videoCollection,imageCollection,recordCollection) => {
		//较验电话号码格式
		// const boolean = VerificationMobileFormat.checkMobile(this.store.AddRepair.custPhone);
		// if (!boolean) return false;
		// if (this.state.fillNofinish) {
		// 	console.log('提交的数据：', AddRepair);
		// 	let address = constant.REPORTREPAIR;										//默认报事报修
		// 	if (this.props.match.params.type * 1 === constant.COMPLAINSUGGESTIONS) {	//投诉建议
		// 		address = constant.COMPLAINSUGGESTIONS
		// 	}
		// 	this.props.history.push(`${router.SubmitSucess}`);
		// 	// this.props.history.push(`${router.RepairList[0]}/${address}`);
		// }
		if(this.store.type == 1){
			if (this.store.labelName == "室内"){
				this.store.AddRepair["rangeFlag"] = 1;
			} else if (this.store.labelName == "室外"){
				this.store.AddRepair["rangeFlag"] = 0;
			}
			this.store.AddRepair.appealNature = 1;
		}else{
			this.store.AddRepair["rangeFlag"] = 0;
		}
        videoCollection,imageCollection,recordCollection
        this.store.AddRepair["imageCollection"] = imageCollection
        this.store.AddRepair["recordCollection"] =recordCollection
        this.store.AddRepair["videoCollection"] =videoCollection
		let url = 'auth/saveServiceBill';
		let cformData = this.store.AddRepair
        // console.log("提交的数据格式:",cformData);
		let result = await window.POST({ url, cformData});
		if (!result.isSucess) return;
		return result;
	};
	@action 
	radioCheck = (value,label) =>{
		this.store.AddRepair.appealNature = value;
		this.store.labelName = label;
		this._checkForm(this.store.AddRepair)
		console.log("colorStyle:",this.store.colorStyle)
		// console.log(3333333,this.store.AddRepair.appealNature, this.store.labelName)
	}

	@action
	_checkForm = (data) => {
		var isCheck=true;
		let keys=['pkRoom','appealNature','problemDescription']
		for (var i=0;i<keys.length;i++){
			var key=keys[i]
			if (!data[key]||data[key]==""){
                isCheck=false;
                break;
			}
		}
        this.store.colorStyle= isCheck
	};

}
export default Actions;
