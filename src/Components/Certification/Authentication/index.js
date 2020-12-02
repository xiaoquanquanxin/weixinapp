import lazyLoadComponent from "lazy-load-component";
import Actions from "./Actions";
import Store from "./Store";

const Component = lazyLoadComponent(() => import(/* webpackChunkName: "SubmitCertification" */ './Component'));

function compose({store, actions, routeList, name, routePath}){
    let _store = new Store;
    name = name.substring(0, 1).toUpperCase() + name.substring(1);
    store['store' + name] = _store;
    actions['actions' + name] = new Actions(_store);
    actions['actions' + name].init();
    let key = routeList.length;
    window.pub__pageComptentCompose(routeList, routePath, key, Component)
}

export {compose, Component}
