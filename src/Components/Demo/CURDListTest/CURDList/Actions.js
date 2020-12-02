import {action } from 'mobx';
class Actions {
    constructor(store) {
        this.store = store;
    }
    _id=0;
    getTemId=()=>{
        this._id++;
        return this._id;
    }
    //添加一个界面
    @action
    add = ({title,type}) => {
        var id=this.getTemId();
        this.store.list.push({
            title,
            type,
            id,
        })
    }
    //新增数据
    @action
    addData = (index,{id,title}) => {
        this.store.list[index]={
            title,
            type:"r",
            id,
        }
        console.log(JSON.stringify(this.store.list))
    }
    @action
    save=({id,title,type}) => {

    }
    //进入更新状态
    @action
    gotoUpdate=({id}) => {
        let list=this.store.list
        for (var i=0;i<list.length;i++){
            var item=list[i];
            console.log("id:"+id+" => "+item.id)
            if (item.id==id){
                list[i].type ="u"
                this.store.list=list
                break;
            }
        }
        console.log("this.store.list",JSON.stringify(this.store.list))
    }
    @action
    update=({id,title,type}) => {

    }
    @action
    del=({id,title,type}) => {

    }
    /*
    @action
    incA = () => {
        this.store.xxxxx++;
    }*/
}
export default Actions;
