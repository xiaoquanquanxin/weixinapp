/*
编写带有mbox的组件
*/
import Actions from "./Actions";
import Store from "./Store";
const Component = import('./Component')
function compose({store,actions,name}) {
    let _store=new Store;
    name=name.substring(0,1).toUpperCase()+name.substring(1);
    store['store'+name]=_store;
    actions['actions'+name]=new Actions(_store);
}
export {compose,Component}
export default Component