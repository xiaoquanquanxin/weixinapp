import { observable, action } from 'mobx';
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
    }
    @action
    selectCompany = (isShow=true,id=-1,title="禹洲集团") => {
        // console.log("selectCompany action xxxx")
        this.store.selectCompanyShow=isShow;
        if (id!=-1){
            this.store.defaultCompanyId=id;
            this.store.defaultCompanyTitle=title;
            window.setCompanyId(id)
        }
    }
    @action
    getCompanyList = async() =>{
        let prefix="";//"http://211.159.163.183:9090/mock/171/";
        let url = "user/common/getCompanyList";
        let cformData = {
            type:this.store.type,
        };
        let result = await window.GET({ url,prefix, cformData });
        // console.log("getCompanyList:::",result);
        if (!result.isSucess) return;
        this.store.companyList=result.data.companyList;
        this.store.defaultCompanyId=result.data.defaultCompanyId;
        window.setCompanyId(result.data.defaultCompanyId)
        //设置默认公司名
        if (result.data.companyList&&result.data.companyList.length){
            for(var i=0;i<result.data.companyList.length;i++){
                var item=result.data.companyList[i]
                if (item.companyId==result.data.defaultCompanyId){
                    this.store.defaultCompanyTitle=item.companyName;
                    break;
                }
            }
        }
    }
}
export default Actions;
