import {action} from 'mobx';
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
    }
    @action
    init=()=> {
		this.store.userDataInfo = []
	};




	@action
	orderDetail = async () => {
		const url=window.location.href;
		const orderDetailId = window.getQueryString('orderDetailId');
		let cformData = {
			orderDetailId: orderDetailId || JSON.parse(window.getLocalData('orderDetailId'))
		};
		let result = await window.GET({ url: 'auth/orderDetail', cformData });
		const body1 = {
			orderBuildingId: result.data.orderBuildingId,
			roomId: result.data.roomId,			//房间id
		};

		this.store.orderDetail.orderBuildingId=result.data.orderBuildingId;
		this.store.orderDetail.roomId=result.data.roomId;
		// window.setLocalData('orderBuildingId',119 || result.data.orderBuildingId)
		// window.setLocalData('roomId',26115 || result.data.roomId)
		this.userInfo(body1);

	};

	/*根据批次id以及客户房间id查询客户信息*/
	@action
	userInfo = async (body, that) => {
		let cformData = {
			...body
		};
		let result = await window.GET({ url: 'yzf/deliveryProcess/userInfo', cformData });
		this.store.userDataInfo=result.data ? result.data: [];

	};
}
export default Actions;
