import {action} from 'mobx';
import {getWorkOrder, progressTracking, taskHistory} from "../repairCommonRequest";

// 定义对数据的操作
class Actions {
    constructor(store){
        this.store = store;
    }

    @action
    init = () => {
        const store = this.store;
        store.repairDetaildata = {};
        store.workingOrderStatusHistory = [];
        store.progressTrackingList = [];
    };

    //  拿客诉详情
    @action
    getWorkOrder = async (id) => {
        const result = await getWorkOrder(id);
        const {resultCode, data} = result;
        if (resultCode !== 0) {
            return false;
        }
        const {imageCollection} = data;
        data.imgList = (imageCollection && imageCollection.split(',')) || [];
        console.log('报修详情\n', JSON.parse(JSON.stringify(data)));
        this.store.repairDetaildata = data;
        return true;
    };

    //  客诉处理状态历史接口
    @action
    taskHistory = async (id) => {
        const {reportResponsibility} = this.store.repairDetaildata;
        const result = await taskHistory(id, reportResponsibility);
        const {resultCode, data} = result;
        if (resultCode !== 0) {
            return;
        }
        console.log('客诉处理状态历史接口\n', JSON.parse(JSON.stringify(data[0])));
        this.store.workingOrderStatusHistory = data;
    };

    //  工单进度跟踪接口
    @action
    progressTracking = async (id) => {
        const result = await progressTracking(id);
        const {resultCode, data} = result;
        if (resultCode !== 0) {
            return;
        }
        console.log('工单进度跟踪接口\n', JSON.parse(JSON.stringify(data[0])));
        // if (data && data.length) {
        //     data.length = 1;
        // }
        this.store.progressTrackingList = data;
    };


}

export default Actions;
