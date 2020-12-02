import lazyLoadComponent from "lazy-load-component";
const Component = lazyLoadComponent(() => import(/* webpackChunkName: "CURDListTest" */ './Component'))
function compose({routeList,routePath}) {
    let key=routeList.length;
    routeList.push({
        key,
        exact:true,
        component:Component,
        path:routePath
    })
}
export {compose,Component}