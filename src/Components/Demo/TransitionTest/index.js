import lazyLoadComponent from "lazy-load-component";
const Component = lazyLoadComponent(() => import(/* webpackChunkName: "TransitionTest" */ './Component'))
function compose({store,actions,routeList,name,routePath}) {
    /*let _store=new Store;
    name=name.substring(0,1).toUpperCase()+name.substring(1);
    store['store'+name]=_store;
    actions['actions'+name]=new Actions(_store);*/
    let key=routeList.length;
    routeList.push({
        key,exact:true,
        component:Component,
        path:routePath
    })
}
export {compose}
export default Component