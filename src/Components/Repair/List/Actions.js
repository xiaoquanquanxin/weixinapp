import {action} from 'mobx';
import {Modal, Toast} from 'antd-mobile';
import tel from './tel.png';
import {ipUri} from "../../../config";
import {createHeader} from "../repairCommonRequest";
import {Encrypt} from "../../../../lib/utils/utils";
import {requestGetPmdRoomsFn} from "../../wechatPay/commonRequest";

// 定义对数据的操作
class Actions {
    constructor(store){
        this.store = store;
    }

    @action
    init = () => {
        const store = this.store;
        store.repairList = [];
        store.subType = 1;
        //  分页当前页
        this.pageNo = 1;
        //  客户主数据id
        this.cmdsId = null;
    };
    //  通过房间拿用户id
    @action
    getHachiUserInfoByRoom = async (props) => {
        const result = await requestGetPmdRoomsFn();
        const {code, data} = result;
        //  请求错误
        if (code !== 2000) {
            return;
        }
        for (const item of data) {
            if (item.cmdsId) {
                this.cmdsId = item.cmdsId;
                break;
            }
        }
        console.log('cmdsId是', this.cmdsId);
        this.newPujiSearchCase();
    };

    //获取报修列表数据
    @action
    newPujiSearchCase = async (isNext) => {
        if (isNext) {
            this.pageNo = this.pageNo + 1
        }
        const result = await new Promise((resolve, reject) => {
            const userInfo = JSON.parse(window.getLocalData('userInfo') || '{}');
            const data = {
                //  客户主数据id
                custId: this.cmdsId,
                //  电话
                contactNumber: Encrypt(userInfo.phoneNo),
                //  诉求性质: 1.报事报修,2:咨询建议
                appealNature: 1,
                pageNo: this.pageNo,
                pageSize: 10
            };
            window.JQ.ajax({
                crossDomain: true,//兼容ie8,9
                type: "get",
                headers: createHeader(),
                url: `${ipUri["/workorder"]}/newPujiSearchCase`,
                data,
                success: (result) => {
                    resolve(result);
                }
            })
        });
        const {resultCode, data} = result;
        //  请求错误
        if (resultCode !== 0) {
            return;
        }
        const {datas, pageNo} = data;
        this.pageNo = pageNo;
        // console.table(datas.map(item => {
        //     const {evaluate, problemdescription, status} = item;
        //     return {
        //         evaluate, problemdescription, status, zzz: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'
        //     }
        // }));
        if (datas.length === 0) {
            Toast.info('已经到底部', 2);
            return;
        }
        const store = this.store;
        store.repairList = [...store.repairList, ...datas];
    };
    //点击tab未完成和已完成
    @action
    changeTab = (index) => {
        //console.log(2222,index)
        this.store.subType = index + 1;
        this.store.repairList = [];
        this.pageNo = 1;
        this.newPujiSearchCase();
    };


    //上拉刷新加载
    @action
    onRefreshfun = () => {
        this.store.refreshing = true;
        setTimeout(() => {
            this.store.refreshing = false
        }, 1000);
        this.newPujiSearchCase(true);
    }
    //点击详情
    // @action
    // detailfun = (id) => {
    //     console.log("id",id)
    // }
}

export default Actions;
