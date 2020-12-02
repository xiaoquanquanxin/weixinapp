import lazyLoadComponent from "lazy-load-component";
const Component = lazyLoadComponent(() => import(/* webpackChunkName: "RemTest" */ './Component'))
function compose({store,actions,routeList,name,routePath}) {
    let key=routeList.length;
    routeList.push({
        key,exact:true,
        component:Component,
        path:routePath
    })
}
export {compose}
export default Component