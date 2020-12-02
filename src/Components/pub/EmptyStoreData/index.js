
/*所有页在缓存清空操作在此页面上*/

class EmptyStoreData {
	static getCurrentInstance () {
		if (!EmptyStoreData.instance) {//引入单例模式，减少资源开销
			EmptyStoreData.instance = new EmptyStoreData();
			return EmptyStoreData.instance;
		}
		return EmptyStoreData.instance;
	}

	constructor (){
		//this.initEvent()
	}
	initEvent (obj) {
		//console.log('obj____________', obj)
	};

	//清空全部
	__emptyAll(obj){
		const { initValue,store,name,noClearParam} = obj;
		for (let item in store) {
			if (item != noClearParam) {
				name[item]=initValue;
			}
		}
	}
	//清空全部
	__emptyValue(obj){
		const { initValue,store,name} = obj;
		store[name]=initValue
	}



}

export default EmptyStoreData ;