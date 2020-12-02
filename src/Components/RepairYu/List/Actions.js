import {action } from 'mobx';
import tel from './tel.png';
import { runInThisContext } from 'vm';
import { Toast, Modal } from 'antd-mobile';
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
        this.start = 1
    }
    @action
    init = () => {
        //初始化store变量，都放这里
        this.store.data = [];
    }
    /*获取列表总数*/
    @action
    getNumber = async (type) =>{
        this.init()
        this.store.type = type;
        let cformData = {
            type: type,
        };
        let result = await window.GET({ url: "auth/myBxListNum", cformData });
        if (!result.isSucess) return;
        this.store.tabs=[];
        this.store.tabs.push({title: "未完成("+result.data.notFinish+")"}, { title: "已完成(" + result.data.finish+")"})

        this.changeTab(0)//默认第一个个列表数据
    }
    //检查报修类型
    checkWorkType = (workType, rangeFlag) =>{
        let typeText;
        // if(this.store.type == 1){
        //     if (rangeFlag == 1){
        //         typeText = "室内";
        //     } else if (rangeFlag == 2){
        //         typeText = "室外";
        //     }
        // } else if (this.store.type == 2){
        //     switch (String(workType)){
        //         case "2":
        //             typeText = "投诉"
        //             break;
        //         case "3":
        //             typeText = "咨询"
        //             break;
        //         case "4":
        //             typeText = "建议"
        //             break;
        //         case "5":
        //             typeText = "表扬"
        //             break;
        //     }
        // }
        switch (String(workType)){
            case "10":
                typeText ="来自400报事"
                break;
            case "20":
                typeText = "来自现场报事"
                break;
            case "30":
                typeText = "来自自主报事"
                break;
        }
        return typeText;
    }
    //获取报修/投诉列表
    @action
    getRepairList = async ()=>{
        
        let cformData = {
            type: this.store.type,
            isFinish: this.store.isfinish,//1-完成 2-未完成
            start: this.start,
            length:10,
        };
        let result = await window.POST({ url:"auth/myBxList", cformData });
        if (!result.isSucess) return;
        console.log("auth/myBxList", result.data,this.start)
        if (result.data.data.length == 0 && this.start>1){
            Toast.info('已经没有了', 1);
            return false
        }
        console.log(222,result.data.data)
        result.data.data.forEach((val,index)=>{
            this.store.data.push({
                id: val.id,//单据ID
                time: val.createDate,//时间
                status: val.status,//状态
                label: val.problemdescription,//描述
                typeText: this.checkWorkType(val.receptionmethod),//类型
                type: this.store.isfinish,
                roomname: val.roomname
            });
        })
        this.start = this.start + 1//翻页+1
    }
    
    @action
    changeTab=(index)=>{
		if (index == 1){
            this.store.isfinish = 1;
		}else{
            this.store.isfinish = 2;
        }
        //isfinish1 - 完成 2 - 未完成
        this.start=1;
        this.store.data=[]
        this.getRepairList();
    }
    
    @action
    onRefreshfun=()=>{
        this.store.refreshing=true
        setTimeout(() => {
            this.store.refreshing = false
        }, 1000);
        this.getRepairList();
    }
}
export default Actions;
