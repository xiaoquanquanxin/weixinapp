import {action} from 'mobx';
import {Toast} from 'antd-mobile';

// 定义对数据的操作
class Actions {
    constructor(store){
        this.store = store;
        this.pageNum = 1
    }

    /*
    @action
    incA = () => {
        this.store.xxxxx++;
    }*/
    //  获取省份列表
    @action
    listProvide = async () => {
        this.store.provincesList = [];
        let result = await window.GET({url: "user/provincesList"});
        if (!result.isSucess) return;
        result.data.provincesList.forEach((v, i) => {
            this.store.provincesList.push({
                label: v.provinceName,
                value: v.provinceId,
                children: []
            });
            if (result.data.defaultProvincesId == v.provinceId) {
                this.store.provincesId = v.provinceId
                this.store.provincesName = v.provinceName
            }
            v.ciytList.forEach((vv, ii) => {
                this.store.provincesList[i].children.push({
                    label: vv.cityName,
                    value: vv.cityId
                });
                if (result.data.defaultCityId == vv.cityId) {
                    this.store.cityId = vv.cityId
                    this.store.cityName = vv.cityName
                }
            })
        });
        this.articleList(1);
    };


    //  获取纹章列表
    @action
    articleList = async (pageNum) => {
        let cformData = {
            cityId: this.store.cityId,
            subjectId: "34",
            projectId: "",
            pageNum: pageNum,
            pageSize: 10
        };
        let result = await window.GET({url: "user/articleList", cformData});
        if (!result.isSucess) return;
        //this.store.listdata = result1.dataif (result.resultCode == 0) {
        // debugger
        if (result.resultCode == 0) {
            if (result.data.length == 0) {
                this.store.actbottom = 1
                //Toast.info(`已经到底部`, 1);
            } else {
                if (pageNum > 1) {
                    this.store.CityListdata = this.store.CityListdata.concat(result.data)
                } else {
                    this.store.CityListdata = result.data
                }
                this.store.actbottom = 2
            }
        }
        // console.log(111, this.store.CityListdata)
    }
    @action
    PickProvinces = (value) => {
        this.store.provincesList.forEach((v, i) => {
            if (value[0] == v.value) {
                this.store.provincesId = v.value;
                this.store.provincesName = v.label;
            }
            v.children.forEach((vv, ii) => {
                if (value[1] == vv.value) {
                    this.store.cityId = vv.value;
                    this.store.cityName = vv.label;
                }
            })
        });
        console.log(2222, value);
        this.store.CityListdata = [];
        this.articleList(1)
    };

    @action
    itemfun = (history, v) => {
        if (v.contentType == 2) {
            window.location.href = v.contentUrl
            // window.location.href = v.content
        } else {
            history.push('/PhasetwoArticle/' + v.id);
        }
    };


    @action
    onRefresh = () => {
        this.pageNum = this.pageNum + 1;
        this.store.refreshing = true;
        this.articleList(this.pageNum);
        setTimeout(() => {
            this.store.refreshing = false
        }, 1000);
        console.log(this.store.refreshing)
    }
}

export default Actions;
