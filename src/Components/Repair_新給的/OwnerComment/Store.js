import { observable, action } from 'mobx';
//          定义数据结构
class Store {
    //使用 observable decorator
    @observable tip='我是模板';

    @observable istrueval=[]
    @observable ival = -1
    @observable viewReviewsdata=[]
    @observable startdata=[]
   // @observable isEdit = 1//是否可以编辑
    @observable startval=4//多少颗星
    @observable saveEvaluate={}
    @observable Textareaval=""

    @observable returnResult=""
    @observable data= [
        {
            "fieldName": "wywx10",
            "documentDescription": "您对我们的服务效率是否感到满意",
            "fieldType": 2,
            "fieldValue": 1
        },
        {
            "fieldName": "wywx10",
            "documentDescription": "您对我们的服务效率是否感到满意",
            "fieldType": 1,
            "fieldValue": 1
        },
        {
            "fieldName": "wywx10",
            "documentDescription": "您对我们的服务效率是否感到满意",
            "fieldType": 1,
            "fieldValue": 1
        },
        {
            "fieldName": "wywx10",
            "documentDescription": "您对我们的服务效率是否感到满意",
            "fieldType": 1,
            "fieldValue": 1
        },
        {
            "fieldName": "wywx10",
            "documentDescription": "您对我们的服务效率是否感到满意",
            "fieldType": 1,
            "fieldValue": 1
        }
    ]
}
export default Store;
