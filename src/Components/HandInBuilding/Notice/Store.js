import { observable, action } from 'mobx';
// 定义数据结构
class Store {
    //使用 observable decorator
    @observable NoticeData='';
	@observable currentUseInfo='';

	//房产认证
	@observable userAuthInfo={};
}
export default Store;
