import { observable, action } from 'mobx';
import { Toast } from 'antd-mobile';
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
        this.pageNum = 1
    }
    /*
    @action
    incA = () => {
        this.store.xxxxx++;
    }*/
    @action
    listfun = async (name, subjectId, pageNum) => {
        
        this.store.name = name
        this.store.subjectId = subjectId
        this.store.listdataval=[]
        this.store.projectList = []
        this.store.projectId = ""
        console.log(99, this.store.subjectId, this.store.name)
        // let urlobj = window.getQueryString();
        if (name == "yz") {
            this.articleList(pageNum)
        } else {
            let result = await window.GET({ url: "user/projectList" });
            if (!result.isSucess) return;
            result.data.projectList.forEach((v, i) => {
                this.store.projectList.push({
                    label: v.projectName,
                    value: v.projectId
                })
                if (v.projectId == result.data.defaultProjectId) {
                    this.store.projectId = v.projectId
                    this.store.projectName = v.projectName
                }
            })
            this.articleList(pageNum)
        }


    }
    @action
    articleList = async (pageNum) => {
        console.log("getCompanyId", JSON.parse(window.getCompanyId()))

        // 项目家书 - 65
        // 工程进展 - 66
        // 社区文化 - 67
        // let urlobj = window.getQueryString();
        // let subjectId = 33
        // if (urlobj && urlobj.subjectId == 65) {
        //     subjectId = 65
        // } else if (urlobj && urlobj.subjectId == 66){
        //     subjectId = 66
        // } else if (urlobj && urlobj.subjectId == 67) {
        //     subjectId = 67
        // }else{
        //     subjectId = 33
        // }

        let companyId = this.store.name == "yz" ? JSON.parse(window.getCompanyId()) : ""
        let projectId = this.store.name == "yz" ? "" : this.store.projectId
        let cformData = {
            cityId: "",
            subjectId: this.store.subjectId,
            projectId: projectId,
            companyId: companyId,
            pageNum: pageNum,
            pageSize: 10
        }
        console.log(11111,cformData)
        let result = await window.GET({ url: "user/articleList", cformData });
        if (!result.isSucess) return;
        if (result.resultCode == 0) {
            if (result.data.length == 0) {
                this.store.actbottom = 1
                //Toast.info(`已经到底部`, 1);
            } else {
                if (pageNum > 1) {
                    this.store.listdataval = this.store.listdataval.concat(result.data)
                } else {
                    this.store.listdataval = result.data
                }
                this.store.actbottom = 2
            }

        }

    }
    @action
    Pickfun = (value) => {
        this.store.projectList.forEach((v, i) => {
            if (value[0] == v.value) {
                this.store.projectId = v.value
                this.store.projectName = v.label
            }
        })
        this.store.listdataval = []
        this.articleList(1)
        console.log(25555555555)
    }


    @action
    itemfun = (history, v) => {
        // let urlobj = window.getQueryString();
        // let subjectId = 1
        // if (urlobj && urlobj.subjectId == 65) {
        //     subjectId = 65
        // } else if (urlobj && urlobj.subjectId == 66) {
        //     subjectId = 66
        // } else if (urlobj && urlobj.subjectId == 67) {
        //     subjectId = 67
        // } else {
        //     subjectId = 1
        // }
       if (v.contentType == 2) {
           window.location.href = v.contentUrl
        } else {
           let sessionKeyurl = ""
           if (window.getLocalData('auth') != "") {
               sessionKeyurl = "&sessionKey=" + JSON.parse(window.getLocalData('auth'))
           }
           console.log("sessionKeyurl", sessionKeyurl)
           history.push('/PhasetwoArticle/' + v.id + '?title=' + this.store.subjectId + sessionKeyurl)
        }

    }


    @action
    onRefresh = () => {
        this.pageNum = this.pageNum + 1
        this.store.refreshing = true
        this.articleList(this.pageNum)
        setTimeout(() => {
            this.store.refreshing = false
        }, 1000);
        console.log(this.store.refreshing)
    }
}
export default Actions;
