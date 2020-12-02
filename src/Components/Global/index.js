/*
全局变量存放处
*/
import Actions from "./Actions";
import Store from "./Store";
function compose({store,actions,name}) {
    let _store=new Store;
    name=name.substring(0,1).toUpperCase()+name.substring(1);
    store['store'+name]=_store;
    actions['actions'+name]=new Actions(_store);
}
export {compose}
export default compose