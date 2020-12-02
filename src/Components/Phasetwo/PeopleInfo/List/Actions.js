import { action } from 'mobx';
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
    listfun = async () => {
        this.store.projectList = []
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
       // console.log(11111,this.store.projectList)
        this.articleList(1)
    }
    @action
    articleList = async (pageNum) => {
        
        let cformData = {
            cityId: "",
            subjectId: "35",
            projectId: this.store.projectId,
            pageNum: pageNum,
            pageSize: 10
        }
        let result = await window.GET({ url: "user/articleList", cformData });
        if (!result.isSucess) return;
        //this.store.newListdata = result1.data
       // console.log(result1.data.length,222)
        if (result.resultCode == 0) {
            if (result.data.length == 0) {
                this.store.actbottom = 1
                //Toast.info(`已经到底部`, 1);
            } else {
                if (pageNum > 1) {
                    this.store.newListdata = this.store.newListdata.concat(result.data)
                } else {
                    this.store.newListdata = result.data
                }
                this.store.actbottom = 2
            }
        }
        //console.log(this.store.newListdata,888)
    }
    @action
    Pickfun = (value) => {
        this.store.projectList.forEach((v, i) => {
            if (value[0] == v.value) {
                this.store.projectId = v.value
                this.store.projectName = v.label
            }
        })
        this.store.newListdata=[]
        this.articleList(1)
    }

    @action
    itemfun = (history, v) => {
        if (v.contentType == 2) {
           // window.location.href = v.contentUrl
            window.location.href = v.content
       } else {
           history.push('/PhasetwoPeopleInfoListDetail/' + v.id)
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
