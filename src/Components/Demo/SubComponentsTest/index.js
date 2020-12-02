import lazyLoadComponent from "lazy-load-component";
const Component = lazyLoadComponent(() => import(/* webpackChunkName: "SubComponentsTest" */ './Component'))
function compose({store,actions,routeList,name,routePath}) {
    let key=routeList.length;
    routeList.push({
        key,exact:true,
        component:Component,
        path:routePath
    })
}
export {compose,Component}
export default Component