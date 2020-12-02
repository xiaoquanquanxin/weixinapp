import { observable, action } from 'mobx';
// 定义数据结构
class Store {
    //使用 observable decorator
    @observable tip='我是模板';
	@observable userDataInfo = {
	};
	@observable orderDetail = {
		orderBuildingId: '',
		roomId: '',

	}

}
export default Store;
