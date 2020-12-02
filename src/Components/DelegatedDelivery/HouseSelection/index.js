import lazyLoadComponent from "lazy-load-component";
import Actions from "./Actions";
import Store from "./Store";
const Component = lazyLoadComponent(() => import(/* webpackChunkName: "EntrustedHouseSelection" */ './Component')); //引入该模块的组件（类）

const urlFormation = function urlFormation (routePath) {
	let arrayAddr = 0;
	const routerString=routePath.join(',');
	const index=routerString.includes(':status') || routerString.includes(':type') || routerString.includes(':id');
	if (index) {
		routePath.forEach((item,index)=>{
			if (item.includes('/:type/:status/:id')) {
				return arrayAddr=3
			} else if (item.includes('/:type/:status')) {
				return arrayAddr=2
			} else if (item.includes('/:type')) {
				return arrayAddr=1
			}
		})
	}
	return routePath[arrayAddr];
};


function compose({store,actions,routeList,name,routePath}) {
    //实例化store和actions两个组件（类）
    let _store=new Store;
    name=name.substring(0,1).toUpperCase()+name.substring(1);
    store['store'+name]=_store;
    actions['actions'+name]=new Actions(_store);
    //把store，actions，引入的模块组件加入数组(routeList)
    let key=routeList.length;
    routeList.push({
        key,
        exact:true,
        component:Component,
        path:Array.isArray(routePath) ? urlFormation(routePath) : routePath
    })
}


export {compose,Component}