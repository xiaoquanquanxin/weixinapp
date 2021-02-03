import {action } from 'mobx';
import { Modal, Toast } from 'antd-mobile';//Toast.info('提交成功', 1.5);
// 定义对数据的操作
class Actions {
    constructor(store) {
        this.store = store;
    }
    @action
	init = () => {
        this.store.saveEvaluate=[]
        this.store.istrueval = []
        this.store.startdata = []
        this.store.viewReviewsdata = []
        this.Textareaval=""
        this.store.returnResult=""
//this.store.startval=""
    }
    @action
    startfun = (value,v) => {
        //this.store.startdata
        this.store.startval = value
        //console.log("fieldValue",this.store.startdata)
        this.store.startdata.forEach((item, i) => {
            if (item.fieldName == v.fieldName){
                this.store.startdata[i].fieldValue= value
            }
        })
       // this.store.saveEvaluate.push(v)
        console.log(22, value,v)
    }
    @action
    viewReviewsfun = async (id,isEdit) => {
        console.log("viewReviewsfun",id, isEdit)
        let cformData = {
            id: id,
        };
        let result={}
        let resultdata=[]
        this.store.istrueval=[]
        if (isEdit){
            result = await window.GET({ url: "auth/getEvaluateList", cformData });
            resultdata = result.data
            resultdata.forEach((v, i) => {
                if (v.fieldType == 1) {
                    this.store.istrueval.push(1)
                }
            })
        }else{
            result = await window.GET({ url: "auth/viewReviews", cformData });
            this.store.returnResult = result.data.returnResult
            resultdata = result.data.viewReviews
            resultdata.forEach((v, i) => {
                if (v.fieldType == 1) {
                    this.store.istrueval.push(v.fieldValue)
                }
            })
        }
        if (!result.isSucess) return;

        this.store.startdata = []
        this.store.viewReviewsdata = []
        resultdata.forEach((v,i)=>{
            if (v.fieldType==1){
                //v.fieldValue ? this.store.istrueval.push(v.fieldValue) : this.store.istrueval.push(1)
                this.store.viewReviewsdata.push(v)
                this.store.viewReviewsdata[this.store.viewReviewsdata.length-1].fieldValue=this.store.istrueval[i]
            }else{
                v.fieldValue ? this.store.startval = v.fieldValue : this.store.startval = 5
                this.store.startdata.push(v)
                //console.log("startdata",this.store.startdata)
                this.store.startdata[this.store.startdata.length-1].fieldValue = this.store.startval
            }
            
        })
        
        console.log("兩條數據", this.store.viewReviewsdata, this.store.startdata, this.store.istrueval)
    }
    @action
    istruefun = (val, i,itemobj) => {
       // this.store.ival = i
        this.store.istrueval[i] = val
        this.store.viewReviewsdata.forEach((item, i) => {
            if (item.fieldName == itemobj.fieldName) {
                this.store.viewReviewsdata[i].fieldValue = val
            }
        })
       // console.log(v, i, this.store.ival, this.store.istrueval)
    }
    @action
    TextareaItemfun = (v) => {
        this.Textareaval=v
    }
    @action
    submit = async (propsre) => {
        //id  custId   describe  evaluateInfo  fieldValue  fieldName  fieldType
        let startdata=[]
        this.store.startdata.forEach((v)=>{
            startdata.push({
                fieldName: v.fieldName,
                fieldType: v.fieldType,
                fieldValue: v.fieldValue
            })
        })
        let viewReviewsdata = []
        this.store.viewReviewsdata.forEach((v) => {
            viewReviewsdata.push({
                fieldName: v.fieldName,
                fieldType: v.fieldType,
                fieldValue: v.fieldValue
            })
        })
        let cformData1 = {
                id: parseInt(propsre.match.params.id), 
                describe: this.Textareaval,
                evaluateInfo: [...startdata, ...viewReviewsdata],
        };
        let cformData = {
            evaluateParams: JSON.stringify(cformData1)
        }
        //console.log("提交", cformData)
       // console.log("--", JSON.stringify(cformData))
       // JSON.stringify(cformData)
        let result = await window.POST({ url: "auth/saveEvaluate", cformData });
        if (!result.isSucess) return;
        Toast.info('提交成功', 1.5);
        //propsre.match.params.id
        propsre.history.push(`/RepairDetails/${propsre.match.params.id}`)
    }
}
export default Actions;
