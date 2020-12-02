import { observable, action } from 'mobx';
import Http from './lib/Http'
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
    }
    @action
    setInputValue=(key)=>(value)=>{
        this.store[key]=value
    }
    @action
    get = async() => {
        let url='http://yapi.demo.qunar.com/mock/8633/spa_test/siteurl';
        let result=await Http.get({url})
        this.store.sitelist=result&&result.data;
    }
    @action
    globalGet = async() => {
        this.store.postTip='globalGet..';
        let prefix='http://yapi.demo.qunar.com/mock/8633/spa_test/';
        let url='siteurl';
        let result=await window.GET({url,prefix})
        this.store.sitelist=result&&result.data;
    }
    @action
    clrGet=() => {
        this.store.sitelist=null;
    }
    @action
    post = async() => {
        this.store.postTip='post提交中..';
        let url='http://yapi.demo.qunar.com/mock/8633/spa_test/publishArticles';
        let result=await Http.post({url})
        this.store.postTip=result&&result.data;
    }
    @action
    globalPost = async() => {
        this.store.postTip='globalPost提交中..';
        let url='publishArticles';
        let prefix='http://yapi.demo.qunar.com/mock/8633/spa_test/';
        let result=await window.POST({url,prefix})
        this.store.postTip=result&&result.data;
    }
    @action
    globalPostCurrent = async() => {
        let url='getcustomer';
        let result=await window.POST({url})
    }
    @action
    globalGetAuth = async() => {
        let url=this.store.authUrl;
        let result=await window.GET({url})
    }
    @action
    globalPostAuth = async() => {
        let url=this.store.authUrl;
        let result=await window.POST({url})
    }
    @action
    globalSaveAuth = async() => {
        window.setLocalData("auth",this.store.authValue)
        alert("保存存成功")
    }
}
export default Actions;
