import { observable, action } from 'mobx';
//          定义数据结构


class Store {
    //使用 observable decorator
	@observable tip='我是模板';
	@observable tabfloorval=-1
	@observable tabunitval=-1
	@observable Foldval=false;
	@observable ProjectSelectval=-1
	@observable ProjectSelecData=[]
	@observable ProjectSelectidok=-1
	@observable unitInfo=[]
	@observable floorInfo=[]
	@observable getRoomByBatchData=[]
	@observable batchName=""

	//上传图片列表
	//@observable array=[temp,temp2,temp,temp2];


	//添加报修
	@observable AddRepair={
		partName: '',			//房间名称
		contact: '',			//联系人
		tel: '',				//联系电话
		appointmentTime: '',	//预约时间
		description:''			//问题描述

	};
	//使用 observable decorator

	@observable test=0


}
export default Store;
