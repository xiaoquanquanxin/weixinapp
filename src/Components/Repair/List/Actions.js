import {action} from 'mobx';
import {Modal, Toast} from 'antd-mobile';
import tel from './tel.png';

// 定义对数据的操作
class Actions {
    constructor(store){
        this.store = store;
    }

    @action
    init = () => {
        //初始化store变量，都放这里
    };
    //加载初始值数据
    @action
    getNumber = async (props) => {

        this.store.repairList = [];

        let url = "auth/repairRecordCount";
        let cformData = {
            type: 1,
        };
        let result = await window.GET({url, cformData, isShowLoading: false});
        if (!result.isSucess) return;
        this.store.tabs = [];
        this.store.tabs.push({title: "未完成(" + result.data.nofinishcount + ")"}, {title: "已评价(" + result.data.finishcount + ")"})
        this.store.subType = 1;
        this.pageNum = 1;
        // type 类型（1 - 报事，2 - 投诉）
        // subType  子类型（1 - 未完成，2 - 已完成）
        // pageNum  页数
        // pageSize 每页记录数
        // custId   业主id

        //this.type = props.match.params.type

        this.getRepairList()
    };
    //获取报修列表数据
    @action
    getRepairList = async (pageNum) => {
        if (pageNum) {
            this.pageNum = this.pageNum + 1
        }
        let cformData = {
            type: 1,
            subType: this.store.subType,
            pageNum: this.pageNum,
            pageSize: 10,
        };
        console.log("repairListcformData", cformData);
        let result = await window.GET({url: "auth/repairList", cformData});
        if (!result.isSucess) return;
        //console.log("列表",result.data)
        result.data.length == 0 && Toast.info('已经到底部', 2);
        this.store.repairList = [...this.store.repairList, ...result.data]

        // result.data.forEach((val,index)=>{
        //     let obj = {
        //         id: val.id,
        //         title: 'title',
        //         time: val.createTIme,
        //         status: val.status,
        //         label: val.problemDescription,
        //         src: tel,
        //         tel: '400-8888-999',
        //     }
        //     this.store.data.push(obj);
        // })
        // this.store.listtype = type;
    };
    //点击tab未完成和已完成
    @action
    changeTab = (index) => {
        //console.log(2222,index)
        this.store.subType = index + 1;
        this.store.repairList = [];
        this.pageNum = 1;
        this.getRepairList();
        console.log(2222, this.pageNum)
    };


    //上拉刷新加载
    @action
    onRefreshfun = () => {
        this.store.refreshing = true;
        setTimeout(() => {
            this.store.refreshing = false
        }, 1000);
        this.getRepairList(true);
    }
    //点击详情
    // @action
    // detailfun = (id) => {
    //     console.log("id",id)
    // }
}

export default Actions;
