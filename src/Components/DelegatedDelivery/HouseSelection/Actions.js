import {action } from 'mobx';
import {Modal} from 'antd-mobile';
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
        this.ProjectSelectid=-1
        this.batchName=""
        this.ProjectSelectval=-1
    }
    @action
    tabfloorfun = (v, unitInfo)=> {
        //console.log(222,v, unitInfo)
        this.store.unitInfo = []
        this.store.floorInfo=[]
        this.store.tabfloorval=v
        this.store.unitInfo = unitInfo
    }
    @action
    tabunitfun = (v, floorInfo)=>{
        this.store.tabunitval = v
        this.store.floorInfo = floorInfo
        
    }
    
    @action
    Fold = (v) => {
        this.store.Foldval=!v
        if (this.store.Foldval){
            if (this.store.batchName == this.batchName) {

            } else {
                this.store.ProjectSelectval = this.ProjectSelectval
            }
        }
        
    }
    @action
    ProjectSelectfun = (v,data) => {
        this.store.ProjectSelectval = v
        this.ProjectSelectid = data.batchId
        this.batchName = data.batchName
        console.log(999,v)
  
    }
    @action
    ProjectSelectOK = (v) => {
       // this.store.ProjectSelectidok = this.ProjectSelectid
        this.Fold(v)
        if (this.ProjectSelectid>0){
            this.ProjectSelectval= this.store.ProjectSelectval
            this.getRoomByBatch(this.ProjectSelectid)
            this.store.batchName = this.batchName
        }
        
    }
    
    @action//获取交付批次信息
    HouseSelectionfun = async () => {
        let result = await window.GET({ url: "user/getDeliverBatch" });
        if (!result.isSucess) return;
        this.store.ProjectSelecData = result.data
    }

    @action
    getRoomByBatch = async (batchId) => {
        let cformData={
            batchId: batchId
        }
        let result = await window.GET({ url: "user/getRoomByBatch", cformData });
        if (!result.isSucess) return;
        this.store.getRoomByBatchData = result.data
    }
    @action
    roomInfoOK = (v,history) => {
        let saveEntrustInfo = {
            orderDetailId: v.orderDetailId,
            roomName: v.roomName
        }
        console.log()
        Modal.alert('信息确认', v.roomName, [
            { text: '关闭', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => { 
                window.setLocalData("orderDetailId", v.orderDetailId)
                window.setLocalData("saveEntrustInfo", saveEntrustInfo)
                history.push("/DelegatedDeliveryUploadSelfInfo")
            } },
        ])
    }
    

}
export default Actions;
