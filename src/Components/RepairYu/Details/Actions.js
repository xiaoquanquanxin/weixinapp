import { action } from 'mobx';
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
    }
    //获取详情信息
    @action
    getDeatail = async(id) =>{
        let url = "auth/getDetailForWx";
        let cformData = {
           id:id,
        };
        let result = await window.GET({ url, cformData });
        if (!result.isSucess) return;
        this.store.workDeatail = result.data;
        
    }
    getDetailRouter = async(id) =>{
        let url = "auth/getWorkRoute"
        let cformData = {
            id: id,
        };
        let result = await window.GET({ url, cformData });
        if (!result.isSucess) return;
        this.store.routerDeatail = result.data;
    }
    @action
    init = () =>{

    }
}
export default Actions;
