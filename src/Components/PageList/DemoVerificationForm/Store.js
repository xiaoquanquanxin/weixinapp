import { observable, action } from 'mobx';
// 定义数据结构
class Store {
    //使用 observable decorator
    @observable tip='公共按钮';
	//通常是store
	@observable data={
		pickerName:'',
		InputItemName: '',
		InputItemName2: ''

	};
}
export default Store;
