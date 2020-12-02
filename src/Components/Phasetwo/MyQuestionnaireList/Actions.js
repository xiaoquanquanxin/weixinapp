import { observable, action } from 'mobx';
// 定义对数据的操作
class Actions {
    constructor(store, mainStore) {
        this.store = store;
        //this.storeNotice = mainStore.storeNotice
    }
    @action
    Listfun = async (type) =>{
        this.store.questiontype=type
        if (this.store.questiontype==1){
            let cformData = {}
            let result = await window.GET({ url: "user/questionaire/questionList", cformData })//问卷列表
            if (!result.isSucess) return;
            this.store.ListData = result.data.questionList
            console.log(this.store.ListData)
        }else{
            let cformData = {}
            let result = await window.GET({ url: "user/questionaire/questionReplyList", cformData })//参与问卷列表
            if (!result.isSucess) return;
            this.store.ListData = result.data.questionList
            console.log(this.store.ListData)
        }
        
    }
}
export default Actions;
